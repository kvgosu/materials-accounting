import re
from pathlib import Path

def snake_to_camel(snake_str):
    components = snake_str.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

def transform_field_names(schema_string):
    field_pattern = re.compile(r'(\s+)([a-z][a-z0-9_]+)(\s*[:|(])')
    
    def replace_field(match):
        whitespace = match.group(1)
        field_name = match.group(2)
        delimiter = match.group(3)
        camel_field = snake_to_camel(field_name)
        return f"{whitespace}{camel_field}{delimiter}"
    
    transformed_schema = field_pattern.sub(replace_field, schema_string)
    arg_pattern = re.compile(r'\(\s*([a-z][a-z0-9_]+)(\s*:)')
    
    def replace_arg(match):
        arg_name = match.group(1)
        delimiter = match.group(2)
        camel_arg = snake_to_camel(arg_name)
        return f"({camel_arg}{delimiter}"
    
    transformed_schema = arg_pattern.sub(replace_arg, transformed_schema)
    input_field_pattern = re.compile(r'(input\s+[A-Za-z0-9_]+\s*\{[^}]*?)([a-z][a-z0-9_]+)(\s*:)')
    
    def replace_input_field(match):
        prefix = match.group(1)
        field_name = match.group(2)
        delimiter = match.group(3)
        camel_field = snake_to_camel(field_name)
        return f"{prefix}{camel_field}{delimiter}"
    while re.search(input_field_pattern, transformed_schema):
        transformed_schema = input_field_pattern.sub(replace_input_field, transformed_schema)
    return transformed_schema

def load_and_transform_schema(schema_path=None):
    if schema_path is None:
        current_dir = Path(__file__).parent
        app_dir = current_dir.parent
        project_root = app_dir.parent.parent
        schema_path = project_root / 'libs' / 'graphql' / 'src' / 'schemas' / 'schema.graphql'
        if not schema_path.exists():
            potential_paths = [
                project_root / 'schema.graphql',
                app_dir / 'schema.graphql',
                current_dir / 'schema.graphql',
            ]
            for path in potential_paths:
                if path.exists():
                    schema_path = path
                    break

    if not Path(schema_path).exists():
        raise FileNotFoundError(f"Схема GraphQL не найдена по пути: {schema_path}")
    with open(schema_path, 'r', encoding='utf-8') as f:
        schema_string = f.read()
    transformed_schema = transform_field_names(schema_string)
    return transformed_schema