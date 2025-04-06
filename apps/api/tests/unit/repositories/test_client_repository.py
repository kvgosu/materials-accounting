# tests/unit/repositories/test_client_repository.py
import pytest
import uuid
from app.database.repositories import ClientRepository
from app.database.models import Client

def test_create_client(db_session):
    repo = ClientRepository(db_session)
    client_data = {
        "name": "Test Client",
        "contact_person": "Test Person",
        "phone": "+7 (747) 123-45-67",
        "email": "test@example.com",
        "address": "Test Address"
    }
    client = repo.create(client_data)
    assert client.id is not None
    assert client.name == "Test Client"
    assert client.contact_person == "Test Person"
    assert client.phone == "+7 (747) 123-45-67"
    assert client.email == "test@example.com"
    assert client.address == "Test Address"
    db_client = db_session.query(Client).filter(Client.id == client.id).first()
    assert db_client is not None
    assert db_client.name == "Test Client"

def test_get_client_by_id(db_session):
    repo = ClientRepository(db_session)
    client = Client(
        name="Test Client", 
        contact_person="Test Person",
        email="test@example.com"
    )
    db_session.add(client)
    db_session.commit()
    retrieved_client = repo.get_by_id(client.id)
    assert retrieved_client is not None
    assert retrieved_client.id == client.id
    assert retrieved_client.name == "Test Client"
    assert retrieved_client.contact_person == "Test Person"
    assert retrieved_client.email == "test@example.com"

def test_get_client_by_id_not_found(db_session):
    repo = ClientRepository(db_session)
    non_existent_id = uuid.uuid4()
    retrieved_client = repo.get_by_id(non_existent_id)
    assert retrieved_client is None

def test_get_all_clients(db_session):
    repo = ClientRepository(db_session)
    clients = [
        Client(name="Client 1", email="client1@example.com"),
        Client(name="Client 2", email="client2@example.com"),
        Client(name="Client 3", email="client3@example.com")
    ]
    db_session.add_all(clients)
    db_session.commit()
    all_clients = repo.get_all()
    assert len(all_clients) == 3
    assert set(c.name for c in all_clients) == {"Client 1", "Client 2", "Client 3"}

def test_get_all_clients_with_search(db_session):
    repo = ClientRepository(db_session)
    clients = [
        Client(name="ABC Company", email="abc@example.com"),
        Client(name="XYZ Corporation", email="xyz@example.com"),
        Client(name="ABC Enterprises", email="enterprises@example.com")
    ]
    db_session.add_all(clients)
    db_session.commit()
    abc_clients = repo.get_all(search="ABC")
    xyz_clients = repo.get_all(search="XYZ")
    no_clients = repo.get_all(search="Nonexistent")
    assert len(abc_clients) == 2
    assert len(xyz_clients) == 1
    assert len(no_clients) == 0
    assert set(c.name for c in abc_clients) == {"ABC Company", "ABC Enterprises"}
    assert xyz_clients[0].name == "XYZ Corporation"

def test_update_client(db_session):
    repo = ClientRepository(db_session)
    client = Client(
        name="Original Name", 
        contact_person="Original Person",
        phone="+7 (747) 111-11-11"
    )
    db_session.add(client)
    db_session.commit()
    update_data = {
        "name": "Updated Name",
        "contact_person": "Updated Person",
        "phone": "+7 (747) 222-22-22"
    }
    updated_client = repo.update(client.id, update_data)
    assert updated_client is not None
    assert updated_client.name == "Updated Name"
    assert updated_client.contact_person == "Updated Person"
    assert updated_client.phone == "+7 (707) 222-22-22"
    db_client = db_session.query(Client).filter(Client.id == client.id).first()
    assert db_client.name == "Updated Name"
    assert db_client.contact_person == "Updated Person"
    assert db_client.phone == "+7 (707) 222-22-22"

def test_update_client_partial(db_session):
    repo = ClientRepository(db_session)
    client = Client(
        name="Original Name", 
        contact_person="Original Person",
        phone="+7 (707) 111-11-11",
        email="original@example.com"
    )
    db_session.add(client)
    db_session.commit()
    
    update_data = {
        "name": "Updated Name",
    }
    updated_client = repo.update(client.id, update_data)
    assert updated_client is not None
    assert updated_client.name == "Updated Name"
    assert updated_client.contact_person == "Original Person"  
    assert updated_client.phone == "+7 (747) 111-11-11"  
    assert updated_client.email == "original@example.com"  

def test_update_nonexistent_client(db_session):
    repo = ClientRepository(db_session)
    non_existent_id = uuid.uuid4()
    update_data = {"name": "Updated Name"}
    updated_client = repo.update(non_existent_id, update_data)
    assert updated_client is None

def test_delete_client(db_session):
    repo = ClientRepository(db_session)
    client = Client(name="Test Client")
    db_session.add(client)
    db_session.commit()
    client_id = client.id
    result = repo.delete(client_id)
    assert result is True
    assert repo.get_by_id(client_id) is None
    assert db_session.query(Client).filter(Client.id == client_id).first() is None

def test_delete_nonexistent_client(db_session):
    repo = ClientRepository(db_session)
    non_existent_id = uuid.uuid4()
    result = repo.delete(non_existent_id)
    assert result is False