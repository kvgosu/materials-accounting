import os
from pathlib import Path
from typing import List, Optional

def load_schema_from_path(schema_path: str) -> str:
    """Загружает GraphQL схему из указанного пути."""
    with open(schema_path, 'r') as file:
        return file.read()

def load_all_schemas(schemas_dir: Optional[str] = None) -> str:
    """
    Загружает все GraphQL схемы из директории схем.
    По умолчанию ищет схемы в libs/graphql/src/schemas
    """
    if schemas_dir is None:
        # Получаем абсолютный путь к корню проекта 
        root_dir = Path(__file__).parent.parent.parent.parent.parent
        schemas_dir = os.path.join(root_dir, 'libs', 'graphql', 'src', 'schemas')
    
    schema_files = []
    for root, dirs, files in os.walk(schemas_dir):
        for file in files:
            if file.endswith('.graphql'):
                schema_files.append(os.path.join(root, file))
    
    combined_schema = ""
    for schema_file in schema_files:
        schema_content = load_schema_from_path(schema_file)
        combined_schema += schema_content + "\n"
    
    return combined_schema