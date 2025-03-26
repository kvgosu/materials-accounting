# app/database/db.py
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Получение строки подключения из переменных окружения
DATABASE_URL = os.getenv("DATABASE_URL")

# Проверка режима разработки
DEV_MODE = os.getenv("DEV_MODE", "false").lower() == "true"

# Vercel с Render и некоторые другие провайдеры используют URL, 
# начинающиеся с postgres://, но SQLAlchemy 1.4+ требует postgresql://
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Для разработки, если DEV_MODE=true или DATABASE_URL не определен, используем SQLite
if DEV_MODE or not DATABASE_URL:
    SQLITE_PATH = os.getenv("SQLITE_PATH", "./materials_accounting.db")
    DATABASE_URL = f"sqlite:///{SQLITE_PATH}"
    engine = create_engine(
        DATABASE_URL, connect_args={"check_same_thread": False}
    )
    print(f"Running in development mode with SQLite at {SQLITE_PATH}")
else:
    engine = create_engine(DATABASE_URL)
    print(f"Running with PostgreSQL database")

# Создание сессии
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей SQLAlchemy
Base = declarative_base()

# Функция для получения экземпляра DB сессии
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Функция для инициализации базы данных
def init_db():
    Base.metadata.create_all(bind=engine)

# Функция для создания представления для остатков долгов
def create_views():
    """
    Создаёт SQL представления. Для SQLite и PostgreSQL разные реализации
    """
    is_sqlite = DATABASE_URL.startswith('sqlite:')
    
    try:
        if is_sqlite:
            # Для SQLite используем более простой синтаксис
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
            # Для PostgreSQL нужна функция uuid_generate_v4()
            with engine.connect() as conn:
                conn.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
                
                # Создаем само представление
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
        # Логируем ошибку
        print(f"Could not create view: {str(e)}")