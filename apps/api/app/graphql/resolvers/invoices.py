# app/graphql/resolvers/invoices.py
from datetime import datetime
from ...database.repositories import (
    InvoiceRepository, 
    ClientRepository, 
    SupplierRepository,
    ContractRepository,
    MaterialRepository,
    TransactionRepository
)
from ...database.models import (
    InvoiceStatus, 
    TransactionType,
    DebtDirection,
    DebtDimension
)

def get_invoices_resolver(obj, info, **kwargs):
    db = info.context["db"]
    invoice_repo = InvoiceRepository(db)
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    client_id = kwargs.get('client_id', None)
    supplier_id = kwargs.get('supplier_id', None)
    contract_id = kwargs.get('contract_id', None)
    status = kwargs.get('status', None)
    date_from = kwargs.get('date_from', None)
    date_to = kwargs.get('date_to', None)
    if isinstance(status, str):
        try:
            status = InvoiceStatus[status]
        except KeyError:
            pass
    if date_from:
        date_from = datetime.fromisoformat(date_from)
    if date_to:
        date_to = datetime.fromisoformat(date_to)
    invoices = invoice_repo.get_all(
        skip=skip, 
        limit=limit, 
        client_id=client_id,
        supplier_id=supplier_id,
        contract_id=contract_id,
        status=status,
        date_from=date_from,
        date_to=date_to
    )
    for invoice in invoices:
        if hasattr(invoice, 'status'):
            invoice.status = str(invoice.status)
    
    return invoices

def get_invoice_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    invoice_repo = InvoiceRepository(db)
    invoice = invoice_repo.get_by_id(id)
    if invoice and hasattr(invoice, 'status'):
        invoice.status = str(invoice.status)
    
    return invoice

def resolve_invoice_client(invoice, info):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    return client_repo.get_by_id(invoice.client_id)

def resolve_invoice_supplier(invoice, info):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    return supplier_repo.get_by_id(invoice.supplier_id)

def resolve_invoice_contract(invoice, info):
    db = info.context["db"]
    contract_repo = ContractRepository(db)
    
    contract = contract_repo.get_by_id(invoice.contract_id)
    
    # Преобразуем enum в строку для контракта
    if contract and hasattr(contract, 'status'):
        contract.status = str(contract.status)
    
    return contract

def resolve_invoice_items(invoice, info):
    return invoice.items

def resolve_invoice_transactions(invoice, info):
    db = info.context["db"]
    transaction_repo = TransactionRepository(db)
    transactions = transaction_repo.get_all(invoice_id=invoice.id)
    
    # Преобразуем enum в строки для транзакций
    for transaction in transactions:
        if hasattr(transaction, 'type'):
            transaction.type = str(transaction.type)
    
    return transactions

def resolve_invoice_item_invoice(invoice_item, info):
    invoice = invoice_item.invoice
    
    # Преобразуем enum в строку
    if invoice and hasattr(invoice, 'status'):
        invoice.status = str(invoice.status)
    
    return invoice

def resolve_invoice_item_material(invoice_item, info):
    db = info.context["db"]
    material_repo = MaterialRepository(db) 
    return material_repo.get_by_id(invoice_item.material_id)

def create_invoice_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    invoice_repo = InvoiceRepository(db)
    invoice_data = {
        "number": input.get("number"),
        "date": datetime.fromisoformat(input.get("date")),
        "client_id": input.get("client_id"),
        "supplier_id": input.get("supplier_id"),
        "contract_id": input.get("contract_id"),
        "status": InvoiceStatus.CREATED  
    }
    items_data = []
    for item in input.get("items", []):
        item_data = {
            "material_id": item.get("material_id"),
            "quantity": item.get("quantity"),
            "price": item.get("price")
        }
        items_data.append(item_data)
    
    invoice = invoice_repo.create(invoice_data, items_data)
    
    # Преобразуем enum в строку
    if invoice and hasattr(invoice, 'status'):
        invoice.status = str(invoice.status)
    
    return {"invoice": invoice}

