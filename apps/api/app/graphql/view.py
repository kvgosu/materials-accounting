# app/graphql/view.py
from flask import request, jsonify
from ariadne import graphql_sync
from ariadne.explorer import Explorer
from .schema import schema
from ..database.db import get_db

def register_graphql_view(app):
    """Регистрирует GraphQL точки входа в Flask приложении."""
    
    @app.route("/graphql", methods=["GET"])
    def graphql_playground():
        """Обработчик GraphQL Explorer для удобной разработки."""
        explorer = Explorer(title="Materials Accounting GraphQL API")
        return explorer.html(None)
    
    @app.route("/graphql", methods=["POST"])
    def graphql_server():
        """Основной обработчик GraphQL запросов."""
        data = request.get_json()
        
        # Получаем сессию базы данных
        db = next(get_db())
        
        success, result = graphql_sync(
            schema,
            data,
            context_value={"request": request, "db": db},
            debug=app.debug
        )
        
        status_code = 200 if success else 400
        return jsonify(result), status_code