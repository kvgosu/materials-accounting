# app/graphql/schema.py
from ariadne import make_executable_schema
from .schema_loader import load_all_schemas
from .resolvers import query, mutation, type_defs
from .scalars import upload_scalar

type_defs_schema = load_all_schemas()

schema = make_executable_schema(
    type_defs_schema,
    query,
    mutation,
    upload_scalar,  
    *type_defs.values()
)