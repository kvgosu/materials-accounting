# tests/functional/test_invoice_workflow.py
"""
Функциональные тесты для бизнес-процесса обработки накладной
"""
from datetime import date, timedelta
import uuid

from app.database.models import (
    InvoiceStatus, TransactionType, 
    DebtDirection, DebtDimension
)
from app.database.repositories import (
    InvoiceRepository, 
    TransactionRepository,
    DebtMovementRepository
)

def test_invoice_creation_workflow(db_session, sample_client, sample_supplier, sample_contract, sample_materials):
    repo = InvoiceRepository(db_session)
    today = date.today()
    invoice_data = {
        "number": "TEST-INV-001",
        "date": today,
        "client_id": sample_client.id,
        "supplier_id": sample_supplier.id,
        "contract_id": sample_contract.id,
        "status": InvoiceStatus.CREATED
    }
    items_data = []
    expected_total = 0.0
    expected_total_markup = 0.0
    for i, material in enumerate(sample_materials):
        quantity = float(i + 1) * 10
        price = 100.0 * (i + 1)
        amount = quantity * price
        amount_with_markup = amount * (1 + sample_contract.markup_percentage / 100)
        items_data.append({
            "material_id": material.id,
            "quantity": quantity,
            "price": price,
            "amount": amount,
            "amount_with_markup": amount_with_markup
        })
        expected_total += amount
        expected_total_markup += amount_with_markup
    invoice = repo.create(invoice_data, items_data)
    assert invoice is not None
    assert invoice.id is not None
    assert invoice.number == "TEST-INV-001"
    assert invoice.date == today
    assert invoice.client_id == sample_client.id
    assert invoice.supplier_id == sample_supplier.id
    assert invoice.contract_id == sample_contract.id
    assert invoice.status == InvoiceStatus.CREATED
    assert round(invoice.total_amount, 2) == round(expected_total, 2)
    assert round(invoice.total_with_markup, 2) == round(expected_total_markup, 2)
    assert len(invoice.items) == len(sample_materials)
    for i, item in enumerate(sorted(invoice.items, key=lambda x: x.price)):
        material = sample_materials[i]
        quantity = float(i + 1) * 10
        price = 100.0 * (i + 1)
        amount = quantity * price
        amount_with_markup = amount * (1 + sample_contract.markup_percentage / 100)
        assert item.material_id == material.id
        assert item.quantity == quantity
        assert item.price == price
        assert round(item.amount, 2) == round(amount, 2)
        assert round(item.amount_with_markup, 2) == round(amount_with_markup, 2)

def test_invoice_processing_workflow(db_session, sample_invoice):
    invoice_repo = InvoiceRepository(db_session)
    transaction_repo = TransactionRepository(db_session)
    debt_repo = DebtMovementRepository(db_session)
    result = invoice_repo.process_invoice(sample_invoice.id)
    db_session.refresh(sample_invoice)
    assert result is True
    assert sample_invoice.status == InvoiceStatus.PROCESSED
    transactions = transaction_repo.get_all(invoice_id=sample_invoice.id)
    assert len(transactions) == 2
    client_debt_tx = next((tx for tx in transactions if tx.type == TransactionType.CLIENT_DEBT), None)
    supplier_debt_tx = next((tx for tx in transactions if tx.type == TransactionType.SUPPLIER_DEBT), None)
    assert client_debt_tx is not None
    assert supplier_debt_tx is not None
    assert round(client_debt_tx.amount, 2) == round(sample_invoice.total_with_markup, 2)
    assert round(supplier_debt_tx.amount, 2) == round(sample_invoice.total_amount, 2)
    debt_movements = debt_repo.get_all(document_id=sample_invoice.id)
    assert len(debt_movements) == 2
    client_movement = next((m for m in debt_movements if m.client_id == sample_invoice.client_id), None)
    supplier_movement = next((m for m in debt_movements if m.supplier_id == sample_invoice.supplier_id), None)
    assert client_movement is not None
    assert supplier_movement is not None
    assert client_movement.dimension == DebtDimension.CLIENT_DEBT
    assert client_movement.direction == DebtDirection.DEBIT
    assert round(client_movement.amount, 2) == round(sample_invoice.total_with_markup, 2)
    assert supplier_movement.dimension == DebtDimension.SUPPLIER_DEBT
    assert supplier_movement.direction == DebtDirection.DEBIT
    assert round(supplier_movement.amount, 2) == round(sample_invoice.total_amount, 2)

