# app/graphql/resolvers/transactions.py
from datetime import datetime, date
from typing import List, Optional, Dict, Any, Tuple
import uuid
from ...database.repositories import (
    TransactionRepository,
    InvoiceRepository,
    ClientRepository,
    SupplierRepository,
    DebtMovementRepository
)
from ...database.models import (
    DebtDimension, DebtDirection, TransactionType
)

def get_transactions_resolver(obj, info, **kwargs):
    db = info.context["db"]
    transaction_repo = TransactionRepository(db)
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    client_id = kwargs.get('client_id', None)
    supplier_id = kwargs.get('supplier_id', None)
    invoice_id = kwargs.get('invoice_id', None)
    type = kwargs.get('type', None)
    date_from = kwargs.get('date_from', None)
    date_to = kwargs.get('date_to', None)
    if date_from:
        date_from = datetime.fromisoformat(date_from)
    if date_to:
        date_to = datetime.fromisoformat(date_to)
    transactions = transaction_repo.get_all(
        skip=skip, 
        limit=limit, 
        client_id=client_id,
        supplier_id=supplier_id,
        invoice_id=invoice_id,
        type=type,
        date_from=date_from,
        date_to=date_to
    )
    for transaction in transactions:
        if hasattr(transaction, 'type') and transaction.type:
            transaction.type = transaction.type.name if hasattr(transaction.type, 'name') else str(transaction.type)
    return transactions

def get_transaction_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    transaction_repo = TransactionRepository(db)
    transaction = transaction_repo.get_by_id(id)
    if transaction and hasattr(transaction, 'type') and transaction.type:
        transaction.type = transaction.type.name if hasattr(transaction.type, 'name') else str(transaction.type)
    return transaction

def get_debt_balances_resolver(obj, info, **kwargs):
    db = info.context["db"]
    debt_repo = DebtMovementRepository(db)
    client_id = kwargs.get('client_id', None)
    supplier_id = kwargs.get('supplier_id', None)
    dimension = kwargs.get('dimension', None)
    as_of_date = kwargs.get('as_of_date', None)
    if as_of_date:
        as_of_date = datetime.fromisoformat(as_of_date)
    balances = debt_repo.get_balances(
        client_id=client_id,
        supplier_id=supplier_id,
        dimension=dimension,
        as_of_date=as_of_date
    )
    for balance in balances:
        if 'dimension' in balance and balance['dimension'] and hasattr(balance['dimension'], 'name'):
            balance['dimension'] = balance['dimension'].name
    
    return balances

def get_debt_turnovers_resolver(obj, info, **kwargs):
    db = info.context["db"]
    debt_repo = DebtMovementRepository(db)
    client_id = kwargs.get('client_id', None)
    supplier_id = kwargs.get('supplier_id', None)
    dimension = kwargs.get('dimension', None)
    start_date = kwargs.get('start_date')
    end_date = kwargs.get('end_date')
    start_date = datetime.fromisoformat(start_date)
    end_date = datetime.fromisoformat(end_date)
    turnovers = debt_repo.get_turnovers(
        client_id=client_id,
        supplier_id=supplier_id,
        dimension=dimension,
        start_date=start_date,
        end_date=end_date
    )
    for turnover in turnovers:
        if 'dimension' in turnover and turnover['dimension'] and hasattr(turnover['dimension'], 'name'):
            turnover['dimension'] = turnover['dimension'].name
        if 'direction' in turnover and turnover['direction'] and hasattr(turnover['direction'], 'name'):
            turnover['direction'] = turnover['direction'].name
    return turnovers

def resolve_transaction_invoice(transaction, info):
    if not transaction.invoice_id:
        return None  
    db = info.context["db"]
    invoice_repo = InvoiceRepository(db)
    invoice = invoice_repo.get_by_id(transaction.invoice_id)
    if invoice and invoice.status:
        invoice.status = invoice.status.name if hasattr(invoice.status, 'name') else str(invoice.status)
    return invoice

def resolve_transaction_client(transaction, info):
    if not transaction.client_id:
        return None
    db = info.context["db"]
    client_repo = ClientRepository(db)
    return client_repo.get_by_id(transaction.client_id)

def resolve_transaction_supplier(transaction, info):
    if not transaction.supplier_id:
        return None  
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    return supplier_repo.get_by_id(transaction.supplier_id)

def resolve_debt_balance_client(debt_balance, info):
    if not debt_balance.get('client_id'):
        return None   
    db = info.context["db"]
    client_repo = ClientRepository(db)
    return client_repo.get_by_id(debt_balance['client_id'])

def resolve_debt_balance_supplier(debt_balance, info):
    if not debt_balance.get('supplier_id'):
        return None  
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    return supplier_repo.get_by_id(debt_balance['supplier_id'])

def resolve_debt_turnover_client(debt_turnover, info):
    if not debt_turnover.get('client_id'):
        return None   
    db = info.context["db"]
    client_repo = ClientRepository(db)
    return client_repo.get_by_id(debt_turnover['client_id'])

def resolve_debt_turnover_supplier(debt_turnover, info):
    if not debt_turnover.get('supplier_id'):
        return None  
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    return supplier_repo.get_by_id(debt_turnover['supplier_id'])

def register_client_payment_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    transaction_repo = TransactionRepository(db)
    client_id = input.get('client_id')
    amount = input.get('amount')
    date_str = input.get('date')
    description = input.get('description', 'Оплата от клиента')
    if isinstance(date_str, str):
        date_obj = datetime.fromisoformat(date_str).date()
    else:
        date_obj = date_str
    transaction = transaction_repo.register_client_payment(
        client_id=client_id,
        amount=amount,
        date_obj=date_obj,
        description=description
    )
    if transaction and hasattr(transaction, 'type') and transaction.type:
        transaction.type = transaction.type.name if hasattr(transaction.type, 'name') else str(transaction.type)
    return {"transaction": transaction}

def register_supplier_payment_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    transaction_repo = TransactionRepository(db)
    supplier_id = input.get('supplier_id')
    amount = input.get('amount')
    date_str = input.get('date')
    description = input.get('description', 'Оплата поставщику')
    date_obj = datetime.fromisoformat(date_str)
    transaction = transaction_repo.register_supplier_payment(
        supplier_id=supplier_id,
        amount=amount,
        date_obj=date_obj,
        description=description
    )
    if transaction and hasattr(transaction, 'type') and transaction.type:
        transaction.type = transaction.type.name if hasattr(transaction.type, 'name') else str(transaction.type)
    return {"transaction": transaction}

def register_transactions_resolvers(query, mutation, type_defs):
    query.set_field("transactions", get_transactions_resolver)
    query.set_field("transaction", get_transaction_resolver)
    query.set_field("debt_balances", get_debt_balances_resolver)
    query.set_field("debt_turnovers", get_debt_turnovers_resolver)
    transaction_type = type_defs["Transaction"]
    transaction_type.set_field("invoice", resolve_transaction_invoice)
    transaction_type.set_field("client", resolve_transaction_client)
    transaction_type.set_field("supplier", resolve_transaction_supplier)
    debt_balance_type = type_defs["DebtBalance"]
    debt_balance_type.set_field("client", resolve_debt_balance_client)
    debt_balance_type.set_field("supplier", resolve_debt_balance_supplier)
    debt_turnover_type = type_defs["DebtTurnover"]
    debt_turnover_type.set_field("client", resolve_debt_turnover_client)
    debt_turnover_type.set_field("supplier", resolve_debt_turnover_supplier)
    mutation.set_field("register_client_payment", register_client_payment_resolver)
    mutation.set_field("register_supplier_payment", register_supplier_payment_resolver)