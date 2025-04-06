# tests/functional/test_performance.py
"""
Тесты производительности API
"""
import time
import uuid
import random
from datetime import date, timedelta
import pytest

from app.database.models import (
    Client, Supplier, Contract, Material, Invoice, InvoiceItem,
    ContractStatus, InvoiceStatus
)
from app.database.repositories import (
    ClientRepository,
    SupplierRepository,
    MaterialRepository,
    ContractRepository,
    InvoiceRepository,
    TransactionRepository,
    DebtMovementRepository
)

@pytest.fixture
def generate_test_data(db_session):
    clients = []
    for i in range(50):
        client = Client(
            name=f"Performance Client {i}",
            contact_person=f"Contact {i}",
            phone=f"+7 (999) {i:03d}-{i:02d}-{i:02d}",
            email=f"client{i}@example.com",
            address=f"Address {i}"
        )
        clients.append(client)
    suppliers = []
    for i in range(20):
        supplier = Supplier(
            name=f"Performance Supplier {i}",
            contact_person=f"Supplier Contact {i}",
            phone=f"+7 (888) {i:03d}-{i:02d}-{i:02d}",
            email=f"supplier{i}@example.com",
            address=f"Supplier Address {i}"
        )
        suppliers.append(supplier)
    materials = []
    for i in range(100):
        material = Material(
            name=f"Material {i}",
            unit=random.choice(["шт", "кг", "м", "л", "м²", "м³"]),
            description=f"Description for Material {i}"
        )
        materials.append(material)
    db_session.add_all(clients)
    db_session.add_all(suppliers)
    db_session.add_all(materials)
    db_session.commit()
    for obj in clients + suppliers + materials:
        db_session.refresh(obj)
    contracts = []
    today = date.today()
    for i, client in enumerate(clients):
        for j in range(random.randint(1, 3)):
            contract = Contract(
                client_id=client.id,
                number=f"CONTRACT-{i}-{j}",
                date=today - timedelta(days=random.randint(10, 365)),
                markup_percentage=random.uniform(5.0, 25.0),
                status=ContractStatus.ACTIVE,
                expiration_date=today + timedelta(days=random.randint(30, 365))
            )
            contracts.append(contract)
    db_session.add_all(contracts)
    db_session.commit()
    for contract in contracts:
        db_session.refresh(contract)
    return {
        "clients": clients,
        "suppliers": suppliers,
        "materials": materials,
        "contracts": contracts
    }

