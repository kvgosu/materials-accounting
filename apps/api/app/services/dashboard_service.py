# app/services/dashboard_service.py
from datetime import datetime, date, timedelta
from typing import Dict, List, Any
from sqlalchemy.orm import Session

from ..database.models import InvoiceStatus, ContractStatus, DebtDimension
from ..database.repositories import (
    ClientRepository,
    SupplierRepository,
    ContractRepository,
    InvoiceRepository,
    TransactionRepository
)
from .debt_service import DebtService

class DashboardService:
    def __init__(self, db: Session):
        self.db = db
        self.client_repo = ClientRepository(db)
        self.supplier_repo = SupplierRepository(db)
        self.contract_repo = ContractRepository(db)
        self.invoice_repo = InvoiceRepository(db)
        self.transaction_repo = TransactionRepository(db)
        self.debt_service = DebtService(db)
    
    def get_dashboard_data(self) -> Dict[str, Any]:
        clients_count = len(self.client_repo.get_all())
        suppliers_count = len(self.supplier_repo.get_all())
        active_contracts = self.contract_repo.get_all(status=ContractStatus.ACTIVE)
        active_contracts_count = len(active_contracts)
        client_debts_sum = self.debt_service.get_total_client_debts()
        supplier_debts_sum = self.debt_service.get_total_supplier_debts()
        recent_invoices = self.invoice_repo.get_all(limit=5)
        recent_transactions = self.transaction_repo.get_all(limit=5)
        dashboard_data = {
            "clientsCount": clients_count,
            "suppliersCount": suppliers_count,
            "activeContractsCount": active_contracts_count,
            "clientDebtsSum": client_debts_sum,
            "supplierDebtsSum": supplier_debts_sum,
            "recentInvoices": recent_invoices,
            "recentTransactions": recent_transactions
        }
        return dashboard_data
    
    def get_monthly_summary(self, year: int = None, month: int = None) -> Dict[str, Any]:
        today = datetime.now()
        if year is None:
            year = today.year
        if month is None:
            month = today.month
        start_date = date(year, month, 1)
        if month == 12:
            end_date = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            end_date = date(year, month + 1, 1) - timedelta(days=1)
        invoices = self.invoice_repo.get_all(
            date_from=start_date,
            date_to=end_date
        )
        transactions = self.transaction_repo.get_all(
            date_from=start_date,
            date_to=end_date
        )
        total_invoices = len(invoices)
        total_invoice_amount = sum(invoice.total_amount for invoice in invoices)
        total_invoice_markup = sum(invoice.total_with_markup - invoice.total_amount for invoice in invoices)
        monthly_summary = {
            "year": year,
            "month": month,
            "invoicesCount": total_invoices,
            "totalInvoiceAmount": total_invoice_amount,
            "totalInvoiceMarkup": total_invoice_markup,
            "startDate": start_date.isoformat(),
            "endDate": end_date.isoformat()
        }
        return monthly_summary
    
    def get_client_statistics(self, top_n: int = 5) -> List[Dict[str, Any]]:
        clients = self.client_repo.get_all()
        client_stats = []
        for client in clients:
            invoices = self.invoice_repo.get_all(client_id=client.id)
            total_invoices = len(invoices)
            total_amount = sum(invoice.total_with_markup for invoice in invoices if invoice.status != InvoiceStatus.CREATED)
            try:
                debt = self.debt_service.get_client_debt(client.id)
            except ValueError:
                debt = 0.0
            client_stats.append({
                "id": str(client.id),
                "name": client.name,
                "invoicesCount": total_invoices,
                "totalAmount": total_amount,
                "debt": debt
            })
        client_stats.sort(key=lambda x: x["totalAmount"], reverse=True)
        return client_stats[:top_n]
    
    def get_supplier_statistics(self, top_n: int = 5) -> List[Dict[str, Any]]:
        suppliers = self.supplier_repo.get_all()
        supplier_stats = []
        for supplier in suppliers:
            invoices = self.invoice_repo.get_all(supplier_id=supplier.id)
            total_invoices = len(invoices)
            total_amount = sum(invoice.total_amount for invoice in invoices if invoice.status != InvoiceStatus.CREATED)
            try:
                debt = self.debt_service.get_supplier_debt(supplier.id)
            except ValueError:
                debt = 0.0
            supplier_stats.append({
                "id": str(supplier.id),
                "name": supplier.name,
                "invoicesCount": total_invoices,
                "totalAmount": total_amount,
                "debt": debt
            })
        supplier_stats.sort(key=lambda x: x["totalAmount"], reverse=True)
        return supplier_stats[:top_n]