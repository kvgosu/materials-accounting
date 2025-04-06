from flask import Flask
from flask_cors import CORS
from .database import init_db
from .graphql.view import register_graphql_view
from .template_routes import register_template_routes

def create_app():
    app = Flask(__name__)
    CORS(app)

    try:
        app.config.from_object('app.config.Config')
    except ImportError:
        print("WARNING: Configuration module not found. Using default settings.")
        app.config['SECRET_KEY'] = 'dev-key'
        app.config['DEBUG'] = True
    
    with app.app_context():
        try:
            init_db()
        except Exception as e:
            print(f"WARNING: Database initialization failed: {e}")
    register_graphql_view(app)
    register_template_routes(app)
    @app.route('/')
    def index():
        return {"message": "Materials Accounting API is running"}
    
    return app