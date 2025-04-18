# app/graphql/resolvers/debt_movements.py
from datetime import datetime
import uuid
from ...database.repositories import (
    DebtMovementRepository, ClientRepository,
    SupplierRepository, InvoiceRepository, TransactionRepository
)
from ...database.models import DebtDimension, DebtDirection

def parse_datetime(date_string):
    if not date_string:
        return None
    try:
        return datetime.fromisoformat(date_string)
    except ValueError:
        try:
            return datetime.strptime(date_string, "%Y-%m-%d")
        except ValueError:
            return None

def get_debt_movements_resolver(obj, info, **kwargs):
    db = info.context["db"]
    debt_repo = DebtMovementRepository(db)
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    client_id = kwargs.get('client_id', None)
    supplier_id = kwargs.get('supplier_id', None)
    dimension = kwargs.get('dimension', None)
    period_from = kwargs.get('period_from', None)
    period_to = kwargs.get('period_to', None)
    period_from_obj = parse_datetime(period_from)
    period_to_obj = parse_datetime(period_to)
    dimension_obj = None
    if dimension:
        try:
            dimension_obj = DebtDimension[dimension]
        except (KeyError, TypeError):
            pass        
    movements = debt_repo.get_all(
        skip=skip, 
        limit=limit, 
        client_id=client_id,
        supplier_id=supplier_id,
        dimension=dimension_obj,
        period_from=period_from_obj,
        period_to=period_to_obj
    )
    for movement in movements:
        if hasattr(movement, 'dimension') and movement.dimension:
            movement.dimension = movement.dimension.name if hasattr(movement.dimension, 'name') else str(movement.dimension)
        if hasattr(movement, 'direction') and movement.direction:
            movement.direction = movement.direction.name if hasattr(movement.direction, 'name') else str(movement.direction)        
    return movements

def parse_datetime(date_string):
    if not date_string:
        return None
    
    # Если дата содержит часть времени (ISO формат с T), отсекаем её
    if 'T' in date_string:
        date_string = date_string.split('T')[0]
    
    # Пробуем формат YYYY-MM-DD
    try:
        return datetime.strptime(date_string, "%Y-%m-%d")
    except ValueError:
        pass
    
    # Пробуем ISO формат как запасной вариант
    try:
        return datetime.fromisoformat(date_string)
    except ValueError:
        return None

def get_debt_balances_resolver(obj, info, **kwargs):
    db = info.context["db"]
    debt_repo = DebtMovementRepository(db)
    client_id = kwargs.get('client_id', None)
    supplier_id = kwargs.get('supplier_id', None)
    dimension = kwargs.get('dimension', None)
    as_of_date = kwargs.get('as_of_date', None)
    as_of_date_obj = parse_datetime(as_of_date) if as_of_date else None
    dimension_obj = None
    if dimension:
        try:
            dimension_obj = DebtDimension[dimension]
        except (KeyError, TypeError):
            pass
    balances = debt_repo.get_balances(
        client_id=client_id,
        supplier_id=supplier_id,
        dimension=dimension_obj,
        as_of_date=as_of_date_obj
    )
    result_balances = []
    for balance in balances:
        if 'dimension' in balance and balance['dimension']:
            balance['dimension'] = balance['dimension'].name if hasattr(balance['dimension'], 'name') else str(balance['dimension'])
        if 'as_of_date' in balance and balance['as_of_date'] and not isinstance(balance['as_of_date'], str):
            balance['as_of_date'] = balance['as_of_date'].isoformat()
        if 'balance' in balance and balance['balance'] is None:
            balance['balance'] = 0.0
        if 'client_id' in balance and balance['client_id']:
            balance['id'] = f"client_{balance['client_id']}_{balance['dimension']}_{as_of_date}"
        elif 'supplier_id' in balance and balance['supplier_id']:
            balance['id'] = f"supplier_{balance['supplier_id']}_{balance['dimension']}_{as_of_date}"
        else:
            hash_input = f"{balance.get('dimension', '')}-{as_of_date}"
            balance['id'] = f"balance_{hash(hash_input) % 10000:04d}"
        if balance.get('balance', 0) != 0 or (client_id or supplier_id):
            result_balances.append(balance)
    return result_balances

