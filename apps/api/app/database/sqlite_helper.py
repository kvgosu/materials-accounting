# app/database/sqlite_helper.py
"""
Вспомогательный модуль для обеспечения совместимости между SQLite и PostgreSQL
"""
import os
from sqlalchemy import Column, String, TypeDecorator
from sqlalchemy.dialects import postgresql
import uuid

# Определяем, используем ли мы SQLite
def is_using_sqlite():
    """Проверяем, используется ли SQLite в качестве базы данных"""
    database_url = os.getenv("DATABASE_URL", "")
    dev_mode = os.getenv("DEV_MODE", "false").lower() == "true"
    return dev_mode or not database_url or database_url.startswith("sqlite:")

# Создаем свой тип для UUID, который будет совместим с SQLite
class UUIDType(TypeDecorator):
    """Тип для хранения UUID, совместимый с SQLite и PostgreSQL"""
    
    impl = String
    cache_ok = True
    
    def __init__(self, length=36, **kwargs):
        super(UUIDType, self).__init__(length=length, **kwargs)
    
    def process_bind_param(self, value, dialect):
        """Конвертация перед сохранением в БД"""
        if value is None:
            return None
        if isinstance(value, uuid.UUID):
            return str(value)
        return value
    
    def process_result_value(self, value, dialect):
        """Конвертация после получения из БД"""
        if value is None:
            return value
        if not isinstance(value, uuid.UUID) and isinstance(value, (str, bytes)):
            try:
                return uuid.UUID(value)
            except (ValueError, TypeError):
                return value
        return value

# UUID тип, совместимый с SQLite
def get_uuid_column(nullable=False, primary_key=False, **kwargs):
    """
    Возвращает UUID колонку, совместимую как с SQLite, так и с PostgreSQL
    
    В SQLite режиме используется String(36) с автоматической конвертацией
    В PostgreSQL режиме используется нативный тип UUID
    """
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