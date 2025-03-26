# app/graphql/schema.py
from ariadne import make_executable_schema
from .schema_loader import load_all_schemas
from .resolvers import query, mutation

# Загружаем схему
type_defs = load_all_schemas()

# Создаем исполняемую схему с резолверами
schema = make_executable_schema(
    type_defs,
    query,
    mutation
)