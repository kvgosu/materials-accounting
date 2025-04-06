# scripts/direct_init_db.py
import os
import sys
import uuid
from datetime import date, datetime, timedelta
import io
import logging

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
script_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(script_dir, '..'))
sys.path.insert(0, root_dir)

from app.database.db import init_db, SessionLocal
from app.database.models import (
    Client, Supplier, Material, Contract, 
    ContractStatus
)

def init_and_seed():
    try:
        init_db()
        logger.info("База данных инициализирована успешно")
    except Exception as e:
        logger.error(f"Ошибка при инициализации базы данных: {str(e)}")
        return

    db = SessionLocal()
    
    try:
        if db.query(Client).count() > 0:
            logger.warning("В базе данных уже есть клиенты. Пропускаем инициализацию.")
            return
        clients = [
            Client(
                name="ООО 'Технологии будущего'",
                contact_person="Иванов Иван",
                phone="+7 (999) 123-45-67",
                email="ivanov@tech-future.ru",
                address="г. Москва, ул. Ленина, 10"
            ),
            Client(
                name="ОАО 'СтройМастер'",
                contact_person="Петров Петр",
                phone="+7 (704) 765-43-21",
                email="petrov@stroymaster.kz",
                address="г. Шымкент, ул. Гепари, 5"
            ),
            Client(
                name="ИП Сидоров А.А.",
                contact_person="Сидоров Алексей",
                phone="+7 (701) 111-22-33",
                email="sidorov@example.kz",
                address="г. Алматы, ул. Абая, 15"
            )
        ]

        db.add_all(clients)

        suppliers = [
            Supplier(
                name="ТОО 'МеталлПром'",
                contact_person="Смирнов Василий",
                phone="+7 (748) 444-55-66",
                email="smirnov@metallprom.kz",
                address="г. Павлодар, ул. Мыгали, 20"
            ),
            Supplier(
                name="ОАО 'ЛесТорг'",
                contact_person="Кузнецова Елена",
                phone="+7 (707) 777-88-99",
                email="kuznetsova@lestorg.kz",
                address="г. Астана, ул. Карсы, 30"
            ),
            Supplier(
                name="ТОО 'СтройМатериалы'",
                contact_person="Козлов Дмитрий",
                phone="+7 (777) 333-22-11",
                email="kozlov@stroymaterials.kz",
                address="г. Алматы, ул. Ауэзова, 40"
            )
        ]
        db.add_all(suppliers)
        materials = [
            Material(
                name="Цемент М500",
                unit="мешок",
                description="Портландцемент М500, 50 кг"
            ),
            Material(
                name="Арматура 12мм",
                unit="метр",
                description="Арматура рифленая, диаметр 12 мм"
            ),
            Material(
                name="Кирпич облицовочный",
                unit="шт",
                description="Кирпич облицовочный красный, 250х120х65 мм"
            ),
            Material(
                name="Доска обрезная",
                unit="м³",
                description="Доска обрезная, сосна, 50х150 мм"
            ),
            Material(
                name="Песок строительный",
                unit="тонна",
                description="Песок строительный мытый, фракция 0-5 мм"
            )
        ]
        db.add_all(materials)
        today = date.today()
        contracts = [
            Contract(
                client=clients[0],
                number=f"Д-001/{today.year}",
                date=today - timedelta(days=30),
                markup_percentage=10.0,
                status=ContractStatus.ACTIVE,
                expiration_date=today + timedelta(days=365)
            ),
            Contract(
                client=clients[1],
                number=f"Д-002/{today.year}",
                date=today - timedelta(days=60),
                markup_percentage=15.0,
                status=ContractStatus.ACTIVE,
                expiration_date=today + timedelta(days=335)
            ),
            Contract(
                client=clients[2],
                number=f"Д-003/{today.year}",
                date=today - timedelta(days=90),
                markup_percentage=20.0,
                status=ContractStatus.ACTIVE,
                expiration_date=today + timedelta(days=305)
            )
        ]
        db.add_all(contracts)
        db.commit()
        logger.info("База данных успешно заполнена тестовыми данными")
        
    except Exception as e:
        db.rollback()
        logger.error(f"Ошибка при заполнении базы данных: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    init_and_seed()