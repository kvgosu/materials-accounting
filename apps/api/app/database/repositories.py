# app/database/repositories.py
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import func, and_, or_, desc, select, case
from datetime import datetime, date
from typing import List, Optional, Dict, Any, Tuple, Union
from .models import (
    Client, Supplier, Contract, Material, Invoice, 
    InvoiceItem, Transaction, DebtMovement,
    ContractStatus, InvoiceStatus, TransactionType, DebtDimension, DebtDirection,
    SupplierPriceList, PriceListItem 
)
import uuid

class BaseRepository:
    def __init__(self, db: Session, model=None):
        self.db = db
        self.model = model
        
    def get_by_id(self, entity_id):
        from .sqlite_helper import is_using_sqlite
        import uuid
        
        try:
            if is_using_sqlite(self.db):
                if isinstance(entity_id, str):
                    entity = self.db.query(self.model).filter(self.model.id == entity_id).first()
                    if entity:
                        return entity

                    try:
                        id_obj = uuid.UUID(entity_id)
                        entity = self.db.query(self.model).filter(self.model.id == str(id_obj)).first()
                        return entity
                    except ValueError:
                        return None
                elif isinstance(entity_id, uuid.UUID):
                    entity = self.db.query(self.model).filter(self.model.id == str(entity_id)).first()
                    return entity
            else:
                if isinstance(entity_id, str):
                    try:
                        id_obj = uuid.UUID(entity_id)
                        entity = self.db.query(self.model).filter(self.model.id == id_obj).first()
                        return entity
                    except ValueError:
                        return None
                else:
                    entity = self.db.query(self.model).filter(self.model.id == entity_id).first()
                    return entity
                    
            return None
        except Exception as e:
            print(f"Error in get_by_id: {str(e)}")
            return None
class ClientRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, Client)
     
    def get_by_id(self, client_id):
        from sqlalchemy.orm import joinedload, selectinload
        from .models import DebtMovement, DebtDirection, DebtDimension, Contract
        import uuid
        import logging
        
        logger = logging.getLogger(__name__)
        logger.setLevel(logging.DEBUG)
        
        try:
            query = self.db.query(Client).options(
                joinedload(Client.contracts),
                joinedload(Client.invoices)
            )
            if isinstance(client_id, str):
                try:
                    id_obj = uuid.UUID(client_id)
                    entity = query.filter(Client.id == id_obj).first()
                except ValueError:
                    entity = query.filter(Client.id == client_id).first()
            else:
                entity = query.filter(Client.id == client_id).first()
            if not entity:
                return None
            for contract in entity.contracts:
                contract.status = contract.status.value if hasattr(contract.status, 'value') else str(contract.status)
            
            debt_movements = self.db.query(DebtMovement).filter(
                DebtMovement.client_id == entity.id,
                DebtMovement.dimension == DebtDimension.CLIENT_DEBT
            ).all()
            total_debit = sum(
                movement.amount for movement in debt_movements 
                if movement.direction == DebtDirection.DEBIT
            )
            total_credit = sum(
                movement.amount for movement in debt_movements 
                if movement.direction == DebtDirection.CREDIT
            )
            debt_balance = total_debit - total_credit
            setattr(entity, 'debt_balance', debt_balance)
            return entity
        except Exception as e:
            logger.error(f"Ошибка при получении клиента: {str(e)}")
            import traceback
            logger.error(traceback.format_exc())
            return None
        
    def get_all(self, skip: int = 0, limit: int = 100, search: Optional[str] = None):
        query = self.db.query(Client)
        if search:
            query = query.filter(Client.name.ilike(f"%{search}%"))
        
        return query.order_by(Client.name).offset(skip).limit(limit).all()
    
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
class SupplierRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, Supplier)
        
    def get_all(self, skip: int = 0, limit: int = 100, search: Optional[str] = None):
        query = self.db.query(Supplier)
        if search:
            query = query.filter(Supplier.name.ilike(f"%{search}%"))
        
        return query.order_by(Supplier.name).offset(skip).limit(limit).all()
    
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
class SupplierPriceListRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, SupplierPriceList)
        
    def get_all(self, 
               skip: int = 0, 
               limit: int = 100, 
               supplier_id: Optional[uuid.UUID] = None,
               is_active: Optional[bool] = None,
               date_from: Optional[date] = None,
               date_to: Optional[date] = None):
        query = self.db.query(SupplierPriceList)
        if supplier_id:
            query = query.filter(SupplierPriceList.supplier_id == supplier_id)
        if is_active is not None:
            query = query.filter(SupplierPriceList.is_active == is_active)
        if date_from:
            query = query.filter(SupplierPriceList.date >= date_from)
        if date_to:
            query = query.filter(SupplierPriceList.date <= date_to)
        return query.order_by(SupplierPriceList.date.desc()).offset(skip).limit(limit).all()
    
    def get_latest_for_supplier(self, supplier_id: uuid.UUID, only_active: bool = True):
        query = self.db.query(SupplierPriceList).filter(
            SupplierPriceList.supplier_id == supplier_id
        )
        if only_active:
            query = query.filter(SupplierPriceList.is_active == True)
        return query.order_by(SupplierPriceList.date.desc()).first()
    
    def create(self, price_list_data: Dict[str, Any], items_data: List[Dict[str, Any]]):
        try:
            price_list = SupplierPriceList(**price_list_data)
            self.db.add(price_list)
            self.db.flush() 
            for item_data in items_data:
                item_data["price_list_id"] = price_list.id
                item = PriceListItem(**item_data)
                self.db.add(item)
            self.db.commit()
            self.db.refresh(price_list)
            return price_list
        except Exception as e:
            self.db.rollback()
            raise e
    
    def update(self, price_list_id: uuid.UUID, price_list_data: Dict[str, Any]):
        price_list = self.get_by_id(price_list_id)
        if not price_list:
            return None
        for key, value in price_list_data.items():
            setattr(price_list, key, value)
        self.db.commit()
        self.db.refresh(price_list)
        return price_list
    
    def deactivate(self, price_list_id: uuid.UUID):
        price_list = self.get_by_id(price_list_id)
        if not price_list:
            return False
        price_list.is_active = False
        self.db.commit()
        return True
    
    def activate(self, price_list_id: uuid.UUID):
        price_list = self.get_by_id(price_list_id)
        if not price_list:
            return False
        price_list.is_active = True
        self.db.commit()
        return True

    def delete(self, price_list_id: uuid.UUID):
        price_list = self.get_by_id(price_list_id)
        if not price_list:
            return False
        self.db.delete(price_list)
        self.db.commit()
        return True
class PriceListItemRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, PriceListItem)
        
    def get_current_price_for_material(self, material_id: uuid.UUID, supplier_id: uuid.UUID) -> Optional[PriceListItem]:
        price_list_query = self.db.query(SupplierPriceList).filter(
            SupplierPriceList.supplier_id == supplier_id,
            SupplierPriceList.is_active == True
        ).order_by(SupplierPriceList.date.desc())
        price_lists = price_list_query.all()
        if not price_lists:
            price_list_query = self.db.query(SupplierPriceList).filter(
                SupplierPriceList.supplier_id == supplier_id
            ).order_by(SupplierPriceList.date.desc())
            price_lists = price_list_query.all()
        if not price_lists:
            return None
        for price_list in price_lists:
            item = self.db.query(PriceListItem).filter(
                PriceListItem.price_list_id == price_list.id,
                PriceListItem.material_id == material_id
            ).first()
            if item:
                return item
        return None

    def get_by_price_list(self, 
                         price_list_id: uuid.UUID,
                         skip: int = 0, 
                         limit: int = 100,
                         search: Optional[str] = None):
        query = self.db.query(PriceListItem).filter(
            PriceListItem.price_list_id == price_list_id
        )
        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    PriceListItem.name.ilike(search_pattern),
                    PriceListItem.supplier_code.ilike(search_pattern),
                    PriceListItem.barcode.ilike(search_pattern),
                    PriceListItem.article.ilike(search_pattern)
                )
            )
        return query.offset(skip).limit(limit).all()
    
    def link_to_material(self, item_id: uuid.UUID, material_id: uuid.UUID):
        item = self.get_by_id(item_id)
        if not item:
            return False
        
        item.material_id = material_id
        self.db.commit()
        return True

    def update(self, item_id: uuid.UUID, item_data: Dict[str, Any]):
        item = self.get_by_id(item_id)
        if not item:
            return None
        for key, value in item_data.items():
            setattr(item, key, value)
        self.db.commit()
        self.db.refresh(item)
        return item    
class ContractRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, Contract)
        
    def get_all(self, 
               skip: int = 0, 
               limit: int = 100, 
               client_id: Optional[uuid.UUID] = None,
               status: Optional[Union[str, ContractStatus]] = None) -> List[Contract]:
        query = self.db.query(Contract)
        if client_id:
            query = query.filter(Contract.client_id == client_id)
        if status is not None:
            if isinstance(status, str):
                status = ContractStatus[status.upper()]
            query = query.filter(Contract.status == status)
        return query.order_by(desc(Contract.date)).offset(skip).limit(limit).all()
    
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
class MaterialRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, Material)
        
    def get_all(self, skip: int = 0, limit: int = 100, search: Optional[str] = None):
        query = self.db.query(Material)
        if search:
            query = query.filter(Material.name.ilike(f"%{search}%"))
        return query.order_by(Material.name).offset(skip).limit(limit).all()
    
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
class InvoiceRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, Invoice)
        
    def get_all(self, 
                skip: int = 0, 
                limit: int = 100, 
                client_id: Optional[uuid.UUID] = None,
                supplier_id: Optional[uuid.UUID] = None,
                contract_id: Optional[uuid.UUID] = None,
                status: Optional[Union[str, InvoiceStatus]] = None,
                date_from: Optional[date] = None,
                date_to: Optional[date] = None):
        
        query = self.db.query(Invoice)
        
        if client_id:
            query = query.filter(Invoice.client_id == client_id)
        
        if supplier_id:
            query = query.filter(Invoice.supplier_id == supplier_id)
        
        if contract_id:
            query = query.filter(Invoice.contract_id == contract_id)
        
        if status is not None:
            if isinstance(status, str):
                try:
                    status = InvoiceStatus[status]
                except KeyError:
                    pass
            query = query.filter(Invoice.status == status)
        
        if date_from:
            query = query.filter(Invoice.date >= date_from)
        
        if date_to:
            query = query.filter(Invoice.date <= date_to)
        
        return query.order_by(desc(Invoice.date)).offset(skip).limit(limit).all()
    
    def get_with_items(self, invoice_id: uuid.UUID):
        return self.db.query(Invoice).filter(Invoice.id == invoice_id).options(
            selectinload(Invoice.items).selectinload(InvoiceItem.material)
        ).first()
    
    def create(self, invoice_data: Dict[str, Any], items_data: List[Dict[str, Any]]):
        try:
            invoice = Invoice(**invoice_data)
            self.db.add(invoice)
            self.db.flush()
            total_amount = 0
            total_with_markup = 0
            contract_id = invoice.contract_id
            contract = self.db.query(Contract).filter(Contract.id == contract_id).first()
            markup_percentage = contract.markup_percentage if contract else 0
            for item_data in items_data:
                item_data["invoice_id"] = invoice.id
                quantity = item_data.get("quantity", 0)
                price = item_data.get("price", 0)
                amount = quantity * price
                amount_with_markup = amount * (1 + markup_percentage / 100)
                item_data["amount"] = amount
                item_data["amount_with_markup"] = amount_with_markup
                item = InvoiceItem(**item_data)
                self.db.add(item)
                total_amount += amount
                total_with_markup += amount_with_markup   
            invoice.total_amount = total_amount
            invoice.total_with_markup = total_with_markup
            self.db.commit()
            self.db.refresh(invoice)
            if hasattr(invoice, 'status') and invoice.status:
                if not isinstance(invoice.status, str) and hasattr(invoice.status, 'name'):
                    invoice.status = invoice.status.name
                else:
                    invoice.status = str(invoice.status)
            if hasattr(invoice, 'items') and invoice.items:
                for item in invoice.items:
                    pass      
            return invoice   
        except Exception as e:
            self.db.rollback()
            raise e

    def update(self, invoice_id: uuid.UUID, invoice_data: Dict[str, Any], items_data: Optional[List[Dict[str, Any]]] = None):
        try:
            invoice = self.get_by_id(invoice_id)
            if not invoice:
                return None   
            for key, value in invoice_data.items():
                setattr(invoice, key, value)   
            if items_data is not None:
                self.db.query(InvoiceItem).filter(InvoiceItem.invoice_id == invoice_id).delete()
                total_amount = 0
                total_with_markup = 0
                contract_id = invoice_data.get('contract_id', invoice.contract_id)
                contract = self.db.query(Contract).filter(Contract.id == contract_id).first()
                markup_percentage = contract.markup_percentage if contract else 0
                for item_data in items_data:
                    item_data["invoice_id"] = invoice_id
                    quantity = item_data.get("quantity", 0)
                    price = item_data.get("price", 0)
                    amount = quantity * price
                    amount_with_markup = amount * (1 + markup_percentage / 100)
                    item_data["amount"] = amount
                    item_data["amount_with_markup"] = amount_with_markup
                    item = InvoiceItem(**item_data)
                    self.db.add(item)
                    total_amount += amount
                    total_with_markup += amount_with_markup   
                invoice.total_amount = total_amount
                invoice.total_with_markup = total_with_markup   
            self.db.commit()
            self.db.refresh(invoice)
            if hasattr(invoice, 'status') and invoice.status:
                if hasattr(invoice.status, 'name'):
                    invoice.status = invoice.status.name
                else:
                    invoice.status = str(invoice.status)
            if hasattr(invoice, 'items') and invoice.items:
                for item in invoice.items:
                    pass        
            return invoice 
        except Exception as e:
            self.db.rollback()
            raise e
    
    def delete(self, invoice_id: uuid.UUID):
        try:
            invoice = self.get_by_id(invoice_id)
            if not invoice:
                return False
            self.db.query(DebtMovement).filter(
                DebtMovement.document_type == "invoice",
                DebtMovement.document_id == invoice_id
            ).delete()
            self.db.delete(invoice)
            self.db.commit()
            return True
        except Exception as e:
            self.db.rollback()
            raise e
    
    def process_invoice(self, invoice_id: uuid.UUID):
        try:
            invoice = self.get_with_items(invoice_id)
            if not invoice or invoice.status != InvoiceStatus.CREATED:
                return False
            transaction_repo = TransactionRepository(self.db)
            debt_movement_repo = DebtMovementRepository(self.db)
            client_transaction = transaction_repo.create({
                "invoice_id": invoice.id,
                "client_id": invoice.client_id,
                "type": TransactionType.CLIENT_DEBT,
                "amount": invoice.total_with_markup,
                "date": invoice.date,
                "description": f"Долг клиенту по накладной №{invoice.number}"
            })
            supplier_transaction = transaction_repo.create({
                "invoice_id": invoice.id,
                "supplier_id": invoice.supplier_id,
                "type": TransactionType.SUPPLIER_DEBT,
                "amount": invoice.total_amount,
                "date": invoice.date,
                "description": f"Долг поставщику по накладной №{invoice.number}"
            })
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
            invoice.status = InvoiceStatus.PROCESSED
            self.db.commit()
            return True
        except Exception as e:
            self.db.rollback()
            raise e
class InvoiceItemRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, InvoiceItem)
        
    def get_all(self, skip: int = 0, limit: int = 100, invoice_id: Optional[uuid.UUID] = None):
        query = self.db.query(InvoiceItem)
        if invoice_id:
            query = query.filter(InvoiceItem.invoice_id == invoice_id)
        return query.offset(skip).limit(limit).all()
    
    def get_by_invoice_id(self, invoice_id: uuid.UUID):
        return self.db.query(InvoiceItem).filter(InvoiceItem.invoice_id == invoice_id).all()
    
    def create(self, item_data: Dict[str, Any]):
        item = InvoiceItem(**item_data)
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item
    
    def update(self, item_id: uuid.UUID, item_data: Dict[str, Any]):
        item = self.get_by_id(item_id)
        if not item:
            return None
        for key, value in item_data.items():
            setattr(item, key, value)
        self.db.commit()
        self.db.refresh(item)
        return item
    
    def delete(self, item_id: uuid.UUID):
        item = self.get_by_id(item_id)
        if not item:
            return False
        
        self.db.delete(item)
        self.db.commit()
        return True    
class TransactionRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, Transaction)
        
    def get_all(self,
                skip: int = 0, 
                limit: int = 100, 
                client_id: Optional[uuid.UUID] = None,
                supplier_id: Optional[uuid.UUID] = None,
                invoice_id: Optional[uuid.UUID] = None,
                type: Optional[TransactionType] = None,
                date_from: Optional[date] = None,
                date_to: Optional[date] = None):
        
        query = self.db.query(Transaction)
        if client_id:
            query = query.filter(Transaction.client_id == client_id)
        if supplier_id:
            query = query.filter(Transaction.supplier_id == supplier_id)
        if invoice_id:
            query = query.filter(Transaction.invoice_id == invoice_id)
        if type:
            if isinstance(type, str):
                try:
                    type = TransactionType[type]
                except KeyError:
                    pass
            query = query.filter(Transaction.type == type)
        if date_from:
            query = query.filter(Transaction.date >= date_from)
        if date_to:
            query = query.filter(Transaction.date <= date_to)
        return query.order_by(desc(Transaction.date)).offset(skip).limit(limit).all()
    
    def create(self, transaction_data: Dict[str, Any]):
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f"Creating transaction with data: {transaction_data}")
        transaction = Transaction(**transaction_data)
        self.db.add(transaction)
        self.db.commit()
        logger.info(f"Created transaction: {transaction.id}, client_id: {transaction.client_id}")
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
        try:
            transaction = self.create({
                "client_id": client_id,
                "type": TransactionType.CLIENT_PAYMENT,
                "amount": amount,
                "date": date_obj,
                "description": description or "Оплата от клиента"
            })
            debt_movement_repo = DebtMovementRepository(self.db)
            debt_movement_repo.create({
                "period": datetime.combine(date_obj, datetime.min.time()),
                "document_id": transaction.id,
                "document_type": "transaction",
                "transaction_id": transaction.id,
                "client_id": client_id,
                "amount": amount,
                "direction": DebtDirection.CREDIT,  
                "dimension": DebtDimension.CLIENT_DEBT
            })
            self.db.commit()
            return transaction   
        except Exception as e:
            self.db.rollback()
            raise e
         
    def register_supplier_payment(self, supplier_id: uuid.UUID, amount: float, date_obj: date, description: Optional[str] = None):
        try:
            transaction = self.create({
                "supplier_id": supplier_id,
                "type": TransactionType.SUPPLIER_PAYMENT,
                "amount": amount,
                "date": date_obj,
                "description": description or "Оплата поставщику"
            })
            debt_movement_repo = DebtMovementRepository(self.db)
            debt_movement_repo.create({
                "period": datetime.combine(date_obj, datetime.min.time()),
                "document_id": transaction.id,
                "document_type": "transaction",
                "transaction_id": transaction.id,
                "supplier_id": supplier_id,
                "amount": amount,
                "direction": DebtDirection.CREDIT,  
                "dimension": DebtDimension.SUPPLIER_DEBT
            })
            self.db.commit()
            return transaction   
        except Exception as e:
            self.db.rollback()
            raise e       
