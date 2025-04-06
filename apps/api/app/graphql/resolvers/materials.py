# app/graphql/resolvers/materials.py
from ...database.repositories import MaterialRepository

def get_materials_resolver(obj, info, **kwargs):
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    search = kwargs.get('search', None)
    materials = material_repo.get_all(skip=skip, limit=limit, search=search)
    return materials

def get_material_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    material = material_repo.get_by_id(id)
    print(f"DEBUG: Результат material_repo.get_by_id: {material}")
    return material

def create_material_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    material = material_repo.create(input)
    return {"material": material}

def update_material_resolver(obj, info, id, input, **kwargs):
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    material = material_repo.update(id, input)
    if not material:
        raise Exception(f"Материал с ID {id} не найден")
    return {"material": material}

def delete_material_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    success = material_repo.delete(id)
    if not success:
        raise Exception(f"Материал с ID {id} не найден")
    return {"success": success}

def register_materials_resolvers(query, mutation):
    query.set_field("materials", get_materials_resolver)
    query.set_field("material", get_material_resolver)
    mutation.set_field("create_material", create_material_resolver)
    mutation.set_field("update_material", update_material_resolver)
    mutation.set_field("delete_material", delete_material_resolver)