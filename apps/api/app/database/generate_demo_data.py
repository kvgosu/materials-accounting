import sys
import os
import uuid
import random
from datetime import date, datetime, timedelta
import logging

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database.db import SessionLocal
from app.database.models import (
    Client, Supplier, Contract, Material, 
    Invoice, InvoiceItem, Transaction, DebtMovement,
    InvoiceStatus, TransactionType, DebtDirection, DebtDimension
)
from app.database.repositories import InvoiceRepository, TransactionRepository

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def generate_invoices(db, num_invoices=5):
    clients = db.query(Client).all()
    suppliers = db.query(Supplier).all()
    
    if not clients or not suppliers:
        logger.error("Не найдены клиенты или поставщики. Сначала запустите init_db.py")
        return
    client_contracts = {}
    for client in clients:
        contracts = db.query(Contract).filter(
            Contract.client_id == client.id
        ).all()
        if contracts:
            client_contracts[client.id] = contracts
    if not client_contracts:
        logger.error("Не найдены договоры. Сначала запустите init_db.py")
        return
    materials = db.query(Material).all()
    if not materials:
        logger.error("Не найдены материалы. Сначала запустите init_db.py")
        return
    invoice_repo = InvoiceRepository(db)
    today = date.today()
    invoices = []
    for i in range(num_invoices):
        client = random.choice(clients)
        if client.id not in client_contracts or not client_contracts[client.id]:
            continue
        contract = random.choice(client_contracts[client.id])
        supplier = random.choice(suppliers)
        invoice_date = today - timedelta(days=random.randint(1, 30))
        invoice_data = {
            "number": f"Н-{i+1:03d}/{today.year}",
            "date": invoice_date,
            "client_id": client.id,
            "supplier_id": supplier.id,
            "contract_id": contract.id,
            "status": InvoiceStatus.CREATED
        }
        items_data = []
        num_items = random.randint(1, 5) 
        for j in range(num_items):
            material = random.choice(materials)
            quantity = random.randint(1, 100)
            price = round(random.uniform(100, 10000), 2)
            amount = round(quantity * price, 2)
            amount_with_markup = round(amount * (1 + contract.markup_percentage / 100), 2)
            item_data = {
                "material_id": material.id,
                "quantity": quantity,
                "price": price,
                "amount": amount,
                "amount_with_markup": amount_with_markup
            }
            items_data.append(item_data)
        invoice = invoice_repo.create(invoice_data, items_data)
        invoices.append(invoice)
        logger.info(f"Создана накладная №{invoice.number} на сумму {invoice.total_amount:.2f}")    
    return invoices

def process_invoices(db):
    invoice_repo = InvoiceRepository(db)
    invoices = db.query(Invoice).filter(Invoice.status == InvoiceStatus.CREATED).all()
    for invoice in invoices:
        invoice_repo.process_invoice(invoice.id)
        logger.info(f"Обработана накладная №{invoice.number}")

def generate_payments(db):
    transaction_repo = TransactionRepository(db)
    client_debts = db.query(Transaction).filter(
        Transaction.type == TransactionType.CLIENT_DEBT
    ).all()
    for debt in client_debts:
        if random.random() < 0.7: 
            payment_amount = round(debt.amount * random.uniform(0.3, 1.0), 2)  
            transaction_repo.register_client_payment(
                debt.client_id, 
                payment_amount,
                debt.date + timedelta(days=random.randint(1, 15)),
                f"Оплата по накладной №{debt.invoice.number}"
            )
            logger.info(f"Создан платеж от клиента {debt.client.name} на сумму {payment_amount:.2f}")
    return True

def main():
    logger.info("Начало генерации демонстрационных данных")
    db = SessionLocal()
    try:
        existing_invoices = db.query(Invoice).count()
        if existing_invoices > 0:
            confirm = input("В базе уже есть накладные. Вы хотите создать дополнительные? (y/n): ")
            if confirm.lower() != 'y':
                logger.info("Генерация демонстрационных данных отменена")
                return
        invoices = generate_invoices(db, num_invoices=10)
        if not invoices:
            logger.error("Не удалось создать накладные")
            return
        process_invoices(db)
        generate_payments(db)
        logger.info("Генерация демонстрационных данных завершена успешно")
    except Exception as e:
        logger.error(f"Ошибка при генерации демонстрационных данных: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    main()