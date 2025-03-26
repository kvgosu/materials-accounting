# app/database/db.py
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Получение строки подключения из переменных окружения
DATABASE_URL = os.getenv("DATABASE_URL")

# Vercel с Render и некоторые другие провайдеры используют URL, 
# начинающиеся с postgres://, но SQLAlchemy 1.4+ требует postgresql://
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Для разработки, если DATABASE_URL не определен, используем SQLite
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///./materials_accounting.db"
    engine = create_engine(
        DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(DATABASE_URL)

# Создание сессии
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Импортируем модели и Base
from .models import Base

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
    # Создаем SQL для представления DebtBalances
    sql = """
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
    
    try:
        # Для PostgreSQL нужна функция uuid_generate_v4()
        engine.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
        # Создаем само представление
        engine.execute(sql)
    except Exception as e:
        # В случае SQLite или другой DB, которая не поддерживает данный функционал,
        # просто логируем ошибку
        print(f"Could not create view: {str(e)}")