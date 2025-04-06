# app/services/contract_service.py
from datetime import datetime, date
from typing import List, Optional, Dict, Any
import uuid
from sqlalchemy.orm import Session

from ..database.repositories import ContractRepository, ClientRepository
from ..database.models import Contract, ContractStatus

class ContractService:
    def __init__(self, db: Session):
        self.db = db
        self.contract_repo = ContractRepository(db)
        self.client_repo = ClientRepository(db)
    
    def get_all_contracts(self, 
                         skip: int = 0, 
                         limit: int = 100, 
                         client_id: Optional[uuid.UUID] = None,
                         status: Optional[ContractStatus] = None) -> List[Contract]:
        return self.contract_repo.get_all(
            skip=skip, 
            limit=limit, 
            client_id=client_id,
            status=status
        )
    
    def get_contract_by_id(self, contract_id: uuid.UUID) -> Optional[Contract]:
        return self.contract_repo.get_by_id(contract_id)
    
    def get_active_contracts_for_client(self, client_id: uuid.UUID) -> List[Contract]:
        return self.contract_repo.get_active_by_client(client_id)
    
    def create_contract(self, contract_data: Dict[str, Any]) -> Contract:
        client_id = contract_data.get('client_id')
        if not client_id:
            raise ValueError("ID клиента не указан")
        client = self.client_repo.get_by_id(client_id)
        if not client:
            raise ValueError(f"Клиент с ID {client_id} не найден")
        required_fields = ['number', 'date', 'markup_percentage']
        for field in required_fields:
            if field not in contract_data:
                raise ValueError(f"Поле {field} обязательно для заполнения")
        if isinstance(contract_data.get('date'), str):
            try:
                contract_data['date'] = datetime.fromisoformat(contract_data['date']).date()
            except ValueError:
                raise ValueError("Некорректный формат даты")
        if contract_data.get('expiration_date') and isinstance(contract_data['expiration_date'], str):
            try:
                contract_data['expiration_date'] = datetime.fromisoformat(contract_data['expiration_date']).date()
            except ValueError:
                raise ValueError("Некорректный формат даты окончания")
        if 'status' not in contract_data:
            contract_data['status'] = ContractStatus.ACTIVE
        return self.contract_repo.create(contract_data)
    
    def update_contract(self, contract_id: uuid.UUID, contract_data: Dict[str, Any]) -> Optional[Contract]:
        contract = self.contract_repo.get_by_id(contract_id)
        if not contract:
            return None
        if 'client_id' in contract_data:
            client = self.client_repo.get_by_id(contract_data['client_id'])
            if not client:
                raise ValueError(f"Клиент с ID {contract_data['client_id']} не найден")
        if contract_data.get('date') and isinstance(contract_data['date'], str):
            try:
                contract_data['date'] = datetime.fromisoformat(contract_data['date']).date()
            except ValueError:
                raise ValueError("Некорректный формат даты")
        if contract_data.get('expiration_date') and isinstance(contract_data['expiration_date'], str):
            try:
                contract_data['expiration_date'] = datetime.fromisoformat(contract_data['expiration_date']).date()
            except ValueError:
                raise ValueError("Некорректный формат даты окончания")
        return self.contract_repo.update(contract_id, contract_data)
    
    def delete_contract(self, contract_id: uuid.UUID) -> bool:
        return self.contract_repo.delete(contract_id)
    
    def check_contract_validity(self, contract_id: uuid.UUID, check_date: Optional[date] = None) -> bool:
        if check_date is None:
            check_date = date.today()
        
        contract = self.contract_repo.get_by_id(contract_id)
        if not contract:
            return False
        is_valid = (
            contract.status == ContractStatus.ACTIVE and
            (contract.expiration_date is None or contract.expiration_date >= check_date)
        )
        return is_valid
    
    def get_default_contract_for_client(self, client_id: uuid.UUID) -> Optional[Contract]:
        active_contracts = self.contract_repo.get_active_by_client(client_id)
        if not active_contracts:
            return None
        sorted_contracts = sorted(
            active_contracts,
            key=lambda c: c.created_at,
            reverse=True
        )
        return sorted_contracts[0]