class DebtMovementRepository(BaseRepository):
    def __init__(self, db: Session):
        super().__init__(db, DebtMovement)
        
    def get_all(self, 
            skip: int = 0, 
            limit: int = 100, 
            client_id: Optional[uuid.UUID] = None,
            supplier_id: Optional[uuid.UUID] = None,
            dimension: Optional[DebtDimension] = None,
            document_id: Optional[uuid.UUID] = None,
            invoice_id: Optional[uuid.UUID] = None,  
            transaction_id: Optional[uuid.UUID] = None,  
            period_from: Optional[datetime] = None,
            period_to: Optional[datetime] = None):
        query = self.db.query(DebtMovement)
        if client_id:
            query = query.filter(DebtMovement.client_id == client_id)
        if supplier_id:
            query = query.filter(DebtMovement.supplier_id == supplier_id)
        if dimension:
            query = query.filter(DebtMovement.dimension == dimension)
        if document_id:
            query = query.filter(DebtMovement.document_id == document_id)
        if invoice_id:  # Добавляем фильтрацию по invoice_id
            query = query.filter(DebtMovement.invoice_id == invoice_id)
        if transaction_id:  # Добавляем фильтрацию по transaction_id
            query = query.filter(DebtMovement.transaction_id == transaction_id)
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
        import logging
        logger = logging.getLogger(__name__)
        
        # Расширенное логирование входящих параметров
        logger.info(f"Входящие параметры get_balances:")
        logger.info(f"Client ID: {client_id}")
        logger.info(f"Supplier ID: {supplier_id}")
        logger.info(f"Dimension: {dimension}")
        logger.info(f"As of Date: {as_of_date}")

        if as_of_date is None:
            as_of_date = datetime.now() 
        
        # Логирование фильтров
        filters = [DebtMovement.period <= as_of_date]
        if client_id:
            filters.append(DebtMovement.client_id == client_id)
        if supplier_id:
            filters.append(DebtMovement.supplier_id == supplier_id)
        if dimension:
            filters.append(DebtMovement.dimension == dimension)
        
        logger.info(f"Constructed filters: {[str(f) for f in filters]}")

        # Логирование всех движений долга перед агрегацией
        all_movements = self.db.query(DebtMovement).filter(*filters).all()
        logger.info(f"Total matching debt movements: {len(all_movements)}")
        for movement in all_movements:
            logger.debug(f"Movement: ID={movement.id}, Client={movement.client_id}, "
                        f"Supplier={movement.supplier_id}, Amount={movement.amount}, "
                        f"Direction={movement.direction}, Dimension={movement.dimension}")

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

        result = self.db.query(
            subquery.c.client_id,
            subquery.c.supplier_id,
            subquery.c.dimension,
            (subquery.c.debit_amount - subquery.c.credit_amount).label('balance')
        ).all()

        logger.info(f"Aggregation result count: {len(result)}")
        
        balances = []
        for row in result:
            balance_value = row.balance if row.balance is not None else 0.0
            balance_data = {
                'client_id': row.client_id,
                'supplier_id': row.supplier_id,
                'dimension': row.dimension,
                'balance': float(balance_value),  
                'as_of_date': as_of_date
            }
            
            logger.info(f"Processed balance: {balance_data}")
            
            if balance_value != 0 or client_id or supplier_id:
                balances.append(balance_data)

        logger.info(f"Balances before final processing: {balances}")

        # Дополнительная обработка для пустых результатов
        if not balances and (client_id or supplier_id):
            if client_id and (not dimension or dimension == DebtDimension.CLIENT_DEBT):
                default_balance = {
                    'client_id': client_id,
                    'supplier_id': None,
                    'dimension': DebtDimension.CLIENT_DEBT,
                    'balance': 0.0,
                    'as_of_date': as_of_date
                }
                logger.info(f"Added default client balance: {default_balance}")
                balances.append(default_balance)
            
            if supplier_id and (not dimension or dimension == DebtDimension.SUPPLIER_DEBT):
                default_balance = {
                    'client_id': None,
                    'supplier_id': supplier_id,
                    'dimension': DebtDimension.SUPPLIER_DEBT,
                    'balance': 0.0,
                    'as_of_date': as_of_date
                }
                logger.info(f"Added default supplier balance: {default_balance}")
                balances.append(default_balance)

        logger.info(f"Final balances: {balances}")
        return balances

    def get_turnovers(self,
                    client_id: Optional[uuid.UUID] = None,
                    supplier_id: Optional[uuid.UUID] = None,
                    dimension: Optional[DebtDimension] = None,
                    start_date: datetime = None,
                    end_date: datetime = None):
        if start_date is None:
            start_date = datetime(datetime.now().year, datetime.now().month, 1)
        if end_date is None:
            end_date = datetime.now()
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
        turnovers = []
        for row in result:
            debit_value = float(row.debit) if row.debit is not None else 0.0
            credit_value = float(row.credit) if row.credit is not None else 0.0
            balance_value = debit_value - credit_value
            turnover_data = {
                'client_id': row.client_id,
                'supplier_id': row.supplier_id,
                'dimension': row.dimension,
                'debit': debit_value,
                'credit': credit_value,
                'balance': balance_value,
                'start_date': start_date,
                'end_date': end_date
            }
            if debit_value != 0 or credit_value != 0 or client_id or supplier_id:
                turnovers.append(turnover_data)
        if not turnovers and (client_id or supplier_id):
            if client_id and (not dimension or dimension == DebtDimension.CLIENT_DEBT):
                turnovers.append({
                    'client_id': client_id,
                    'supplier_id': None,
                    'dimension': DebtDimension.CLIENT_DEBT,
                    'debit': 0.0,
                    'credit': 0.0,
                    'balance': 0.0,
                    'start_date': start_date,
                    'end_date': end_date
                })
            if supplier_id and (not dimension or dimension == DebtDimension.SUPPLIER_DEBT):
                turnovers.append({
                    'client_id': None,
                    'supplier_id': supplier_id,
                    'dimension': DebtDimension.SUPPLIER_DEBT,
                    'debit': 0.0,
                    'credit': 0.0,
                    'balance': 0.0,
                    'start_date': start_date,
                    'end_date': end_date
                })
        return turnovers