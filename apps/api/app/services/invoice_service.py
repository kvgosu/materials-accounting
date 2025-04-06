# app/services/invoice_service.py
from datetime import datetime, date
from typing import List, Optional, Dict, Any, Tuple
import uuid
from sqlalchemy.orm import Session

from ..database.repositories import (
    InvoiceRepository, 
    ClientRepository, 
    SupplierRepository,
    ContractRepository,
    MaterialRepository
)
from ..database.models import (
    Invoice, InvoiceItem, Transaction,
    InvoiceStatus, ContractStatus
)
from .contract_service import ContractService

class InvoiceService:
    def __init__(self, db: Session):
        self.db = db
        self.invoice_repo = InvoiceRepository(db)
        self.client_repo = ClientRepository(db)
        self.supplier_repo = SupplierRepository(db)
        self.contract_repo = ContractRepository(db)
        self.material_repo = MaterialRepository(db)
        self.contract_service = ContractService(db)
    
    def get_all_invoices(self, 
                        skip: int = 0, 
                        limit: int = 100, 
                        client_id: Optional[uuid.UUID] = None,
                        supplier_id: Optional[uuid.UUID] = None,
                        contract_id: Optional[uuid.UUID] = None,
                        status: Optional[InvoiceStatus] = None,
                        date_from: Optional[date] = None,
                        date_to: Optional[date] = None) -> List[Invoice]:
        return self.invoice_repo.get_all(
            skip=skip, 
            limit=limit, 
            client_id=client_id,
            supplier_id=supplier_id,
            contract_id=contract_id,
            status=status,
            date_from=date_from,
            date_to=date_to
        )
    
    def get_invoice_by_id(self, invoice_id: uuid.UUID, with_items: bool = True) -> Optional[Invoice]:
        if with_items:
            return self.invoice_repo.get_with_items(invoice_id)
        else:
            return self.invoice_repo.get_by_id(invoice_id)
    
    def create_invoice(self, invoice_data: Dict[str, Any], items_data: List[Dict[str, Any]]) -> Invoice:
        client_id = invoice_data.get('client_id')
        if not client_id:
            raise ValueError("ID клиента не указан")
        client = self.client_repo.get_by_id(client_id)
        if not client:
            raise ValueError(f"Клиент с ID {client_id} не найден")
        supplier_id = invoice_data.get('supplier_id')
        if not supplier_id:
            raise ValueError("ID поставщика не указан")
        supplier = self.supplier_repo.get_by_id(supplier_id)
        if not supplier:
            raise ValueError(f"Поставщик с ID {supplier_id} не найден")
        contract_id = invoice_data.get('contract_id')
        if not contract_id:
            raise ValueError("ID договора не указан")
        contract = self.contract_repo.get_by_id(contract_id)
        if not contract:
            raise ValueError(f"Договор с ID {contract_id} не найден")
        if contract.client_id != client_id:
            raise ValueError("Договор не принадлежит указанному клиенту")
        if not self.contract_service.check_contract_validity(contract_id):
            raise ValueError("Договор недействителен или истек срок его действия")
        required_fields = ['number', 'date']
        for field in required_fields:
            if field not in invoice_data:
                raise ValueError(f"Поле {field} обязательно для заполнения")
        if isinstance(invoice_data.get('date'), str):
            try:
                invoice_data['date'] = datetime.fromisoformat(invoice_data['date']).date()
            except ValueError:
                raise ValueError("Некорректный формат даты")
        if not items_data:
            raise ValueError("Накладная должна содержать хотя бы одну позицию")
        processed_items = []
        for item in items_data:
            material_id = item.get('material_id')
            if not material_id:
                raise ValueError("ID материала не указан")
            material = self.material_repo.get_by_id(material_id)
            if not material:
                raise ValueError(f"Материал с ID {material_id} не найден")
            if 'quantity' not in item:
                raise ValueError("Количество материала не указано")
            if 'price' not in item:
                raise ValueError("Цена материала не указана")
            quantity = float(item['quantity'])
            price = float(item['price'])
            if quantity <= 0:
                raise ValueError("Количество должно быть положительным числом")
            if price < 0:
                raise ValueError("Цена не может быть отрицательной")
            amount = quantity * price
            amount_with_markup = amount * (1 + contract.markup_percentage / 100)
            processed_item = {
                'material_id': material_id,
                'quantity': quantity,
                'price': price,
                'amount': amount,
                'amount_with_markup': amount_with_markup
            }
            processed_items.append(processed_item)
        if 'status' not in invoice_data:
            invoice_data['status'] = InvoiceStatus.CREATED
        try:
            invoice = self.invoice_repo.create(invoice_data, processed_items)
            return invoice
        except Exception as e:
            raise ValueError(f"Ошибка при создании накладной: {str(e)}")
    
    def update_invoice(self, 
                      invoice_id: uuid.UUID, 
                      invoice_data: Dict[str, Any], 
                      items_data: Optional[List[Dict[str, Any]]] = None) -> Optional[Invoice]:
        invoice = self.invoice_repo.get_by_id(invoice_id)
        if not invoice:
            return None
        if invoice.status != InvoiceStatus.CREATED:
            raise ValueError("Нельзя изменять уже обработанную накладную")
        if 'client_id' in invoice_data:
            client = self.client_repo.get_by_id(invoice_data['client_id'])
            if not client:
                raise ValueError(f"Клиент с ID {invoice_data['client_id']} не найден")
        if 'supplier_id' in invoice_data:
            supplier = self.supplier_repo.get_by_id(invoice_data['supplier_id'])
            if not supplier:
                raise ValueError(f"Поставщик с ID {invoice_data['supplier_id']} не найден")
        if 'contract_id' in invoice_data:
            contract_id = invoice_data['contract_id']
            contract = self.contract_repo.get_by_id(contract_id)
            if not contract:
                raise ValueError(f"Договор с ID {contract_id} не найден")
            client_id = invoice_data.get('client_id', invoice.client_id)
            if contract.client_id != client_id:
                raise ValueError("Договор не принадлежит указанному клиенту")
            if not self.contract_service.check_contract_validity(contract_id):
                raise ValueError("Договор недействителен или истек срок его действия")
        if invoice_data.get('date') and isinstance(invoice_data['date'], str):
            try:
                invoice_data['date'] = datetime.fromisoformat(invoice_data['date']).date()
            except ValueError:
                raise ValueError("Некорректный формат даты")
        processed_items = None
        if items_data is not None:
            if not items_data:
                raise ValueError("Накладная должна содержать хотя бы одну позицию")
            contract_id = invoice_data.get('contract_id', invoice.contract_id)
            contract = self.contract_repo.get_by_id(contract_id)
            processed_items = []
            for item in items_data:
                material_id = item.get('material_id')
                if not material_id:
                    raise ValueError("ID материала не указан")
                material = self.material_repo.get_by_id(material_id)
                if not material:
                    raise ValueError(f"Материал с ID {material_id} не найден")
                if 'quantity' not in item:
                    raise ValueError("Количество материала не указано")
                if 'price' not in item:
                    raise ValueError("Цена материала не указана")
                quantity = float(item['quantity'])
                price = float(item['price'])
                if quantity <= 0:
                    raise ValueError("Количество должно быть положительным числом")
                if price < 0:
                    raise ValueError("Цена не может быть отрицательной")
                amount = quantity * price
                amount_with_markup = amount * (1 + contract.markup_percentage / 100)
                processed_item = {
                    'material_id': material_id,
                    'quantity': quantity,
                    'price': price,
                    'amount': amount,
                    'amount_with_markup': amount_with_markup
                }
                if 'id' in item:
                    processed_item['id'] = item['id']
                
                processed_items.append(processed_item)
        try:
            updated_invoice = self.invoice_repo.update(invoice_id, invoice_data, processed_items)
            return updated_invoice
        except Exception as e:
            raise ValueError(f"Ошибка при обновлении накладной: {str(e)}")
    
    def delete_invoice(self, invoice_id: uuid.UUID) -> bool:
        invoice = self.invoice_repo.get_by_id(invoice_id)
        if not invoice:
            return False
        if invoice.status != InvoiceStatus.CREATED:
            raise ValueError("Нельзя удалить уже обработанную накладную")
        return self.invoice_repo.delete(invoice_id)
    
    def process_invoice(self, invoice_id: uuid.UUID) -> Tuple[Invoice, List[Transaction]]:
        invoice = self.invoice_repo.get_with_items(invoice_id)
        if not invoice:
            raise ValueError(f"Накладная с ID {invoice_id} не найдена")
        if invoice.status != InvoiceStatus.CREATED:
            raise ValueError(f"Накладная с ID {invoice_id} уже обработана")
        try:
            result = self.invoice_repo.process_invoice(invoice_id)
            if not result:
                raise ValueError(f"Не удалось обработать накладную с ID {invoice_id}")
            updated_invoice = self.invoice_repo.get_with_items(invoice_id)
            transactions = updated_invoice.transactions
            return updated_invoice, transactions
        except Exception as e:
            raise ValueError(f"Ошибка при обработке накладной: {str(e)}")
    
    def close_invoice(self, invoice_id: uuid.UUID) -> Invoice:
        invoice = self.invoice_repo.get_by_id(invoice_id)
        if not invoice:
            raise ValueError(f"Накладная с ID {invoice_id} не найдена")
        if invoice.status != InvoiceStatus.PROCESSED:
            raise ValueError(f"Накладная с ID {invoice_id} не может быть закрыта (текущий статус: {invoice.status.value})")
        updated_invoice = self.invoice_repo.update(invoice_id, {'status': InvoiceStatus.CLOSED})
        return updated_invoice