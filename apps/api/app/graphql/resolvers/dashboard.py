# app/graphql/resolvers/dashboard.py
from ...database.repositories import (
    ClientRepository, SupplierRepository, 
    ContractRepository, InvoiceRepository, 
    DebtMovementRepository, TransactionRepository
)
from ...database.models import (
    Client, Supplier, Contract, 
    ContractStatus, InvoiceStatus, 
    Invoice, Transaction
)
from sqlalchemy import func

def get_dashboard_resolver(obj, info):
    db = info.context["db"]
    clients_count = db.query(func.count(Client.id)).scalar() or 0
    suppliers_count = db.query(func.count(Supplier.id)).scalar() or 0
    active_contracts_count = (
        db.query(func.count(Contract.id))
        .filter(Contract.status == ContractStatus.ACTIVE)
        .scalar() or 0
    )
    debt_repo = DebtMovementRepository(db)
    client_debts_balances = debt_repo.get_balances(dimension="CLIENT_DEBT")
    client_debts_sum = sum(balance["balance"] for balance in client_debts_balances) if client_debts_balances else 0
    supplier_debts_balances = debt_repo.get_balances(dimension="SUPPLIER_DEBT")
    supplier_debts_sum = sum(balance["balance"] for balance in supplier_debts_balances) if supplier_debts_balances else 0
    recent_invoices = db.query(Invoice).order_by(Invoice.date.desc()).limit(5).all()
    for invoice in recent_invoices:
        if invoice.status:
            invoice.status = invoice.status.name if hasattr(invoice.status, 'name') else str(invoice.status)
    
    recent_transactions = db.query(Transaction).order_by(Transaction.date.desc()).limit(5).all()
    for transaction in recent_transactions:
        if hasattr(transaction, 'type') and transaction.type:
            transaction.type = transaction.type.name if hasattr(transaction.type, 'name') else str(transaction.type)
    dashboard_data = {
        "clients_count": clients_count,
        "suppliers_count": suppliers_count,
        "active_contracts_count": active_contracts_count,
        "client_debts_sum": client_debts_sum,
        "supplier_debts_sum": supplier_debts_sum,
        "recent_invoices": recent_invoices,
        "recent_transactions": recent_transactions
    }
    return dashboard_data

def register_dashboard_resolvers(query, mutation, type_defs):
    query.set_field("dashboard", get_dashboard_resolver)