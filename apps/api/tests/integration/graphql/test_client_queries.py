# tests/integration/graphql/test_client_queries.py
import json

def test_clients_query(graphql_client, sample_client):
    query = """
    {
        clients {
            id
            name
            contact_person
            phone
            email
            address
        }
    }
    """
    response = graphql_client(query)
    assert response.status_code == 200
    data = _get_response_data(response)
    assert 'data' in data
    assert 'clients' in data['data']
    clients = data['data']['clients']
    assert len(clients) >= 1
    found = False
    for client in clients:
        if client['name'] == "Test Client":
            found = True
            assert client['contact_person'] == "Test Person"
            assert client['phone'] == "+7 (999) 123-45-67"
            assert client['email'] == "test@example.com"
            assert client['address'] == "Test Address"
    assert found, "Test client not found in query results"

def test_client_query(graphql_client, sample_client):
    query = """
    query GetClient($id: ID!) {
        client(id: $id) {
            id
            name
            contact_person
            phone
            email
            address
        }
    }
    """
    variables = {"id": str(sample_client.id)}
    response = graphql_client(query, variables)
    assert response.status_code == 200
    data = _get_response_data(response)
    assert 'data' in data
    assert 'client' in data['data']
    client = data['data']['client']
    assert client['id'] == str(sample_client.id)
    assert client['name'] == "Test Client"
    assert client['contact_person'] == "Test Person"
    assert client['phone'] == "+7 (999) 123-45-67"
    assert client['email'] == "test@example.com"
    assert client['address'] == "Test Address"

def test_client_query_not_found(graphql_client):
    query = """
    query GetClient($id: ID!) {
        client(id: $id) {
            id
            name
        }
    }
    """
    variables = {"id": "00000000-0000-0000-0000-000000000000"}
    response = graphql_client(query, variables)
    assert response.status_code == 200
    data = _get_response_data(response)
    assert 'data' in data
    assert 'client' in data['data']
    assert data['data']['client'] is None

def test_create_client_mutation(graphql_client):
    mutation = """
    mutation CreateClient($input: CreateClientInput!) {
        create_client(input: $input) {
            client {
                id
                name
                contact_person
                phone
                email
                address
            }
        }
    }
    """
    variables = {
        "input": {
            "name": "New Test Client",
            "contact_person": "John Doe",
            "phone": "+7 (777) 777-77-77",
            "email": "john@example.com",
            "address": "New Address 123"
        }
    }
    response = graphql_client(mutation, variables)
    assert response.status_code == 200
    data = _get_response_data(response)
    assert 'data' in data
    assert 'create_client' in data['data']
    assert 'client' in data['data']['create_client']
    created_client = data['data']['create_client']['client']
    assert created_client['id'] is not None
    assert created_client['name'] == "New Test Client"
    assert created_client['contact_person'] == "John Doe"
    assert created_client['phone'] == "+7 (777) 777-77-77"
    assert created_client['email'] == "john@example.com"
    assert created_client['address'] == "New Address 123"

def test_update_client_mutation(graphql_client, sample_client):
    mutation = """
    mutation UpdateClient($id: ID!, $input: UpdateClientInput!) {
        update_client(id: $id, input: $input) {
            client {
                id
                name
                contact_person
                phone
                email
                address
            }
        }
    }
    """
    variables = {
        "id": str(sample_client.id),
        "input": {
            "name": "Updated Client Name",
            "contact_person": "Updated Contact",
            "phone": "+7 (888) 888-88-88"
        }
    }
    response = graphql_client(mutation, variables)
    assert response.status_code == 200
    data = _get_response_data(response)
    assert 'data' in data
    assert 'update_client' in data['data']
    assert 'client' in data['data']['update_client']
    updated_client = data['data']['update_client']['client']
    assert updated_client['id'] == str(sample_client.id)
    assert updated_client['name'] == "Updated Client Name"
    assert updated_client['contact_person'] == "Updated Contact"
    assert updated_client['phone'] == "+7 (888) 888-88-88"
    assert updated_client['email'] == "test@example.com"
    assert updated_client['address'] == "Test Address"

def test_delete_client_mutation(graphql_client, db_session):
    from app.database.models import Client
    client_to_delete = Client(
        name="Client To Delete",
        email="delete@example.com"
    )
    db_session.add(client_to_delete)
    db_session.commit()
    db_session.refresh(client_to_delete)
    mutation = """
    mutation DeleteClient($id: ID!) {
        delete_client(id: $id) {
            success
        }
    }
    """
    variables = {"id": str(client_to_delete.id)}
    response = graphql_client(mutation, variables)
    assert response.status_code == 200
    data = _get_response_data(response)
    assert 'data' in data
    assert 'delete_client' in data['data']
    assert 'success' in data['data']['delete_client']
    assert data['data']['delete_client']['success'] is True
    query = """
    query GetClient($id: ID!) {
        client(id: $id) {
            id
        }
    }
    """
    response = graphql_client(query, variables)
    data = _get_response_data(response)
    assert data['data']['client'] is None
    
def _get_response_data(response):
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