# app/graphql/resolvers/clients.py
from ...database.repositories import ClientRepository

# Резолверы для запросов
def get_clients_resolver(obj, info, **kwargs):
    # Получаем сессию БД из контекста
    db = info.context["db"]
    client_repo = ClientRepository(db)
    
    # Получаем аргументы
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    search = kwargs.get('search', None)
    
    # Получаем клиентов
    clients = client_repo.get_all(skip=skip, limit=limit, search=search)
    
    return clients

def get_client_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    
    # Получаем клиента по ID
    client = client_repo.get_by_id(id)
    
    return client

# Резолверы для мутаций
def create_client_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    
    # Создаем клиента
    client = client_repo.create(input)
    
    return {"client": client}

def update_client_resolver(obj, info, id, input, **kwargs):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    
    # Обновляем клиента
    client = client_repo.update(id, input)
    
    if not client:
        raise Exception(f"Клиент с ID {id} не найден")
    
    return {"client": client}

def delete_client_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    
    # Удаляем клиента
    success = client_repo.delete(id)
    
    if not success:
        raise Exception(f"Клиент с ID {id} не найден")
    
    return {"success": success}

# Регистрация резолверов
def register_clients_resolvers(query, mutation):
    # Резолверы для запросов
    query.set_field("clients", get_clients_resolver)
    query.set_field("client", get_client_resolver)
    
    # Резолверы для мутаций
    mutation.set_field("createClient", create_client_resolver)
    mutation.set_field("updateClient", update_client_resolver)
    mutation.set_field("deleteClient", delete_client_resolver)