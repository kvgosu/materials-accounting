import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-key-please-change-in-production")
    DATABASE_URL = os.getenv("DATABASE_URL")
    DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    SITE_NAME = "Учет материалов"
    CORS_ORIGINS = ["http://localhost:4200", "http://localhost:3000"]