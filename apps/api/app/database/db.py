# app/database/db.py
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
DEV_MODE = os.getenv("DEV_MODE", "false").lower() == "true"
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
POOL_SIZE = int(os.getenv("POOL_SIZE", "20")) 
POOL_RECYCLE = int(os.getenv("POOL_RECYCLE", "900"))  
POOL_TIMEOUT = int(os.getenv("POOL_TIMEOUT", "60"))  
MAX_OVERFLOW = int(os.getenv("MAX_OVERFLOW", "20"))  

if DEV_MODE or not DATABASE_URL:
    SQLITE_PATH = os.getenv("SQLITE_PATH", "./materials_accounting.db")
    DATABASE_URL = f"sqlite:///{SQLITE_PATH}"
    engine = create_engine(
        DATABASE_URL, 
        connect_args={"check_same_thread": False},
        pool_size=POOL_SIZE, 
        max_overflow=MAX_OVERFLOW,
        pool_recycle=POOL_RECYCLE,
        pool_timeout=POOL_TIMEOUT,
        pool_pre_ping=True
    )
    print(f"Running in development mode with SQLite at {SQLITE_PATH} (pool_size={POOL_SIZE})")
else:
    engine = create_engine(
        DATABASE_URL,
        pool_size=POOL_SIZE,  
        max_overflow=MAX_OVERFLOW,  
        pool_recycle=POOL_RECYCLE,  
        pool_timeout=POOL_TIMEOUT,  
        pool_pre_ping=True  
    )
    print(f"Running with PostgreSQL database (pool_size={POOL_SIZE}, max_overflow={MAX_OVERFLOW})")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)

def create_views():
    is_sqlite = DATABASE_URL.startswith('sqlite:')
    
    try:
        if is_sqlite:
            view_sql = """
            CREATE VIEW IF NOT EXISTS debt_balances_view AS
            SELECT 
                hex(randomblob(16)) as id,
                client_id,
                supplier_id,
                dimension,
                (SUM(CASE WHEN direction = 'DEBIT' THEN amount ELSE 0 END) - 
                 SUM(CASE WHEN direction = 'CREDIT' THEN amount ELSE 0 END)) as balance,
                datetime('now') as as_of_date
            FROM 
                debt_movements
            GROUP BY 
                client_id, supplier_id, dimension;
            """
            with engine.connect() as conn:
                conn.execute(view_sql)
        else:
            with engine.connect() as conn:
                conn.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
                view_sql = """
                CREATE OR REPLACE VIEW debt_balances_view AS
                SELECT 
                    uuid_generate_v4() as id,
                    client_id,
                    supplier_id,
                    dimension,
                    (SUM(CASE WHEN direction = 'DEBIT' THEN amount ELSE 0 END) - 
                     SUM(CASE WHEN direction = 'CREDIT' THEN amount ELSE 0 END)) as balance,
                    NOW() as as_of_date
                FROM 
                    debt_movements
                GROUP BY 
                    client_id, supplier_id, dimension;
                """
                conn.execute(view_sql)
    except Exception as e:
        print(f"Could not create view: {str(e)}")