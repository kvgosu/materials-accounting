from flask import request, jsonify
from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from .schema import schema

def register_graphql_view(app):
    """Регистрирует GraphQL точки входа в Flask приложении."""
    
    @app.route("/graphql", methods=["GET"])
    def graphql_playground():
        """Обработчик GraphQL Playground для удобной разработки."""
        return PLAYGROUND_HTML, 200
    
    @app.route("/graphql", methods=["POST"])
    def graphql_server():
        """Основной обработчик GraphQL запросов."""
        data = request.get_json()
        
        success, result = graphql_sync(
            schema,
            data,
            context_value={"request": request},
            debug=app.debug
        )
        
        status_code = 200 if success else 400
        return jsonify(result), status_code