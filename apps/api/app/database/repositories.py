# app/database/repositories.py
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import func, and_, or_, desc, select, case
from datetime import datetime, date
from typing import List, Optional, Dict, Any, Tuple
from .models import (
    Client, Supplier, Contract, Material, Invoice, 
    InvoiceItem, Transaction, DebtMovement,
    ContractStatus, InvoiceStatus, TransactionType, DebtDimension, DebtDirection
)
import uuid

class BaseRepository:
    """Базовый класс для работы с репозиториями"""
    
    def __init__(self, db: Session):
        self.db = db

# Репозиторий для работы с клиентами
class ClientRepository(BaseRepository):
    def get_all(self, skip: int = 0, limit: int = 100, search: Optional[str] = None):
        query = self.db.query(Client)
        
        # Поиск по имени клиента
        if search:
            query = query.filter(Client.name.ilike(f"%{search}%"))
        
        return query.order_by(Client.name).offset(skip).limit(limit).all()
    
    def get_by_id(self, client_id: uuid.UUID):
        return self.db.query(Client).filter(Client.id == client_id).first()
    
    def create(self, client_data: Dict[str, Any]):
        client = Client(**client_data)
        self.db.add(client)
        self.db.commit()
        self.db.refresh(client)
        return client
    
    def update(self, client_id: uuid.UUID, client_data: Dict[str, Any]):
        client = self.get_by_id(client_id)
        if not client:
            return None
        
        for key, value in client_data.items():
            setattr(client, key, value)
        
        self.db.commit()
        self.db.refresh(client)
        return client
    
    def delete(self, client_id: uuid.UUID):
        client = self.get_by_id(client_id)
        if not client:
            return False
        
        self.db.delete(client)
        self.db.commit()
        return True

# Репозиторий для работы с поставщиками
class SupplierRepository(BaseRepository):
    def get_all(self, skip: int = 0, limit: int = 100, search: Optional[str] = None):
        query = self.db.query(Supplier)
        
        # Поиск по имени поставщика
        if search:
            query = query.filter(Supplier.name.ilike(f"%{search}%"))
        
        return query.order_by(Supplier.name).offset(skip).limit(limit).all()
    
    def get_by_id(self, supplier_id: uuid.UUID):
        return self.db.query(Supplier).filter(Supplier.id == supplier_id).first()
    
    def create(self, supplier_data: Dict[str, Any]):
        supplier = Supplier(**supplier_data)
        self.db.add(supplier)
        self.db.commit()
        self.db.refresh(supplier)
        return supplier
    
    def update(self, supplier_id: uuid.UUID, supplier_data: Dict[str, Any]):
        supplier = self.get_by_id(supplier_id)
        if not supplier:
            return None
        
        for key, value in supplier_data.items():
            setattr(supplier, key, value)
        
        self.db.commit()
        self.db.refresh(supplier)
        return supplier
    
    def delete(self, supplier_id: uuid.UUID):
        supplier = self.get_by_id(supplier_id)
        if not supplier:
            return False
        
        self.db.delete(supplier)
        self.db.commit()
        return True

# Репозиторий для работы с договорами
class ContractRepository(BaseRepository):
    def get_all(self, skip: int = 0, limit: int = 100, client_id: Optional[uuid.UUID] = None):
        query = self.db.query(Contract)
        
        if client_id:
            query = query.filter(Contract.client_id == client_id)
        
        return query.order_by(desc(Contract.date)).offset(skip).limit(limit).all()
    
    def get_by_id(self, contract_id: uuid.UUID):
        return self.db.query(Contract).filter(Contract.id == contract_id).first()
    
    def get_active_by_client(self, client_id: uuid.UUID):
        return self.db.query(Contract).filter(
            Contract.client_id == client_id,
            Contract.status == ContractStatus.ACTIVE,
            or_(
                Contract.expiration_date.is_(None),
                Contract.expiration_date >= date.today()
            )
        ).all()
    
    def create(self, contract_data: Dict[str, Any]):
        contract = Contract(**contract_data)
        self.db.add(contract)
        self.db.commit()
        self.db.refresh(contract)
        return contract
    
    def update(self, contract_id: uuid.UUID, contract_data: Dict[str, Any]):
        contract = self.get_by_id(contract_id)
        if not contract:
            return None
        
        for key, value in contract_data.items():
            setattr(contract, key, value)
        
        self.db.commit()
        self.db.refresh(contract)
        return contract
    
    def delete(self, contract_id: uuid.UUID):
        contract = self.get_by_id(contract_id)
        if not contract:
            return False
        
        self.db.delete(contract)
        self.db.commit()
        return True

