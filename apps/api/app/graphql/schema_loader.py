# app/graphql/schema_loader.py
import os
import io
import sys
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

def load_schema_from_path(schema_path: str) -> str:
    try:
        with open(schema_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        return None

def load_all_schemas():
    current_dir = Path(__file__).parent
    api_root = current_dir.parent.parent  
    project_root = api_root.parent.parent 
    schema_path = project_root / 'libs' / 'graphql' / 'src' / 'schemas' / 'schema.graphql'
    if os.path.exists(schema_path):
        schema = load_schema_from_path(str(schema_path))
        if schema:
            return schema
    fallback_paths = [
        project_root / 'schema.graphql',                        
        api_root / 'schema.graphql',                            
        project_root / 'libs' / 'graphql' / 'schema.graphql',  
    ]
    for path in fallback_paths:
        print(f"Checking fallback location: {path}")
        if os.path.exists(path):
            print(f"Found schema at fallback location: {path}")
            schema = load_schema_from_path(str(path))
            if schema:
                return schema 
    try:
        os.makedirs(os.path.dirname(schema_path), exist_ok=True)
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
  contact_person: String
  phone: String
  email: String
  address: String
}

type Supplier {
  id: ID!
  name: String!
  contact_person: String
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
  contact_person: String
  phone: String
  email: String
  address: String
}

input UpdateClientInput {
  name: String
  contact_person: String
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
  contact_person: String
  phone: String
  email: String
  address: String
}

input UpdateSupplierInput {
  name: String
  contact_person: String
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
        
        with open(schema_path, 'w', encoding='utf-8') as f:
            f.write(basic_schema)
        return basic_schema
        
    except Exception as e:
        fallback_schema = """
        type Query {
          hello: String
        }
        """
        return fallback_schema