def test_payment_registration_workflow(db_session, processed_invoice):
    transaction_repo = TransactionRepository(db_session)
    debt_repo = DebtMovementRepository(db_session)
    balances_before = debt_repo.get_balances(
        client_id=processed_invoice.client_id,
        dimension=DebtDimension.CLIENT_DEBT
    )
    assert len(balances_before) == 1
    initial_balance = balances_before[0]['balance']
    payment_amount = initial_balance / 2
    payment_date = date.today()
    payment_description = "Тестовая оплата от клиента"
    payment_tx = transaction_repo.register_client_payment(
        client_id=processed_invoice.client_id,
        amount=payment_amount,
        date_obj=payment_date,
        description=payment_description
    )
    assert payment_tx is not None
    assert payment_tx.id is not None
    assert payment_tx.client_id == processed_invoice.client_id
    assert payment_tx.type == TransactionType.CLIENT_PAYMENT
    assert round(payment_tx.amount, 2) == round(payment_amount, 2)
    assert payment_tx.date == payment_date
    assert payment_tx.description == payment_description
    debt_movements = debt_repo.get_all(document_id=payment_tx.id)
    assert len(debt_movements) == 1
    debt_movement = debt_movements[0]
    assert debt_movement.client_id == processed_invoice.client_id
    assert debt_movement.dimension == DebtDimension.CLIENT_DEBT
    assert debt_movement.direction == DebtDirection.CREDIT
    assert round(debt_movement.amount, 2) == round(payment_amount, 2)
    balances_after = debt_repo.get_balances(
        client_id=processed_invoice.client_id,
        dimension=DebtDimension.CLIENT_DEBT
    )
    assert len(balances_after) == 1
    updated_balance = balances_after[0]['balance']
    assert round(updated_balance, 2) == round(initial_balance - payment_amount, 2)

def test_complete_invoice_lifecycle(db_session, sample_client, sample_supplier, sample_contract, sample_materials):
    invoice_repo = InvoiceRepository(db_session)
    transaction_repo = TransactionRepository(db_session)
    debt_repo = DebtMovementRepository(db_session)
    invoice_data = {
        "number": "FULL-TEST-001",
        "date": date.today(),
        "client_id": sample_client.id,
        "supplier_id": sample_supplier.id,
        "contract_id": sample_contract.id,
        "status": InvoiceStatus.CREATED
    }
    quantity = 10.0
    price = 100.0
    amount = quantity * price  
    markup = sample_contract.markup_percentage / 100  
    amount_with_markup = amount * (1 + markup)  
    items_data = [{
        "material_id": sample_materials[0].id,
        "quantity": quantity,
        "price": price,
        "amount": amount,
        "amount_with_markup": amount_with_markup
    }]
    invoice = invoice_repo.create(invoice_data, items_data)
    assert invoice.status == InvoiceStatus.CREATED
    assert invoice.total_amount == amount
    assert invoice.total_with_markup == amount_with_markup
    print(f"DEBUG: Созданная накладная: сумма={invoice.total_amount}, с наценкой={invoice.total_with_markup}")
    invoice_repo.process_invoice(invoice.id)
    db_session.refresh(invoice)
    assert invoice.status == InvoiceStatus.PROCESSED
    transactions = transaction_repo.get_all(invoice_id=invoice.id)
    assert len(transactions) == 2
    client_debt_tx = next((tx for tx in transactions if tx.type == TransactionType.CLIENT_DEBT), None)
    assert client_debt_tx is not None
    assert client_debt_tx.amount == amount_with_markup
    client_balances = debt_repo.get_balances(
        client_id=invoice.client_id,
        dimension=DebtDimension.CLIENT_DEBT
    )
    assert len(client_balances) == 1
    assert client_balances[0]['balance'] == amount_with_markup
    print(f"DEBUG: Баланс после обработки накладной: {client_balances[0]['balance']}")
    payment_tx = transaction_repo.register_client_payment(
        client_id=invoice.client_id,
        amount=amount_with_markup,
        date_obj=date.today(),
        description="Полная оплата накладной"
    )
    final_balances = debt_repo.get_balances(
        client_id=invoice.client_id,
        dimension=DebtDimension.CLIENT_DEBT
    )
    print(f"DEBUG: Финальные балансы: {final_balances}")
    if final_balances:
        print(f"DEBUG: Финальный баланс: {final_balances[0]['balance']}")
    final_balance = final_balances[0]['balance'] if final_balances else 0
    assert abs(final_balance) < 0.01, f"Ожидался баланс близкий к 0, получено {final_balance}"
    invoice_repo.update(invoice.id, {"status": InvoiceStatus.CLOSED})
    db_session.refresh(invoice)
    assert invoice.status == InvoiceStatus.CLOSED