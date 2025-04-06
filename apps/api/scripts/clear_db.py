# scripts/clear_db.py
import sys
import os
import io
import sqlite3
import argparse
from dotenv import load_dotenv

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

load_dotenv()

sqlite_path = os.getenv("SQLITE_PATH", "./dev_database.db")

def clear_database(force=False):
    if not force:
        print("WARNING: The database will be completely cleared!")
        answer = input("Are you sure you want to clear all data? (y/n): ")
        if answer.lower() != 'y':
            print("Operation cancelled.")
            return
    try:
        conn = sqlite3.connect(sqlite_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
        tables = cursor.fetchall()
        cursor.execute("PRAGMA foreign_keys = OFF")
        for table in tables:
            table_name = table[0]
            print(f"Clearing table: {table_name}")
            cursor.execute(f"DELETE FROM {table_name}")
        cursor.execute("PRAGMA foreign_keys = ON")
        conn.commit()
        print("All tables have been cleared successfully")
        
    except Exception as e:
        print(f"Error during database clearing: {str(e)}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Clear the database tables')
    parser.add_argument('--force', '-f', action='store_true', help='Force clearing without confirmation')
    args = parser.parse_args()
    
    clear_database(force=args.force)