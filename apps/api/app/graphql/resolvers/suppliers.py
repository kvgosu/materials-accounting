# app/graphql/resolvers/suppliers.py
from ...database.repositories import SupplierRepository

# Резолверы для запросов
def get_suppliers_resolver(obj, info, **kwargs):
    # Получаем сессию БД из контекста
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    
    # Получаем аргументы
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    search = kwargs.get('search', None)
    
    # Получаем поставщиков
    suppliers = supplier_repo.get_all(skip=skip, limit=limit, search=search)
    
    return suppliers

def get_supplier_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    
    # Получаем поставщика по ID
    supplier = supplier_repo.get_by_id(id)
    
    return supplier

# Резолверы для мутаций
def create_supplier_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    
    # Создаем поставщика
    supplier = supplier_repo.create(input)
    
    return {"supplier": supplier}

def update_supplier_resolver(obj, info, id, input, **kwargs):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    
    # Обновляем поставщика
    supplier = supplier_repo.update(id, input)
    
    if not supplier:
        raise Exception(f"Поставщик с ID {id} не найден")
    
    return {"supplier": supplier}

def delete_supplier_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    
    # Удаляем поставщика
    success = supplier_repo.delete(id)
    
    if not success:
        raise Exception(f"Поставщик с ID {id} не найден")
    
    return {"success": success}

# Регистрация резолверов
def register_suppliers_resolvers(query, mutation):
    # Резолверы для запросов
    query.set_field("suppliers", get_suppliers_resolver)
    query.set_field("supplier", get_supplier_resolver)
    
    # Резолверы для мутаций
    mutation.set_field("createSupplier", create_supplier_resolver)
    mutation.set_field("updateSupplier", update_supplier_resolver)
    mutation.set_field("deleteSupplier", delete_supplier_resolver)