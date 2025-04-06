# app/database/sqlite_helper.py

import os
from sqlalchemy import Column, String, TypeDecorator
from sqlalchemy.dialects import postgresql
import uuid

def is_using_sqlite(db=None):
    if db is not None:
        return 'sqlite' in db.bind.dialect.name
    database_url = os.getenv("DATABASE_URL", "")
    return database_url.startswith("sqlite:") or not database_url or os.getenv("DEV_MODE", "false").lower() == "true"
class UUIDType(TypeDecorator):
    impl = String
    cache_ok = True
    
    def __init__(self, length=36, **kwargs):
        super(UUIDType, self).__init__(length=length, **kwargs)
    
    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        if isinstance(value, uuid.UUID):
            return str(value)
        return value
    
    def process_result_value(self, value, dialect):
        if value is None:
            return value
        if not isinstance(value, uuid.UUID) and isinstance(value, (str, bytes)):
            try:
                return uuid.UUID(value)
            except (ValueError, TypeError):
                return value
        return value
    
def get_uuid_column(nullable=False, primary_key=False, **kwargs):
    if is_using_sqlite():
        return Column(
            UUIDType(36),
            primary_key=primary_key,
            nullable=nullable,
            default=uuid.uuid4,
            **kwargs
        )
    else:
        return Column(
            postgresql.UUID(as_uuid=True),
            primary_key=primary_key,
            nullable=nullable,
            default=uuid.uuid4,
            **kwargs
        )