# app/graphql/schema_loader.py
import os
import io
import sys
from pathlib import Path

# Настраиваем кодировку консоли для поддержки Unicode в Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

def load_schema_from_path(schema_path: str) -> str:
    """Загружает GraphQL схему из указанного пути."""
    try:
        with open(schema_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        print(f"Error loading schema from {schema_path}: {str(e)}")
        return None

def load_all_schemas():
    """
    Загружает GraphQL схему из монорепозитория NX, где схема находится в libs/graphql/src/schemas/schema.graphql
    """
    # Текущая директория модуля
    current_dir = Path(__file__).parent
    
    # Получаем корень проекта (materials-accounting)
    # Предполагаем, что мы находимся в apps/api/app/graphql
    api_root = current_dir.parent.parent  # app
    project_root = api_root.parent.parent  # materials-accounting
    
    # Формируем путь к схеме в libs/graphql/src/schemas
    schema_path = project_root / 'libs' / 'graphql' / 'src' / 'schemas' / 'schema.graphql'
    
    print(f"Looking for GraphQL schema at: {schema_path}")
    
    if os.path.exists(schema_path):
        print(f"Found schema at: {schema_path}")
        schema = load_schema_from_path(str(schema_path))
        if schema:
            return schema
    
    # Если схема не найдена в основном месте, проверяем другие возможные места
    fallback_paths = [
        project_root / 'schema.graphql',                        # Корень проекта
        api_root / 'schema.graphql',                            # Корень api
        project_root / 'libs' / 'graphql' / 'schema.graphql',   # Корень библиотеки graphql
    ]
    
    for path in fallback_paths:
        print(f"Checking fallback location: {path}")
        if os.path.exists(path):
            print(f"Found schema at fallback location: {path}")
            schema = load_schema_from_path(str(path))
            if schema:
                return schema
    
    # Если схема все еще не найдена, создаем ее в правильном месте
    print(f"Schema not found. Creating directory structure and basic schema at: {schema_path}")
    
    try:
        # Создаем директории если нужно
        os.makedirs(os.path.dirname(schema_path), exist_ok=True)
        
        # Базовая схема для начала работы
        basic_schema = """type Query {
  # Клиенты
  clients(skip: Int, limit: Int, search: String): [Client!]!
  client(id: ID!): Client
  
  # Поставщики
  suppliers(skip: Int, limit: Int, search: String): [Supplier!]!
  supplier(id: ID!): Supplier
  
  # Материалы
  materials(skip: Int, limit: Int, search: String): [Material!]!
  material(id: ID!): Material
}

type Client {
  id: ID!
  name: String!
  contactPerson: String
  phone: String
  email: String
  address: String
}

type Supplier {
  id: ID!
  name: String!
  contactPerson: String
  phone: String
  email: String
  address: String
}

type Material {
  id: ID!
  name: String!
  unit: String!
  description: String
}

type Mutation {
  # Клиенты
  createClient(input: CreateClientInput!): CreateClientPayload!
  updateClient(id: ID!, input: UpdateClientInput!): UpdateClientPayload!
  deleteClient(id: ID!): DeleteClientPayload!
  
  # Поставщики
  createSupplier(input: CreateSupplierInput!): CreateSupplierPayload!
  updateSupplier(id: ID!, input: UpdateSupplierInput!): UpdateSupplierPayload!
  deleteSupplier(id: ID!): DeleteSupplierPayload!
  
  # Материалы
  createMaterial(input: CreateMaterialInput!): CreateMaterialPayload!
  updateMaterial(id: ID!, input: UpdateMaterialInput!): UpdateMaterialPayload!
  deleteMaterial(id: ID!): DeleteMaterialPayload!
}

# Входные типы для клиентов
input CreateClientInput {
  name: String!
  contactPerson: String
  phone: String
  email: String
  address: String
}

input UpdateClientInput {
  name: String
  contactPerson: String
  phone: String
  email: String
  address: String
}

type CreateClientPayload {
  client: Client!
}

type UpdateClientPayload {
  client: Client!
}

type DeleteClientPayload {
  success: Boolean!
}

# Входные типы для поставщиков
input CreateSupplierInput {
  name: String!
  contactPerson: String
  phone: String
  email: String
  address: String
}

input UpdateSupplierInput {
  name: String
  contactPerson: String
  phone: String
  email: String
  address: String
}

type CreateSupplierPayload {
  supplier: Supplier!
}

type UpdateSupplierPayload {
  supplier: Supplier!
}

type DeleteSupplierPayload {
  success: Boolean!
}

# Входные типы для материалов
input CreateMaterialInput {
  name: String!
  unit: String!
  description: String
}

input UpdateMaterialInput {
  name: String
  unit: String
  description: String
}

type CreateMaterialPayload {
  material: Material!
}

type UpdateMaterialPayload {
  material: Material!
}

type DeleteMaterialPayload {
  success: Boolean!
}"""
        
        # Записываем схему в файл
        with open(schema_path, 'w', encoding='utf-8') as f:
            f.write(basic_schema)
        
        print(f"Basic schema created at {schema_path}")
        return basic_schema
        
    except Exception as e:
        print(f"Failed to create schema file: {str(e)}")
        
        # Возвращаем базовую схему даже если не удалось создать файл
        fallback_schema = """
        type Query {
          hello: String
        }
        """
        print("Using fallback in-memory schema")
        return fallback_schema