# Репозиторий для работы с материалами
class MaterialRepository(BaseRepository):
    def get_all(self, skip: int = 0, limit: int = 100, search: Optional[str] = None):
        query = self.db.query(Material)
        
        if search:
            query = query.filter(Material.name.ilike(f"%{search}%"))
        
        return query.order_by(Material.name).offset(skip).limit(limit).all()
    
    def get_by_id(self, material_id: uuid.UUID):
        return self.db.query(Material).filter(Material.id == material_id).first()
    
    def create(self, material_data: Dict[str, Any]):
        material = Material(**material_data)
        self.db.add(material)
        self.db.commit()
        self.db.refresh(material)
        return material
    
    def update(self, material_id: uuid.UUID, material_data: Dict[str, Any]):
        material = self.get_by_id(material_id)
        if not material:
            return None
        
        for key, value in material_data.items():
            setattr(material, key, value)
        
        self.db.commit()
        self.db.refresh(material)
        return material
    
    def delete(self, material_id: uuid.UUID):
        material = self.get_by_id(material_id)
        if not material:
            return False
        
        self.db.delete(material)
        self.db.commit()
        return True

# Репозиторий для работы с накладными
class InvoiceRepository(BaseRepository):
    def get_all(self, 
               skip: int = 0, 
               limit: int = 100, 
               client_id: Optional[uuid.UUID] = None,
               supplier_id: Optional[uuid.UUID] = None,
               status: Optional[InvoiceStatus] = None,
               date_from: Optional[date] = None,
               date_to: Optional[date] = None):
        
        query = self.db.query(Invoice)
        
        if client_id:
            query = query.filter(Invoice.client_id == client_id)
        
        if supplier_id:
            query = query.filter(Invoice.supplier_id == supplier_id)
        
        if status:
            query = query.filter(Invoice.status == status)
        
        if date_from:
            query = query.filter(Invoice.date >= date_from)
        
        if date_to:
            query = query.filter(Invoice.date <= date_to)
        
        return query.order_by(desc(Invoice.date)).offset(skip).limit(limit).all()
    
    def get_by_id(self, invoice_id: uuid.UUID):
        return self.db.query(Invoice).filter(Invoice.id == invoice_id).first()
    
    def get_with_items(self, invoice_id: uuid.UUID):
        return self.db.query(Invoice).filter(Invoice.id == invoice_id).options(
            selectinload(Invoice.items).selectinload(InvoiceItem.material)
        ).first()
    
    def create(self, invoice_data: Dict[str, Any], items_data: List[Dict[str, Any]]):
        # Начинаем транзакцию
        try:
            # Создаем накладную
            invoice = Invoice(**invoice_data)
            self.db.add(invoice)
            self.db.flush()  # Получаем ID новой накладной
            
            # Создаем позиции накладной
            total_amount = 0
            total_with_markup = 0
            
            for item_data in items_data:
                item_data["invoice_id"] = invoice.id
                item = InvoiceItem(**item_data)
                total_amount += item.amount
                total_with_markup += item.amount_with_markup
                self.db.add(item)
            
            # Обновляем итоговые суммы накладной
            invoice.total_amount = total_amount
            invoice.total_with_markup = total_with_markup
            
            # Сохраняем изменения
            self.db.commit()
            self.db.refresh(invoice)
            return invoice
        
        except Exception as e:
            self.db.rollback()
            raise e
    
    def update(self, invoice_id: uuid.UUID, invoice_data: Dict[str, Any], items_data: Optional[List[Dict[str, Any]]] = None):
        try:
            invoice = self.get_by_id(invoice_id)
            if not invoice:
                return None
            
            # Обновляем только те поля накладной, которые переданы
            for key, value in invoice_data.items():
                setattr(invoice, key, value)
            
            # Если переданы позиции, обновляем их
            if items_data is not None:
                # Удаляем старые позиции
                self.db.query(InvoiceItem).filter(InvoiceItem.invoice_id == invoice_id).delete()
                
                # Создаем новые позиции
                total_amount = 0
                total_with_markup = 0
                
                for item_data in items_data:
                    item_data["invoice_id"] = invoice_id
                    item = InvoiceItem(**item_data)
                    total_amount += item.amount
                    total_with_markup += item.amount_with_markup
                    self.db.add(item)
                
                # Обновляем итоговые суммы накладной
                invoice.total_amount = total_amount
                invoice.total_with_markup = total_with_markup
            
            # Сохраняем изменения
            self.db.commit()
            self.db.refresh(invoice)
            return invoice
        
        except Exception as e:
            self.db.rollback()
            raise e
    
    def delete(self, invoice_id: uuid.UUID):
        try:
            invoice = self.get_by_id(invoice_id)
            if not invoice:
                return False
            
            # Удаляем связанные записи в регистре долгов
            self.db.query(DebtMovement).filter(
                DebtMovement.document_type == "invoice",
                DebtMovement.document_id == invoice_id
            ).delete()
            
            # Удаляем накладную (позиции удалятся каскадно)
            self.db.delete(invoice)
            self.db.commit()
            return True
            
        except Exception as e:
            self.db.rollback()
            raise e
    
    def process_invoice(self, invoice_id: uuid.UUID):
        """Обработка накладной - создание транзакций и движений в регистре долгов"""
        try:
            invoice = self.get_with_items(invoice_id)
            if not invoice or invoice.status != InvoiceStatus.CREATED:
                return False
            
            transaction_repo = TransactionRepository(self.db)
            debt_movement_repo = DebtMovementRepository(self.db)
            
            # Создаем транзакцию долга клиенту
            client_transaction = transaction_repo.create({
                "invoice_id": invoice.id,
                "client_id": invoice.client_id,
                "type": TransactionType.CLIENT_DEBT,
                "amount": invoice.total_with_markup,
                "date": invoice.date,
                "description": f"Долг клиенту по накладной №{invoice.number}"
            })
            
            # Создаем транзакцию долга поставщику
            supplier_transaction = transaction_repo.create({
                "invoice_id": invoice.id,
                "supplier_id": invoice.supplier_id,
                "type": TransactionType.SUPPLIER_DEBT,
                "amount": invoice.total_amount,
                "date": invoice.date,
                "description": f"Долг поставщику по накладной №{invoice.number}"
            })
            
            # Создаем движения в регистре долгов
            
            # Увеличение долга клиента
            debt_movement_repo.create({
                "period": datetime.combine(invoice.date, datetime.min.time()),
                "document_id": invoice.id,
                "document_type": "invoice",
                "invoice_id": invoice.id,
                "client_id": invoice.client_id,
                "amount": invoice.total_with_markup,
                "direction": DebtDirection.DEBIT,
                "dimension": DebtDimension.CLIENT_DEBT
            })
            
            # Увеличение долга поставщику
            debt_movement_repo.create({
                "period": datetime.combine(invoice.date, datetime.min.time()),
                "document_id": invoice.id,
                "document_type": "invoice",
                "invoice_id": invoice.id,
                "supplier_id": invoice.supplier_id,
                "amount": invoice.total_amount,
                "direction": DebtDirection.DEBIT,
                "dimension": DebtDimension.SUPPLIER_DEBT
            })
            
            # Обновляем статус накладной
            invoice.status = InvoiceStatus.PROCESSED
            self.db.commit()
            return True
            
        except Exception as e:
            self.db.rollback()
            raise e

