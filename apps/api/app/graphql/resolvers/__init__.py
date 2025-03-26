# app/graphql/resolvers/__init__.py
from ariadne import QueryType, MutationType

# Инициализируем базовые объекты для резолверов
query = QueryType()
mutation = MutationType()

# Импортируем функции регистрации резолверов
from .clients import register_clients_resolvers
from .suppliers import register_suppliers_resolvers
from .materials import register_materials_resolvers

# Регистрируем все резолверы
register_clients_resolvers(query, mutation)
register_suppliers_resolvers(query, mutation)
register_materials_resolvers(query, mutation)

# Экспортируем query и mutation для использования в schema.py
__all__ = ['query', 'mutation']