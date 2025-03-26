# apps/api/scripts/init_db.py
import os
import sys
import uuid

# Добавляем путь к корню проекта
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from datetime import date, datetime, timedelta
from sqlalchemy.orm import Session
from app.database.db import SessionLocal, init_db, create_views
from app.database.models import (
    Client, Supplier, Contract, Material, Invoice, 
    InvoiceItem, Transaction, DebtMovement,
    ContractStatus, InvoiceStatus, TransactionType, DebtDimension, DebtDirection
)

# Инициализируем базу данных
init_db()

# Создаем представления
create_views()

# Функция для заполнения тестовыми данными
def seed_test_data():
    db = SessionLocal()
    try:
        # Создаем клиентов
        clients = [
            Client(
                id=uuid.uuid4(),
                name="ООО 'Технологии будущего'",
                contact_person="Иванов Иван",
                phone="+7 (999) 123-45-67",
                email="ivanov@tech-future.ru",
                address="г. Москва, ул. Ленина, 10"
            ),
            Client(
                id=uuid.uuid4(),
                name="ЗАО 'СтройМастер'",
                contact_person="Петров Петр",
                phone="+7 (999) 765-43-21",
                email="petrov@stroymaster.ru",
                address="г. Санкт-Петербург, ул. Невская, 5"
            ),
            Client(
                id=uuid.uuid4(),
                name="ИП Сидоров А.А.",
                contact_person="Сидоров Алексей",
                phone="+7 (999) 111-22-33",
                email="sidorov@example.com",
                address="г. Казань, ул. Баумана, 15"
            )
        ]
        
        # Создаем поставщиков
        suppliers = [
            Supplier(
                id=uuid.uuid4(),
                name="ООО 'МеталлПром'",
                contact_person="Смирнов Василий",
                phone="+7 (999) 444-55-66",
                email="smirnov@metallprom.ru",
                address="г. Екатеринбург, ул. Мира, 20"
            ),
            Supplier(
                id=uuid.uuid4(),
                name="ЗАО 'ЛесТорг'",
                contact_person="Кузнецова Елена",
                phone="+7 (999) 777-88-99",
                email="kuznetsova@lestorg.ru",
                address="г. Новосибирск, ул. Красная, 30"
            ),
            Supplier(
                id=uuid.uuid4(),
                name="ООО 'СтройМатериалы'",
                contact_person="Козлов Дмитрий",
                phone="+7 (999) 333-22-11",
                email="kozlov@stroymaterials.ru",
                address="г. Ростов-на-Дону, ул. Советская, 40"
            )
        ]
        
        # Создаем материалы
        materials = [
            Material(
                id=uuid.uuid4(),
                name="Цемент М500",
                unit="мешок",
                description="Портландцемент М500, 50 кг"
            ),
            Material(
                id=uuid.uuid4(),
                name="Арматура 12мм",
                unit="метр",
                description="Арматура рифленая, диаметр 12 мм"
            ),
            Material(
                id=uuid.uuid4(),
                name="Кирпич облицовочный",
                unit="шт",
                description="Кирпич облицовочный красный, 250х120х65 мм"
            ),
            Material(
                id=uuid.uuid4(),
                name="Доска обрезная",
                unit="м³",
                description="Доска обрезная, сосна, 50х150 мм"
            ),
            Material(
                id=uuid.uuid4(),
                name="Песок строительный",
                unit="тонна",
                description="Песок строительный мытый, фракция 0-5 мм"
            )
        ]
        
        # Добавляем в базу данных
        db.add_all(clients + suppliers + materials)
        db.commit()
        
        # Создаем договоры
        contracts = [
            Contract(
                id=uuid.uuid4(),
                client_id=clients[0].id,
                number="ТБ-2025-001",
                date=date.today() - timedelta(days=30),
                markup_percentage=15.0,
                status=ContractStatus.ACTIVE,
                expiration_date=date.today() + timedelta(days=335)
            ),
            Contract(
                id=uuid.uuid4(),
                client_id=clients[1].id,
                number="СМ-2025-001",
                date=date.today() - timedelta(days=45),
                markup_percentage=10.0,
                status=ContractStatus.ACTIVE,
                expiration_date=date.today() + timedelta(days=320)
            ),
            Contract(
                id=uuid.uuid4(),
                client_id=clients[2].id,
                number="ИП-2025-001",
                date=date.today() - timedelta(days=60),
                markup_percentage=20.0,
                status=ContractStatus.ACTIVE,
                expiration_date=date.today() + timedelta(days=305)
            )
        ]
        
        # Добавляем в базу данных
        db.add_all(contracts)
        db.commit()
        
        print("База данных инициализирована и заполнена тестовыми данными.")
        
    except Exception as e:
        db.rollback()
        print(f"Ошибка при заполнении данных: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_test_data()