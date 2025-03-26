# app/graphql/resolvers/materials.py
from ...database.repositories import MaterialRepository

# Резолверы для запросов
def get_materials_resolver(obj, info, **kwargs):
    # Получаем сессию БД из контекста
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    
    # Получаем аргументы
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    search = kwargs.get('search', None)
    
    # Получаем материалы
    materials = material_repo.get_all(skip=skip, limit=limit, search=search)
    
    return materials

def get_material_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    
    # Получаем материал по ID
    material = material_repo.get_by_id(id)
    
    return material

# Резолверы для мутаций
def create_material_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    
    # Создаем материал
    material = material_repo.create(input)
    
    return {"material": material}

def update_material_resolver(obj, info, id, input, **kwargs):
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    
    # Обновляем материал
    material = material_repo.update(id, input)
    
    if not material:
        raise Exception(f"Материал с ID {id} не найден")
    
    return {"material": material}

def delete_material_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    
    # Удаляем материал
    success = material_repo.delete(id)
    
    if not success:
        raise Exception(f"Материал с ID {id} не найден")
    
    return {"success": success}

# Регистрация резолверов
def register_materials_resolvers(query, mutation):
    # Резолверы для запросов
    query.set_field("materials", get_materials_resolver)
    query.set_field("material", get_material_resolver)
    
    # Резолверы для мутаций
    mutation.set_field("createMaterial", create_material_resolver)
    mutation.set_field("updateMaterial", update_material_resolver)
    mutation.set_field("deleteMaterial", delete_material_resolver)