from flask import Flask
from flask_cors import CORS
from .database import init_db
from .graphql.view import register_graphql_view

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Загрузка конфигурации
    app.config.from_object('app.config.Config')
    
    # Инициализация базы данных
    init_db(app)
    
    # Регистрация GraphQL
    register_graphql_view(app)
    
    return app