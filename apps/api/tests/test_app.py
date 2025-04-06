# tests/test_app.py
def test_index_route(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.is_json
    assert response.json.get('message') == "Materials Accounting API is running"

def test_graphql_explorer_route(client):
    response = client.get('/graphql')
    assert response.status_code == 200
    assert b'GraphQL API Explorer' in response.data or b'<!DOCTYPE html>' in response.data

def test_graphql_empty_query(client):
    response = client.post('/graphql', json={'query': '{__typename}'})
    assert response.status_code == 200
    assert response.is_json
    data = response.json
    assert 'data' in data
    assert '__typename' in data['data']
    assert data['data']['__typename'] == 'Query'