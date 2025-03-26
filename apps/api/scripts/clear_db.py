import sys
import os
import logging
from sqlalchemy import text

# Добавляем путь к корневой директории проекта в sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database.db import SessionLocal, engine
from app.database.models import (
    Base, Client, Supplier, Contract, Material, 
    Invoice, InvoiceItem, Transaction, DebtMovement
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def clear_tables(db):
    """Очистка всех таблиц базы данных"""
    try:
        # Порядок очистки важен из-за внешних ключей
        logger.info("Очистка таблицы debt_movements")
        db.query(DebtMovement).delete()
        
        logger.info("Очистка таблицы transactions")
        db.query(Transaction).delete()
        
        logger.info("Очистка таблицы invoice_items")
        db.query(InvoiceItem).delete()
        
        logger.info("Очистка таблицы invoices")
        db.query(Invoice).delete()
        
        logger.info("Очистка таблицы contracts")
        db.query(Contract).delete()
        
        logger.info("Очистка таблицы materials")
        db.query(Material).delete()
        
        logger.info("Очистка таблицы suppliers")
        db.query(Supplier).delete()
        
        logger.info("Очистка таблицы clients")
        db.query(Client).delete()
        
        db.commit()
        logger.info("Все таблицы успешно очищены")
        
    except Exception as e:
        logger.error(f"Ошибка при очистке таблиц: {str(e)}")
        db.rollback()
        raise

def reset_sequences():
    """Сброс последовательностей (для PostgreSQL)"""
    try:
        with engine.connect() as connection:
            # Проверяем, что используется PostgreSQL
            if 'postgresql' in engine.url.drivername:
                logger.info("Сброс последовательностей в PostgreSQL")
                sql = text("SELECT pg_catalog.setval(pg_get_serial_sequence('table_name', 'id'), 1, false);")
                connection.execute(sql)
                logger.info("Последовательности успешно сброшены")
    except Exception as e:
        logger.error(f"Ошибка при сбросе последовательностей: {str(e)}")
        # Этот сбой некритичный, можно продолжить работу скрипта

def main():
    """Основная функция очистки базы данных"""
    logger.info("Начало очистки базы данных")
    
    # Запрос подтверждения
    confirm = input("Вы уверены, что хотите очистить все данные из базы? (y/n): ")
    if confirm.lower() != 'y':
        logger.info("Очистка отменена пользователем")
        return
    
    # Создание сессии
    db = SessionLocal()
    
    try:
        # Очистка таблиц
        clear_tables(db)
        
        # Сброс последовательностей (для PostgreSQL)
        reset_sequences()
        
        logger.info("Очистка базы данных завершена успешно")
        
    except Exception as e:
        logger.error(f"Ошибка при очистке базы данных: {str(e)}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    main()