def get_debt_turnovers_resolver(obj, info, **kwargs):
    db = info.context["db"]
    debt_repo = DebtMovementRepository(db)
    client_id = kwargs.get('client_id', None)
    supplier_id = kwargs.get('supplier_id', None)
    dimension = kwargs.get('dimension', None)
    start_date = kwargs.get('start_date')
    end_date = kwargs.get('end_date')
    if not start_date or not end_date:
        raise Exception("start_date и end_date являются обязательными параметрами")
    start_date_obj = parse_datetime(start_date)
    end_date_obj = parse_datetime(end_date)
    if not start_date_obj or not end_date_obj:
        raise Exception("Неверный формат даты")
    dimension_obj = None
    if dimension:
        try:
            dimension_obj = DebtDimension[dimension]
        except (KeyError, TypeError):
            pass
    turnovers = debt_repo.get_turnovers(
        client_id=client_id,
        supplier_id=supplier_id,
        dimension=dimension_obj,
        start_date=start_date_obj,
        end_date=end_date_obj
    )
    result_turnovers = []
    for turnover in turnovers:
        if 'dimension' in turnover and turnover['dimension']:
            turnover['dimension'] = turnover['dimension'].name if hasattr(turnover['dimension'], 'name') else str(turnover['dimension'])
        if 'start_date' in turnover and turnover['start_date'] and not isinstance(turnover['start_date'], str):
            turnover['start_date'] = turnover['start_date'].isoformat()
        if 'end_date' in turnover and turnover['end_date'] and not isinstance(turnover['end_date'], str):
            turnover['end_date'] = turnover['end_date'].isoformat()
        if 'debit' in turnover and turnover['debit'] is None:
            turnover['debit'] = 0.0
        if 'credit' in turnover and turnover['credit'] is None:
            turnover['credit'] = 0.0
        if 'balance' not in turnover:
            turnover['balance'] = turnover.get('debit', 0) - turnover.get('credit', 0)
        elif turnover['balance'] is None:
            turnover['balance'] = turnover.get('debit', 0) - turnover.get('credit', 0)
        if 'client_id' in turnover and turnover['client_id']:
            turnover['id'] = f"turnover_client_{turnover['client_id']}_{turnover['dimension']}_{start_date}_{end_date}"
        elif 'supplier_id' in turnover and turnover['supplier_id']:
            turnover['id'] = f"turnover_supplier_{turnover['supplier_id']}_{turnover['dimension']}_{start_date}_{end_date}"
        else:
            hash_input = f"{turnover.get('dimension', '')}-{start_date}-{end_date}"
            turnover['id'] = f"turnover_{hash(hash_input) % 10000:04d}"
        has_movement = turnover.get('debit', 0) != 0 or turnover.get('credit', 0) != 0
        if has_movement or (client_id or supplier_id):
            result_turnovers.append(turnover)
    return result_turnovers

def resolve_debt_movement_client(debt_movement, info):
    if not debt_movement.client_id:
        return None
    db = info.context["db"]
    client_repo = ClientRepository(db)
    client = client_repo.get_by_id(debt_movement.client_id)
    return client

def resolve_debt_movement_supplier(debt_movement, info):
    if not debt_movement.supplier_id:
        return None
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    supplier = supplier_repo.get_by_id(debt_movement.supplier_id)
    return supplier

def resolve_debt_movement_invoice(debt_movement, info):
    if not debt_movement.invoice_id:
        return None
    db = info.context["db"]
    invoice_repo = InvoiceRepository(db)
    invoice = invoice_repo.get_by_id(debt_movement.invoice_id)
    if invoice and hasattr(invoice, 'status') and invoice.status:
        invoice.status = invoice.status.name if hasattr(invoice.status, 'name') else str(invoice.status)
    return invoice

def resolve_debt_movement_transaction(debt_movement, info):
    if not debt_movement.transaction_id:
        return None
    db = info.context["db"]
    transaction_repo = TransactionRepository(db)
    transaction = transaction_repo.get_by_id(debt_movement.transaction_id)
    if transaction and hasattr(transaction, 'type') and transaction.type:
        transaction.type = transaction.type.name if hasattr(transaction.type, 'name') else str(transaction.type)
    return transaction

def resolve_client_debt_movements(client, info):
    db = info.context["db"]
    debt_repo = DebtMovementRepository(db)
    movements = debt_repo.get_all(client_id=client.id)
    for movement in movements:
        if hasattr(movement, 'dimension') and movement.dimension:
            movement.dimension = movement.dimension.name if hasattr(movement.dimension, 'name') else str(movement.dimension)
        if hasattr(movement, 'direction') and movement.direction:
            movement.direction = movement.direction.name if hasattr(movement.direction, 'name') else str(movement.direction)
    return movements

