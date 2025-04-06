# app/graphql/resolvers/clients.py
from ...database.repositories import ClientRepository
import logging
import traceback
import sys

logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s [%(levelname)s] - %(message)s',
                   handlers=[logging.StreamHandler(sys.stdout)])
logger = logging.getLogger("client_resolver")

def get_clients_resolver(obj, info, **kwargs):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    search = kwargs.get('search', None)
    clients = client_repo.get_all(skip=skip, limit=limit, search=search)
    logger.info(f"!!!! КЛИЕНТЫ НАЙДЕНЫ: {len(clients)} !!!!")
    for client in clients:
        logger.info(f"!!!! КЛИЕНТ: ID={client.id} ({type(client.id)}), Name={client.name} !!!!")
    return clients

def get_client_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    client = client_repo.get_by_id(id)
    return client

def create_client_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    client = client_repo.create(input)
    return {"client": client}

def update_client_resolver(obj, info, id, input, **kwargs):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    client = client_repo.update(id, input)
    if not client:
        raise Exception(f"Клиент с ID {id} не найден")
    return {"client": client}

def delete_client_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    client_repo = ClientRepository(db)
    success = client_repo.delete(id)
    if not success:
        raise Exception(f"Клиент с ID {id} не найден")
    return {"success": success}

def register_clients_resolvers(query, mutation):
    query.set_field("clients", get_clients_resolver)
    query.set_field("client", get_client_resolver)
    mutation.set_field("create_client", create_client_resolver)
    mutation.set_field("update_client", update_client_resolver)
    mutation.set_field("delete_client", delete_client_resolver)