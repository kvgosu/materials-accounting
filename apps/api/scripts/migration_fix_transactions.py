# scripts/migration_fix_transactions.py
import sys
import os

# Добавляем текущую директорию в путь, чтобы импорты работали
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.db import SessionLocal
from app.database.models import Transaction, Client
from app.database.sqlite_helper import is_using_sqlite
from sqlalchemy import text
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fix_invalid_client_ids():
    """
    Исправляет транзакции с неправильными client_id.
    Заменяет числовые ID '3' на правильный UUID реального клиента.
    """
    try:
        db = SessionLocal()
        
        # Найдем UUID клиента, которого хотим использовать для транзакций с ID='3'
        target_client = db.query(Client).first()
        
        if not target_client:
            logger.error("Не найдено ни одного клиента для миграции")
            return
        
        logger.info(f"Целевой клиент для миграции: {target_client.id}, {target_client.name}")
        
        # Найдем все транзакции с client_id='3'
        transactions_with_invalid_id = db.query(Transaction).filter(
            Transaction.client_id == '3'
        ).all()
        
        logger.info(f"Найдено {len(transactions_with_invalid_id)} транзакций с неправильным client_id='3'")
        
        # Обновляем client_id на правильный UUID
        for transaction in transactions_with_invalid_id:
            old_id = transaction.client_id
            transaction.client_id = target_client.id
            logger.info(f"Обновлена транзакция {transaction.id}: client_id изменен с {old_id} на {transaction.client_id}")
        
        # Сохраняем изменения
        db.commit()
        logger.info("Миграция успешно завершена")
        
        # Для SQLite может понадобиться дополнительное обновление через SQL
        if is_using_sqlite(db):
            stmt = text("UPDATE transactions SET client_id = :new_id WHERE client_id = '3'")
            db.execute(stmt, {"new_id": str(target_client.id)})
            db.commit()
            logger.info("Выполнено дополнительное SQL-обновление для SQLite")
            
    except Exception as e:
        logger.error(f"Ошибка при выполнении миграции: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    fix_invalid_client_ids()
    logger.info("Скрипт миграции завершен")