# app/graphql/resolvers/contracts.py
from ...database.repositories import ContractRepository, ClientRepository
from ...database.models import ContractStatus
from datetime import datetime

def get_contracts_resolver(obj, info, **kwargs):
    db = info.context["db"]
    contract_repo = ContractRepository(db)
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    client_id = kwargs.get('client_id', None)  
    status = kwargs.get('status', None)
    if isinstance(status, str):
        status = ContractStatus[status.upper()]
    contracts = contract_repo.get_all(
        skip=skip, 
        limit=limit, 
        client_id=client_id,
        status=status
    )
    for contract in contracts:
        if contract.status:
            contract.status = contract.status.name if hasattr(contract.status, 'name') else str(contract.status)
    return contracts

def get_contract_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    contract_repo = ContractRepository(db)
    contract = contract_repo.get_by_id(id)
    if contract and contract.status:
        contract.status = contract.status.name if hasattr(contract.status, 'name') else str(contract.status)
    return contract

def resolve_contract_client(contract, info):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    return client_repo.get_by_id(contract.client_id)

def resolve_contract_invoices(contract, info):
    db = info.context["db"]
    from ...database.repositories import InvoiceRepository
    invoice_repo = InvoiceRepository(db)
    invoices = invoice_repo.get_all(contract_id=contract.id)
    for invoice in invoices:
        if hasattr(invoice, 'status') and invoice.status:
            if hasattr(invoice.status, 'name'):
                # Явно преобразуем enum в одно из определенных в схеме значений
                invoice.status = invoice.status.name  # Например, "CREATED", "PROCESSED"
    return invoices

def create_contract_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    contract_repo = ContractRepository(db)
    if 'date' in input and isinstance(input['date'], str):
        input['date'] = datetime.fromisoformat(input['date']).date()
    if 'expiration_date' in input and isinstance(input['expiration_date'], str):
        input['expiration_date'] = datetime.fromisoformat(input['expiration_date']).date()
    if 'status' in input and isinstance(input['status'], str):
        input['status'] = ContractStatus[input['status'].upper()]
    contract = contract_repo.create(input)
    if contract.status:
        contract.status = str(contract.status)
    return {"contract": contract}

def update_contract_resolver(obj, info, id, input, **kwargs):
    db = info.context["db"]
    contract_repo = ContractRepository(db)
    if 'date' in input and isinstance(input['date'], str):
        input['date'] = datetime.fromisoformat(input['date']).date()
    if 'expiration_date' in input and isinstance(input['expiration_date'], str):
        input['expiration_date'] = datetime.fromisoformat(input['expiration_date']).date()
    if 'status' in input and isinstance(input['status'], str):
        input['status'] = ContractStatus[input['status'].upper()]
    contract = contract_repo.update(id, input)
    if not contract:
        raise Exception(f"Договор с ID {id} не найден")
    contract.status = contract.status.name if hasattr(contract.status, 'value') else str(contract.status)
    return {"contract": contract}

def delete_contract_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    contract_repo = ContractRepository(db)
    success = contract_repo.delete(id)
    if not success:
        raise Exception(f"Договор с ID {id} не найден")
    return {"success": success}

def register_contracts_resolvers(query, mutation, type_defs):
    query.set_field("contracts", get_contracts_resolver)
    query.set_field("contract", get_contract_resolver)
    contract_type = type_defs["Contract"]
    contract_type.set_field("client", resolve_contract_client)
    contract_type.set_field("invoices", resolve_contract_invoices)
    mutation.set_field("create_contract", create_contract_resolver)
    mutation.set_field("update_contract", update_contract_resolver)
    mutation.set_field("delete_contract", delete_contract_resolver)