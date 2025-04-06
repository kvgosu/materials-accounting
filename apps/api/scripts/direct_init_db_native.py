# scripts/direct_init_db.py
import os
import sys
import uuid
import io
from datetime import date, datetime, timedelta
import sqlite3

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
script_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(script_dir, '..'))
sys.path.insert(0, root_dir)
from dotenv import load_dotenv
load_dotenv()

sqlite_path = os.getenv("SQLITE_PATH", "./dev_database.db")
print(f"Using SQLite database at: {sqlite_path}")

def init_db_sqlite():
    conn = sqlite3.connect(sqlite_path)
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        contact_person TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS suppliers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        contact_person TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS materials (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        unit TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS contracts (
        id TEXT PRIMARY KEY,
        client_id TEXT NOT NULL,
        number TEXT NOT NULL,
        date DATE NOT NULL,
        markup_percentage REAL NOT NULL DEFAULT 0.0,
        status TEXT NOT NULL,
        expiration_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients (id)
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        number TEXT NOT NULL,
        date DATE NOT NULL,
        client_id TEXT NOT NULL,
        supplier_id TEXT NOT NULL,
        contract_id TEXT NOT NULL,
        total_amount REAL NOT NULL DEFAULT 0.0,
        total_with_markup REAL NOT NULL DEFAULT 0.0,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients (id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers (id),
        FOREIGN KEY (contract_id) REFERENCES contracts (id)
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS invoice_items (
        id TEXT PRIMARY KEY,
        invoice_id TEXT NOT NULL,
        material_id TEXT NOT NULL,
        quantity REAL NOT NULL,
        price REAL NOT NULL,
        amount REAL NOT NULL,
        amount_with_markup REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (invoice_id) REFERENCES invoices (id),
        FOREIGN KEY (material_id) REFERENCES materials (id)
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        invoice_id TEXT,
        client_id TEXT,
        supplier_id TEXT,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        date DATE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (invoice_id) REFERENCES invoices (id),
        FOREIGN KEY (client_id) REFERENCES clients (id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS debt_movements (
        id TEXT PRIMARY KEY,
        period TIMESTAMP NOT NULL,
        document_id TEXT NOT NULL,
        document_type TEXT NOT NULL,
        client_id TEXT,
        supplier_id TEXT,
        amount REAL NOT NULL,
        direction TEXT NOT NULL,
        dimension TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        invoice_id TEXT,
        transaction_id TEXT,
        FOREIGN KEY (client_id) REFERENCES clients (id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers (id),
        FOREIGN KEY (invoice_id) REFERENCES invoices (id),
        FOREIGN KEY (transaction_id) REFERENCES transactions (id)
    )
    ''')
    
    try:
        cursor.execute('''
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
            client_id, supplier_id, dimension
        ''')
        print("View created successfully")
    except Exception as e:
        print(f"Could not create view: {str(e)}")
    
    conn.commit()
    conn.close()
    
    print("SQLite tables created directly.")

def seed_test_data():
    conn = sqlite3.connect(sqlite_path)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM clients")
    count = cursor.fetchone()[0]
    if count > 0:
        print("Database already has clients. Skipping test data insertion.")
        conn.close()
        return
    client_ids = [str(uuid.uuid4()) for _ in range(3)]
    supplier_ids = [str(uuid.uuid4()) for _ in range(3)]
    material_ids = [str(uuid.uuid4()) for _ in range(5)]
    try:
        clients = [
            (client_ids[0], "ООО 'Технологии будущего'", "Иванов Иван", "+7 (999) 123-45-67", "ivanov@tech-future.ru", "г. Москва, ул. Ленина, 10", datetime.now(), datetime.now()),
            (client_ids[1], "ОАО 'СтройМастер'", "Петров Петр", "+7 (704) 765-43-21", "petrov@stroymaster.kz", "г. Шымкент, ул. Гепари, 5", datetime.now(), datetime.now()),
            (client_ids[2], "ИП Сидоров А.А.", "Сидоров Алексей", "+7 (701) 111-22-33", "sidorov@example.kz", "г. Алматы, ул. Абая, 15", datetime.now(), datetime.now())
        ]
        cursor.executemany('''
            INSERT INTO clients (id, name, contact_person, phone, email, address, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', clients)
        suppliers = [
            (supplier_ids[0], "ТОО 'МеталлПром'", "Смирнов Василий", "+7 (748) 444-55-66", "smirnov@metallprom.kz", "г. Павлодар, ул. Мыгали, 20", datetime.now(), datetime.now()),
            (supplier_ids[1], "ОАО 'ЛесТорг'", "Кузнецова Елена", "+7 (707) 777-88-99", "kuznetsova@lestorg.kz", "г. Астана, ул. Карсы, 30", datetime.now(), datetime.now()),
            (supplier_ids[2], "ТОО 'СтройМатериалы'", "Козлов Дмитрий", "+7 (777) 333-22-11", "kozlov@stroymaterials.kz", "г. Алматы, ул. Ауэзова, 40", datetime.now(), datetime.now())
        ]
        cursor.executemany('''
            INSERT INTO suppliers (id, name, contact_person, phone, email, address, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', suppliers)
        materials = [
            (material_ids[0], "Цемент М500", "мешок", "Портландцемент М500, 50 кг", datetime.now(), datetime.now()),
            (material_ids[1], "Арматура 12мм", "метр", "Арматура рифленая, диаметр 12 мм", datetime.now(), datetime.now()),
            (material_ids[2], "Кирпич облицовочный", "шт", "Кирпич облицовочный красный, 250х120х65 мм", datetime.now(), datetime.now()),
            (material_ids[3], "Доска обрезная", "м³", "Доска обрезная, сосна, 50х150 мм", datetime.now(), datetime.now()),
            (material_ids[4], "Песок строительный", "тонна", "Песок строительный мытый, фракция 0-5 мм", datetime.now(), datetime.now())
        ] 
        cursor.executemany('''
            INSERT INTO materials (id, name, unit, description, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', materials)
        today = date.today()
        contracts = [
            (str(uuid.uuid4()), client_ids[0], "ТБ-2025-001", today - timedelta(days=30), 15.0, "ACTIVE", today + timedelta(days=335), datetime.now(), datetime.now()),
            (str(uuid.uuid4()), client_ids[1], "СМ-2025-001", today - timedelta(days=45), 10.0, "ACTIVE", today + timedelta(days=320), datetime.now(), datetime.now()),
            (str(uuid.uuid4()), client_ids[2], "ИП-2025-001", today - timedelta(days=60), 20.0, "ACTIVE", today + timedelta(days=305), datetime.now(), datetime.now())
        ]
        cursor.executemany('''
            INSERT INTO contracts (id, client_id, number, date, markup_percentage, status, expiration_date, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', contracts)
        conn.commit()
        print("Database initialized with test data successfully.")
    except Exception as e:
        conn.rollback()
        print(f"Error during data initialization: {str(e)}")
    finally:
        conn.close()

if __name__ == "__main__":
    init_db_sqlite()
    seed_test_data()