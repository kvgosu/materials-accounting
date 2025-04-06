# app/services/debt_service.py
from datetime import datetime, date
from typing import List, Optional, Dict, Any
import uuid
from sqlalchemy.orm import Session

from ..database.repositories import (
    DebtMovementRepository,
    ClientRepository,
    SupplierRepository
)
from ..database.models import DebtDimension

class DebtService:
    def __init__(self, db: Session):
        self.db = db
        self.debt_repo = DebtMovementRepository(db)
        self.client_repo = ClientRepository(db)
        self.supplier_repo = SupplierRepository(db)
    
    def get_debt_balances(self,
                         client_id: Optional[uuid.UUID] = None,
                         supplier_id: Optional[uuid.UUID] = None,
                         dimension: Optional[DebtDimension] = None,
                         as_of_date: Optional[datetime] = None) -> List[Dict[str, Any]]:
        return self.debt_repo.get_balances(
            client_id=client_id,
            supplier_id=supplier_id,
            dimension=dimension,
            as_of_date=as_of_date
        )
    
    def get_debt_turnovers(self,
                          client_id: Optional[uuid.UUID] = None,
                          supplier_id: Optional[uuid.UUID] = None,
                          dimension: Optional[DebtDimension] = None,
                          start_date: datetime = None,
                          end_date: datetime = None) -> List[Dict[str, Any]]:
        if start_date is None:
            today = datetime.now()
            start_date = datetime(today.year, today.month, 1)
        
        if end_date is None:
            end_date = datetime.now()
        return self.debt_repo.get_turnovers(
            client_id=client_id,
            supplier_id=supplier_id,
            dimension=dimension,
            start_date=start_date,
            end_date=end_date
        )
    
    def get_client_debt(self, client_id: uuid.UUID) -> float:
        client = self.client_repo.get_by_id(client_id)
        if not client:
            raise ValueError(f"Клиент с ID {client_id} не найден")
        balances = self.debt_repo.get_balances(
            client_id=client_id,
            dimension=DebtDimension.CLIENT_DEBT
        )
        if not balances:
            return 0.0
        return balances[0]['balance']
    
    def get_supplier_debt(self, supplier_id: uuid.UUID) -> float:
        supplier = self.supplier_repo.get_by_id(supplier_id)
        if not supplier:
            raise ValueError(f"Поставщик с ID {supplier_id} не найден")
        balances = self.debt_repo.get_balances(
            supplier_id=supplier_id,
            dimension=DebtDimension.SUPPLIER_DEBT
        )
        if not balances:
            return 0.0
        return balances[0]['balance']
    
    def get_total_client_debts(self) -> float:
        balances = self.debt_repo.get_balances(
            dimension=DebtDimension.CLIENT_DEBT
        )
        if not balances:
            return 0.0
        total_debt = sum(balance['balance'] for balance in balances)
        return total_debt
    
    def get_total_supplier_debts(self) -> float:
        balances = self.debt_repo.get_balances(
            dimension=DebtDimension.SUPPLIER_DEBT
        )
        if not balances:
            return 0.0
        total_debt = sum(balance['balance'] for balance in balances)
        return total_debt
    
    def get_debt_report(self, 
                       client_id: Optional[uuid.UUID] = None,
                       supplier_id: Optional[uuid.UUID] = None,
                       dimension: Optional[DebtDimension] = None,
                       start_date: Optional[datetime] = None,
                       end_date: Optional[datetime] = None) -> Dict[str, Any]:
        if start_date is None:
            today = datetime.now()
            start_date = datetime(today.year, today.month, 1)
        if end_date is None:
            end_date = datetime.now()
        beginning_balances = self.debt_repo.get_balances(
            client_id=client_id,
            supplier_id=supplier_id,
            dimension=dimension,
            as_of_date=start_date
        )
        ending_balances = self.debt_repo.get_balances(
            client_id=client_id,
            supplier_id=supplier_id,
            dimension=dimension,
            as_of_date=end_date
        )
        turnovers = self.debt_repo.get_turnovers(
            client_id=client_id,
            supplier_id=supplier_id,
            dimension=dimension,
            start_date=start_date,
            end_date=end_date
        )
        report = {
            "startDate": start_date.isoformat(),
            "endDate": end_date.isoformat(),
            "beginningBalances": beginning_balances,
            "endingBalances": ending_balances,
            "turnovers": turnovers
        }
        return report