def update_invoice_resolver(obj, info, id, input, **kwargs):
    db = info.context["db"]
    invoice_repo = InvoiceRepository(db)
    invoice_data = {}
    if "number" in input:
        invoice_data["number"] = input["number"]
    if "date" in input:
        invoice_data["date"] = datetime.fromisoformat(input["date"])
    if "client_id" in input:
        invoice_data["client_id"] = input["client_id"]
    if "supplier_id" in input:
        invoice_data["supplier_id"] = input["supplier_id"]
    if "contract_id" in input:
        invoice_data["contract_id"] = input["contract_id"]
    if "status" in input:
        try:
            invoice_data["status"] = InvoiceStatus[input["status"]]
        except (KeyError, TypeError):
            raise Exception(f"Неверный статус накладной: {input['status']}")
    items_data = None
    if "items" in input:
        items_data = []
        for item in input["items"]:
            item_data = {}
            if "id" in item:
                item_data["id"] = item["id"]
            if "material_id" in item:
                item_data["material_id"] = item["material_id"]
            if "quantity" in item:
                item_data["quantity"] = item["quantity"]
            if "price" in item:
                item_data["price"] = item["price"]
            items_data.append(item_data)
    
    invoice = invoice_repo.update(id, invoice_data, items_data) 
    
    if not invoice:
        raise Exception(f"Накладная с ID {id} не найдена")
    
    # Преобразуем enum в строку
    if invoice and hasattr(invoice, 'status'):
        invoice.status = str(invoice.status)
    
    return {"invoice": invoice}

def delete_invoice_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    invoice_repo = InvoiceRepository(db)
    success = invoice_repo.delete(id)
    if not success:
        raise Exception(f"Накладная с ID {id} не найдена")
    return {"success": success}

def process_invoice_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    invoice_repo = InvoiceRepository(db)
    result = invoice_repo.process_invoice(id)
    if not result:
        raise Exception(f"Не удалось обработать накладную с ID {id}")
    
    invoice = invoice_repo.get_by_id(id)
    if not invoice:
        raise Exception(f"Накладная с ID {id} не найдена")
    
    # Преобразуем enum в строку
    if invoice and hasattr(invoice, 'status'):
        invoice.status = str(invoice.status)
    
    transaction_repo = TransactionRepository(db)
    transactions = transaction_repo.get_all(invoice_id=id)
    
    # Преобразуем enum в строки для транзакций
    for transaction in transactions:
        if hasattr(transaction, 'type'):
            transaction.type = str(transaction.type)
    
    return {"invoice": invoice, "transactions": transactions}

def close_invoice_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    invoice_repo = InvoiceRepository(db)
    invoice = invoice_repo.get_by_id(id)
    if not invoice:
        raise Exception(f"Накладная с ID {id} не найдена")
    
    invoice_data = {"status": InvoiceStatus.CLOSED}
    updated_invoice = invoice_repo.update(id, invoice_data)
    
    # Преобразуем enum в строку
    if updated_invoice and hasattr(updated_invoice, 'status'):
        updated_invoice.status = str(updated_invoice.status)
    
    return {"invoice": updated_invoice}

def register_invoices_resolvers(query, mutation, type_defs):
    query.set_field("invoices", get_invoices_resolver)
    query.set_field("invoice", get_invoice_resolver)
    invoice_type = type_defs["Invoice"]
    invoice_type.set_field("client", resolve_invoice_client)
    invoice_type.set_field("supplier", resolve_invoice_supplier)
    invoice_type.set_field("contract", resolve_invoice_contract)
    invoice_type.set_field("items", resolve_invoice_items)
    invoice_type.set_field("transactions", resolve_invoice_transactions)
    invoice_item_type = type_defs["InvoiceItem"]
    invoice_item_type.set_field("invoice", resolve_invoice_item_invoice)
    invoice_item_type.set_field("material", resolve_invoice_item_material)
    mutation.set_field("create_invoice", create_invoice_resolver)
    mutation.set_field("update_invoice", update_invoice_resolver)
    mutation.set_field("delete_invoice", delete_invoice_resolver)
    mutation.set_field("process_invoice", process_invoice_resolver)
    mutation.set_field("close_invoice", close_invoice_resolver)