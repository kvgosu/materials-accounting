# app/api/template_routes.py
import os
import tempfile
from flask import Blueprint, send_from_directory, abort, current_app

template_bp = Blueprint('template', __name__)

@template_bp.route('/templates/<filename>', methods=['GET'])
def download_template(filename):
    temp_dir = tempfile.gettempdir()
    if '..' in filename or filename.startswith('/'):
        abort(404)
    file_path = os.path.join(temp_dir, filename)
    if not os.path.exists(file_path):
        abort(404)
    return send_from_directory(
        temp_dir, 
        filename,
        as_attachment=True,
        download_name="price_list_template.xlsx"
    )

def register_template_routes(app):
    app.register_blueprint(template_bp, url_prefix='/api')