# Репозиторий для работы с транзакциями
class TransactionRepository(BaseRepository):
    def get_all(self, 
               skip: int = 0, 
               limit: int = 100, 
               client_id: Optional[uuid.UUID] = None,
               supplier_id: Optional[uuid.UUID] = None,
               transaction_type: Optional[TransactionType] = None,
               date_from: Optional[date] = None,
               date_to: Optional[date] = None):
        
        query = self.db.query(Transaction)
        
        if client_id:
            query = query.filter(Transaction.client_id == client_id)
        
        if supplier_id:
            query = query.filter(Transaction.supplier_id == supplier_id)
        
        if transaction_type:
            query = query.filter(Transaction.type == transaction_type)
        
        if date_from:
            query = query.filter(Transaction.date >= date_from)
        
        if date_to:
            query = query.filter(Transaction.date <= date_to)
        
        return query.order_by(desc(Transaction.date)).offset(skip).limit(limit).all()
    
    def get_by_id(self, transaction_id: uuid.UUID):
        return self.db.query(Transaction).filter(Transaction.id == transaction_id).first()
    
    def create(self, transaction_data: Dict[str, Any]):
        transaction = Transaction(**transaction_data)
        self.db.add(transaction)
        self.db.commit()
        self.db.refresh(transaction)
        return transaction
    
    def update(self, transaction_id: uuid.UUID, transaction_data: Dict[str, Any]):
        transaction = self.get_by_id(transaction_id)
        if not transaction:
            return None
        
        for key, value in transaction_data.items():
            setattr(transaction, key, value)
        
        self.db.commit()
        self.db.refresh(transaction)
        return transaction
    
    def register_client_payment(self, client_id: uuid.UUID, amount: float, date_obj: date, description: Optional[str] = None):
        """Регистрация оплаты от клиента"""
        try:
            # Создаем транзакцию оплаты
            transaction = self.create({
                "client_id": client_id,
                "type": TransactionType.CLIENT_PAYMENT,
                "amount": amount,
                "date": date_obj,
                "description": description or "Оплата от клиента"
            })
            
            # Создаем движение в регистре долгов
            debt_movement_repo = DebtMovementRepository(self.db)
            debt_movement_repo.create({
                "period": datetime.combine(date_obj, datetime.min.time()),
                "document_id": transaction.id,
                "document_type": "transaction",
                "transaction_id": transaction.id,
                "client_id": client_id,
                "amount": amount,
                "direction": DebtDirection.CREDIT,  # Уменьшение долга
                "dimension": DebtDimension.CLIENT_DEBT
            })
            
            return transaction
            
        except Exception as e:
            self.db.rollback()
            raise e
    