def time_execution(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print(f"Function '{func.__name__}' executed in {execution_time:.4f} seconds")
        return result, execution_time
    return wrapper

def test_client_repository_performance(db_session, generate_test_data):
    repo = ClientRepository(db_session)
    @time_execution
    def get_all_clients():
        return repo.get_all()
    clients, time_get_all = get_all_clients()
    assert len(clients) >= 50  
    assert time_get_all < 1.0  
    @time_execution
    def search_clients(query):
        return repo.get_all(search=query)
    filtered_clients, time_search = search_clients("Performance")
    assert len(filtered_clients) > 0
    assert time_search < 1.0
    sample_client = clients[0]
    @time_execution
    def get_client_by_id(client_id):
        return repo.get_by_id(client_id)
    client, time_get_by_id = get_client_by_id(sample_client.id)
    assert client is not None
    assert client.id == sample_client.id
    assert time_get_by_id < 0.5  

def test_invoice_creation_performance(db_session, generate_test_data):
    repo = InvoiceRepository(db_session)
    client = random.choice(generate_test_data["clients"])
    supplier = random.choice(generate_test_data["suppliers"])
    contract = random.choice([c for c in generate_test_data["contracts"] if c.client_id == client.id])
    materials = random.sample(generate_test_data["materials"], 10)  
    today = date.today()
    invoice_data = {
        "number": f"PERF-INV-{uuid.uuid4().hex[:8]}",
        "date": today,
        "client_id": client.id,
        "supplier_id": supplier.id,
        "contract_id": contract.id,
        "status": InvoiceStatus.CREATED
    }
    items_data = []
    for material in materials:
        quantity = random.uniform(1.0, 100.0)
        price = random.uniform(100.0, 10000.0)
        amount = quantity * price
        amount_with_markup = amount * (1 + contract.markup_percentage / 100)
        items_data.append({
            "material_id": material.id,
            "quantity": quantity,
            "price": price,
            "amount": amount,
            "amount_with_markup": amount_with_markup
        })
    @time_execution
    def create_invoice():
        return repo.create(invoice_data, items_data)
    invoice, time_create = create_invoice()
    assert invoice is not None
    assert invoice.id is not None
    assert len(invoice.items) == 10
    assert time_create < 2.0 
    @time_execution
    def process_invoice():
        return repo.process_invoice(invoice.id)
    result, time_process = process_invoice()
    assert result is True
    assert time_process < 3.0  

def test_debt_balances_performance(db_session, generate_test_data):
    invoice_repo = InvoiceRepository(db_session)
    transaction_repo = TransactionRepository(db_session)
    debt_repo = DebtMovementRepository(db_session)
    for _ in range(5):
        client = random.choice(generate_test_data["clients"])
        supplier = random.choice(generate_test_data["suppliers"])
        contract = random.choice([c for c in generate_test_data["contracts"] if c.client_id == client.id])
        materials = random.sample(generate_test_data["materials"], 5)
        invoice_data = {
            "number": f"PERF-INV-{uuid.uuid4().hex[:8]}",
            "date": date.today(),
            "client_id": client.id,
            "supplier_id": supplier.id,
            "contract_id": contract.id,
            "status": InvoiceStatus.CREATED
        }
        items_data = []
        for material in materials:
            quantity = random.uniform(1.0, 50.0)
            price = random.uniform(100.0, 5000.0)
            amount = quantity * price
            amount_with_markup = amount * (1 + contract.markup_percentage / 100)
            items_data.append({
                "material_id": material.id,
                "quantity": quantity,
                "price": price,
                "amount": amount,
                "amount_with_markup": amount_with_markup
            })
        invoice = invoice_repo.create(invoice_data, items_data)
        invoice_repo.process_invoice(invoice.id)
    @time_execution
    def get_all_balances():
        return debt_repo.get_balances()
    
    balances, time_get_balances = get_all_balances()
    assert len(balances) > 0
    assert time_get_balances < 2.0 
    today = date.today()
    month_start = date(today.year, today.month, 1)
    @time_execution
    def get_turnovers():
        return debt_repo.get_turnovers(
            start_date=month_start,
            end_date=today
        )
    turnovers, time_get_turnovers = get_turnovers()
    assert time_get_turnovers < 2.0 

def test_graphql_endpoint_performance(graphql_client, generate_test_data):
    @time_execution
    def query_clients():
        query = """
        {
            clients {
                id
                name
                contact_person
            }
        }
        """
        return graphql_client(query)
    
    response, time_query_clients = query_clients()
    assert response.status_code == 200
    data = get_response_data(response)
    assert 'data' in data
    assert 'clients' in data['data']
    assert len(data['data']['clients']) > 0
    assert time_query_clients < 2.0  
    @time_execution
    def query_materials():
        query = """
        {
            materials {
                id
                name
                unit
                description
            }
        }
        """
        return graphql_client(query)
    
    response, time_query_materials = query_materials()
    assert response.status_code == 200
    data = get_response_data(response)
    assert 'data' in data
    assert 'materials' in data['data']
    assert len(data['data']['materials']) > 0
    assert time_query_materials < 2.0  
    
    @time_execution
    def query_materials():
        query = """
        {
            materials {
                id
                name
                unit
                description
            }
        }
        """
        return graphql_client(query)

    response, time_query_materials = query_materials()
    assert response.status_code == 200
    
    data = get_response_data(response)
    assert 'data' in data
    assert 'materials' in data['data']
    assert len(data['data']['materials']) > 0
    assert time_query_materials < 2.0  
    
def get_response_data(response):
    if hasattr(response, 'json'):
        if callable(response.json):
            return response.json()
        return response.json
    if hasattr(response, 'get_json'):
        if callable(response.get_json):
            return response.get_json()
        return response.get_json
    
    import json
    return json.loads(response.data.decode('utf-8'))