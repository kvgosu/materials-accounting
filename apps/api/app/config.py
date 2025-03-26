import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Базовая конфигурация Flask-приложения"""
    
    # Секретный ключ для сессий
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-key-please-change-in-production")
    
    # Настройки базы данных
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    # Режим отладки
    DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    
    # Другие настройки приложения
    SITE_NAME = "Учет материалов"
    
    # CORS настройки
    CORS_ORIGINS = ["http://localhost:4200", "http://localhost:3000"]