def resolve_supplier_debt_movements(supplier, info):
    db = info.context["db"]
    debt_repo = DebtMovementRepository(db)
    movements = debt_repo.get_all(supplier_id=supplier.id)
    for movement in movements:
        if hasattr(movement, 'dimension') and movement.dimension:
            movement.dimension = movement.dimension.name if hasattr(movement.dimension, 'name') else str(movement.dimension)
        if hasattr(movement, 'direction') and movement.direction:
            movement.direction = movement.direction.name if hasattr(movement.direction, 'name') else str(movement.direction)
    return movements

def resolve_invoice_debt_movements(invoice, info):
    db = info.context["db"]
    debt_repo = DebtMovementRepository(db)
    movements = debt_repo.get_all(invoice_id=invoice.id)
    for movement in movements:
        if hasattr(movement, 'dimension') and movement.dimension:
            movement.dimension = movement.dimension.name if hasattr(movement.dimension, 'name') else str(movement.dimension)
        if hasattr(movement, 'direction') and movement.direction:
            movement.direction = movement.direction.name if hasattr(movement.direction, 'name') else str(movement.direction)
    return movements

def resolve_transaction_debt_movements(transaction, info):
    db = info.context["db"]
    debt_repo = DebtMovementRepository(db)
    movements = debt_repo.get_all(transaction_id=transaction.id)
    for movement in movements:
        if hasattr(movement, 'dimension') and movement.dimension:
            movement.dimension = movement.dimension.name if hasattr(movement.dimension, 'name') else str(movement.dimension)
        if hasattr(movement, 'direction') and movement.direction:
            movement.direction = movement.direction.name if hasattr(movement.direction, 'name') else str(movement.direction)
    return movements

def resolve_debt_balance_client(debt_balance, info):
    if not debt_balance.get('client_id'):
        return None
    db = info.context["db"]
    client_repo = ClientRepository(db)
    client = client_repo.get_by_id(debt_balance['client_id'])
    return client

def resolve_debt_balance_supplier(debt_balance, info):
    if not debt_balance.get('supplier_id'):
        return None   
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    supplier = supplier_repo.get_by_id(debt_balance['supplier_id'])
    return supplier

def resolve_debt_turnover_client(debt_turnover, info):
    if not debt_turnover.get('client_id'):
        return None  
    db = info.context["db"]
    client_repo = ClientRepository(db)
    client = client_repo.get_by_id(debt_turnover['client_id'])
    return client

def resolve_debt_turnover_supplier(debt_turnover, info):
    if not debt_turnover.get('supplier_id'):
        return None    
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    supplier = supplier_repo.get_by_id(debt_turnover['supplier_id']) 
    return supplier

def register_debt_movements_resolvers(query, mutation, type_defs):
    query.set_field("debt_movements", get_debt_movements_resolver)
    query.set_field("debt_balances", get_debt_balances_resolver)
    query.set_field("debt_turnovers", get_debt_turnovers_resolver)
    debt_movement_type = type_defs["DebtMovement"]
    debt_movement_type.set_field("client", resolve_debt_movement_client)
    debt_movement_type.set_field("supplier", resolve_debt_movement_supplier)
    debt_movement_type.set_field("invoice", resolve_debt_movement_invoice)
    debt_movement_type.set_field("transaction", resolve_debt_movement_transaction)
    debt_balance_type = type_defs["DebtBalance"]
    debt_balance_type.set_field("client", resolve_debt_balance_client)
    debt_balance_type.set_field("supplier", resolve_debt_balance_supplier)
    debt_turnover_type = type_defs["DebtTurnover"]
    debt_turnover_type.set_field("client", resolve_debt_turnover_client)
    debt_turnover_type.set_field("supplier", resolve_debt_turnover_supplier)
    client_type = type_defs["Client"]
    client_type.set_field("debt_movements", resolve_client_debt_movements)
    supplier_type = type_defs["Supplier"]
    supplier_type.set_field("debt_movements", resolve_supplier_debt_movements)
    invoice_type = type_defs["Invoice"]
    invoice_type.set_field("debt_movements", resolve_invoice_debt_movements)
    transaction_type = type_defs["Transaction"]
    transaction_type.set_field("debt_movements", resolve_transaction_debt_movements)