# app/graphql/scalars.py
import base64
import json
from ariadne import ScalarType

upload_scalar = ScalarType("Upload")

@upload_scalar.serializer
def serialize_upload(value):
    if hasattr(value, 'read'):
        return getattr(value, 'name', 'unknown')
    return str(value)

@upload_scalar.value_parser
def parse_upload_value(value):
    if isinstance(value, str):
        try:
            json_value = json.loads(value)
            if isinstance(json_value, dict) and 'data' in json_value and 'name' in json_value:
                return json_value
        except json.JSONDecodeError:
            pass
        try:
            data = base64.b64decode(value)
            return {'data': value, 'name': 'uploaded_file.xlsx'}
        except:
            pass
    return value

@upload_scalar.literal_parser
def parse_upload_literal(ast):
    return None 