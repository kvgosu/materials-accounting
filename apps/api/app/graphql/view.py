# app/graphql/view.py
import json
import base64
from flask import request, jsonify, current_app
from ariadne import graphql_sync
from ariadne.explorer import Explorer
from .schema import schema
from ..database.db import get_db

def register_graphql_view(app):

    @app.route("/graphql", methods=["GET"])
    def graphql_playground():
        return Explorer().html(title="GraphQL Explorer"), 200
    
    @app.route("/graphql", methods=["POST"])
    def graphql_server():
        content_type = request.content_type or ""
        if content_type.startswith("multipart/form-data"):
            operations = json.loads(request.form.get("operations", "{}"))
            files_map = json.loads(request.form.get("map", "{}"))
            data = operations
            for file_key, paths in files_map.items():
                file = request.files.get(file_key)
                if file:
                    for path in paths:
                        parts = path.split(".")
                        current = data
                        for part in parts[:-1]:
                            if part.isdigit():
                                part = int(part)
                            if part not in current:
                                current[part] = {}
                            current = current[part]
                        current[parts[-1]] = {
                            "name": file.filename,
                            "data": base64.b64encode(file.read()).decode("utf-8")
                        }
        else:
            data = request.get_json()
            
        db = next(get_db())
        success, result = graphql_sync(
            schema,
            data,
            context_value={"request": request, "db": db},
            debug=app.debug
        ) 
        status_code = 200 if success else 400
        return jsonify(result), status_code

    @app.route("/api/upload/price-list", methods=["POST"])
    def upload_price_list():
        try:
            if 'file' not in request.files:
                return jsonify({"error": "No file part"}), 400 
            file = request.files['file']
            if file.filename == '':
                return jsonify({"error": "No selected file"}), 400  
            supplier_id = request.form.get('supplier_id')
            date = request.form.get('date')
            if not supplier_id or not date:
                return jsonify({"error": "Missing supplier_id or date"}), 400
            db = next(get_db())
            from ..services.price_list_service import PriceListService
            price_list_service = PriceListService(db)
            result = price_list_service.process_price_list(
                supplier_id=supplier_id,
                date_str=date,
                file_data=file.read(),
                file_name=file.filename
            )
            return jsonify(result), 200
        except Exception as e:
            current_app.logger.error(f"Ошибка при загрузке прайс-листа: {str(e)}")
            return jsonify({"error": str(e)}), 500