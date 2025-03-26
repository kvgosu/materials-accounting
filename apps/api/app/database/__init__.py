# app/database/__init__.py
from .db import engine, SessionLocal, get_db, init_db, create_views
from .models import Base, Client, Supplier, Contract, Material, Invoice, InvoiceItem, Transaction, DebtMovement
from .sqlite_helper import is_using_sqlite, get_uuid_column

# Экспортируем только необходимые объекты 
__all__ = [
    'engine', 'SessionLocal', 'get_db', 'init_db', 'create_views',
    'Base', 'Client', 'Supplier', 'Contract', 'Material', 
    'Invoice', 'InvoiceItem', 'Transaction', 'DebtMovement',
    'is_using_sqlite', 'get_uuid_column'
]