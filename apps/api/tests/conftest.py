# tests/conftest.py
import pytest
import os
import tempfile
import uuid
from datetime import date, datetime, timedelta
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Импортируем необходимые модули
from app import create_app
from app.database.db import get_db
from app.database.models import (
    Base, Client, Supplier, Contract, Material, 
    Invoice, InvoiceItem, Transaction, DebtMovement,
    ContractStatus, InvoiceStatus, TransactionType,
    DebtDimension, DebtDirection
)

@pytest.fixture(scope="session")
def app_for_testing():
    db_fd, db_path = tempfile.mkstemp()
    app = create_app()
    app.config.update({
        'TESTING': True,
        'DATABASE_URL': f'sqlite:///{db_path}',
        'DEV_MODE': True
    })
    with app.app_context():
        engine = create_engine(f'sqlite:///{db_path}')
        Base.metadata.create_all(bind=engine)
    
    yield app

    try:
        os.close(db_fd)
        os.unlink(db_path)
    except Exception as e:
        print(f"Warning: Could not remove temporary file {db_path}: {e}")

@pytest.fixture
def app(app_for_testing):
    return app_for_testing

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def engine(app):
    with app.app_context():
        engine = create_engine(app.config['DATABASE_URL'])
        yield engine

@pytest.fixture
def db_session(app, engine):
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()

@pytest.fixture
def sample_client(db_session):
    client = Client(
        name="Test Client",
        contact_person="Test Person",
        phone="+7 (999) 123-45-67",
        email="test@example.com",
        address="Test Address"
    )
    db_session.add(client)
    db_session.flush()
    return client

@pytest.fixture
def sample_supplier(db_session):
    supplier = Supplier(
        name="Test Supplier",
        contact_person="Supplier Contact",
        phone="+7 (888) 765-43-21",
        email="supplier@example.com",
        address="Supplier Address"
    )
    db_session.add(supplier)
    db_session.flush()
    return supplier

@pytest.fixture
def sample_contract(db_session, sample_client):
    today = date.today()
    contract = Contract(
        client_id=sample_client.id,
        number="TEST-001",
        date=today - timedelta(days=10),
        markup_percentage=15.0,
        status=ContractStatus.ACTIVE,
        expiration_date=today + timedelta(days=355)
    )
    db_session.add(contract)
    db_session.flush()
    return contract

@pytest.fixture
def sample_materials(db_session):
    materials = [
        Material(name="Test Material 1", unit="шт", description="Description 1"),
        Material(name="Test Material 2", unit="кг", description="Description 2"),
        Material(name="Test Material 3", unit="м", description="Description 3")
    ]
    db_session.add_all(materials)
    db_session.flush()
    return materials

@pytest.fixture
def sample_invoice(db_session, sample_client, sample_supplier, sample_contract, sample_materials):
    invoice = Invoice(
        number="INV-TEST-001",
        date=date.today(),
        client_id=sample_client.id,
        supplier_id=sample_supplier.id,
        contract_id=sample_contract.id,
        status=InvoiceStatus.CREATED,
        total_amount=0.0,
        total_with_markup=0.0
    )
    db_session.add(invoice)
    db_session.flush()
    total_amount = 0.0
    total_with_markup = 0.0
    items = []
    for i, material in enumerate(sample_materials):
        quantity = float(i + 1) * 10
        price = 100.0 * (i + 1)
        amount = quantity * price
        amount_with_markup = amount * (1 + sample_contract.markup_percentage / 100)
        item = InvoiceItem(
            invoice_id=invoice.id,
            material_id=material.id,
            quantity=quantity,
            price=price,
            amount=amount,
            amount_with_markup=amount_with_markup
        )
        items.append(item)
        total_amount += amount
        total_with_markup += amount_with_markup
    db_session.add_all(items)
    invoice.total_amount = total_amount
    invoice.total_with_markup = total_with_markup
    db_session.flush()
    return invoice

@pytest.fixture
def processed_invoice(db_session, sample_invoice):
    from app.database.repositories import InvoiceRepository
    repo = InvoiceRepository(db_session)
    repo.process_invoice(sample_invoice.id)
    return sample_invoice

@pytest.fixture
def graphql_client(client, app, db_session):
    from app.database.db import get_db as original_get_db
    def mock_get_db():
        try:
            yield db_session
        finally:
            pass 

    import app.graphql.view
    original_function = app.graphql.view.get_db
    app.graphql.view.get_db = mock_get_db
    
    def _execute_query(query, variables=None):
        try:
            response = client.post('/graphql', json={
                'query': query,
                'variables': variables
            })
            return response
        finally:
            app.graphql.view.get_db = original_function
    
    return _execute_query