# app/services/transaction_service.py
from datetime import datetime, date
from typing import List, Optional, Dict, Any, Tuple
import uuid
from sqlalchemy.orm import Session

from ..database.repositories import (
    TransactionRepository, 
    DebtMovementRepository,
    ClientRepository,
    SupplierRepository,
    InvoiceRepository
)
from ..database.models import (
    Transaction, DebtMovement,
    TransactionType, DebtDimension, DebtDirection
)

class TransactionService:
    def __init__(self, db: Session):
        self.db = db
        self.transaction_repo = TransactionRepository(db)
        self.debt_repo = DebtMovementRepository(db)
        self.client_repo = ClientRepository(db)
        self.supplier_repo = SupplierRepository(db)
        self.invoice_repo = InvoiceRepository(db)
    
    def get_all_transactions(self, 
                            skip: int = 0, 
                            limit: int = 100, 
                            client_id: Optional[uuid.UUID] = None,
                            supplier_id: Optional[uuid.UUID] = None,
                            invoice_id: Optional[uuid.UUID] = None,
                            transaction_type: Optional[TransactionType] = None,
                            date_from: Optional[date] = None,
                            date_to: Optional[date] = None) -> List[Transaction]:
        return self.transaction_repo.get_all(
            skip=skip, 
            limit=limit, 
            client_id=client_id,
            supplier_id=supplier_id,
            invoice_id=invoice_id,
            type=transaction_type,
            date_from=date_from,
            date_to=date_to
        )
    
    def get_transaction_by_id(self, transaction_id: uuid.UUID) -> Optional[Transaction]:
        return self.transaction_repo.get_by_id(transaction_id)
    
    def register_client_payment(self, 
                              client_id: uuid.UUID, 
                              amount: float, 
                              payment_date: date,
                              description: Optional[str] = None) -> Transaction:
        client = self.client_repo.get_by_id(client_id)
        if not client:
            raise ValueError(f"Клиент с ID {client_id} не найден")
        if amount <= 0:
            raise ValueError("Сумма оплаты должна быть положительным числом")
        if not description:
            description = f"Оплата от клиента: {client.name}"
        try:
            transaction = self.transaction_repo.register_client_payment(
                client_id=client_id,
                amount=amount,
                date_obj=payment_date,
                description=description
            )
            return transaction
        except Exception as e:
            raise ValueError(f"Ошибка при регистрации оплаты: {str(e)}")
    
    def register_supplier_payment(self, 
                                supplier_id: uuid.UUID, 
                                amount: float, 
                                payment_date: date,
                                description: Optional[str] = None) -> Transaction:
        supplier = self.supplier_repo.get_by_id(supplier_id)
        if not supplier:
            raise ValueError(f"Поставщик с ID {supplier_id} не найден")
        if amount <= 0:
            raise ValueError("Сумма оплаты должна быть положительным числом")
        if not description:
            description = f"Оплата поставщику: {supplier.name}"
        try:
            transaction = self.transaction_repo.register_supplier_payment(
                supplier_id=supplier_id,
                amount=amount,
                date_obj=payment_date,
                description=description
            )
            return transaction
        except Exception as e:
            raise ValueError(f"Ошибка при регистрации оплаты: {str(e)}")