# Репозиторий для работы с регистром долгов
class DebtMovementRepository(BaseRepository):
    def get_all(self, 
               skip: int = 0, 
               limit: int = 100, 
               client_id: Optional[uuid.UUID] = None,
               supplier_id: Optional[uuid.UUID] = None,
               dimension: Optional[DebtDimension] = None,
               period_from: Optional[datetime] = None,
               period_to: Optional[datetime] = None):
        
        query = self.db.query(DebtMovement)
        
        if client_id:
            query = query.filter(DebtMovement.client_id == client_id)
        
        if supplier_id:
            query = query.filter(DebtMovement.supplier_id == supplier_id)
        
        if dimension:
            query = query.filter(DebtMovement.dimension == dimension)
        
        if period_from:
            query = query.filter(DebtMovement.period >= period_from)
        
        if period_to:
            query = query.filter(DebtMovement.period <= period_to)
        
        return query.order_by(DebtMovement.period).offset(skip).limit(limit).all()
    
    def create(self, movement_data: Dict[str, Any]):
        movement = DebtMovement(**movement_data)
        self.db.add(movement)
        self.db.commit()
        self.db.refresh(movement)
        return movement
    
    def get_balances(self, 
                    client_id: Optional[uuid.UUID] = None,
                    supplier_id: Optional[uuid.UUID] = None,
                    dimension: Optional[DebtDimension] = None,
                    as_of_date: Optional[datetime] = None):
        """
        Получение остатков по долгам на определенную дату
        
        Остаток = Сумма движений с direction=DEBIT - Сумма движений с direction=CREDIT
        """
        
        # Если дата не указана, берем текущую
        if as_of_date is None:
            as_of_date = datetime.now()
        
        # Базовый запрос
        filters = [DebtMovement.period <= as_of_date]
        
        if client_id:
            filters.append(DebtMovement.client_id == client_id)
        
        if supplier_id:
            filters.append(DebtMovement.supplier_id == supplier_id)
        
        if dimension:
            filters.append(DebtMovement.dimension == dimension)
        
        # Формируем подзапрос для расчета дебетовых и кредитовых оборотов
        subquery = self.db.query(
            DebtMovement.client_id, 
            DebtMovement.supplier_id,
            DebtMovement.dimension,
            func.sum(
                case(
                    (DebtMovement.direction == DebtDirection.DEBIT, DebtMovement.amount),
                    else_=0
                )
            ).label('debit_amount'),
            func.sum(
                case(
                    (DebtMovement.direction == DebtDirection.CREDIT, DebtMovement.amount),
                    else_=0
                )
            ).label('credit_amount')
        ).filter(*filters).group_by(
            DebtMovement.client_id, 
            DebtMovement.supplier_id,
            DebtMovement.dimension
        ).subquery()
        
        # Формируем итоговый запрос
        result = self.db.query(
            subquery.c.client_id,
            subquery.c.supplier_id,
            subquery.c.dimension,
            (subquery.c.debit_amount - subquery.c.credit_amount).label('balance')
        ).all()
        
        # Преобразуем результат в список словарей
        balances = []
        for row in result:
            balance_data = {
                'client_id': row.client_id,
                'supplier_id': row.supplier_id,
                'dimension': row.dimension,
                'balance': row.balance,
                'as_of_date': as_of_date
            }
            balances.append(balance_data)
        
        return balances

    def get_turnovers(self,
                     client_id: Optional[uuid.UUID] = None,
                     supplier_id: Optional[uuid.UUID] = None,
                     dimension: Optional[DebtDimension] = None,
                     start_date: datetime = None,
                     end_date: datetime = None):
        """
        Получение оборотов по долгам за период
        """
        
        # Если даты не указаны, берем текущий месяц
        if start_date is None:
            start_date = datetime(datetime.now().year, datetime.now().month, 1)
        
        if end_date is None:
            end_date = datetime.now()
        
        # Базовый запрос
        filters = [
            DebtMovement.period >= start_date,
            DebtMovement.period <= end_date
        ]
        
        if client_id:
            filters.append(DebtMovement.client_id == client_id)
        
        if supplier_id:
            filters.append(DebtMovement.supplier_id == supplier_id)
        
        if dimension:
            filters.append(DebtMovement.dimension == dimension)
        
        # Запрос для получения оборотов
        result = self.db.query(
            DebtMovement.client_id, 
            DebtMovement.supplier_id,
            DebtMovement.dimension,
            func.sum(
                case(
                    (DebtMovement.direction == DebtDirection.DEBIT, DebtMovement.amount),
                    else_=0
                )
            ).label('debit'),
            func.sum(
                case(
                    (DebtMovement.direction == DebtDirection.CREDIT, DebtMovement.amount),
                    else_=0
                )
            ).label('credit')
        ).filter(*filters).group_by(
            DebtMovement.client_id, 
            DebtMovement.supplier_id,
            DebtMovement.dimension
        ).all()
        
        # Преобразуем результат в список словарей
        turnovers = []
        for row in result:
            turnover_data = {
                'client_id': row.client_id,
                'supplier_id': row.supplier_id,
                'dimension': row.dimension,
                'debit': row.debit,
                'credit': row.credit,
                'start_date': start_date,
                'end_date': end_date
            }
            turnovers.append(turnover_data)
        
        return turnovers