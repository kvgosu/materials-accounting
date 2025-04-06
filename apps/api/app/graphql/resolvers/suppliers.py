# app/graphql/resolvers/suppliers.py
from ...database.repositories import SupplierRepository

def get_suppliers_resolver(obj, info, **kwargs):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    search = kwargs.get('search', None)
    suppliers = supplier_repo.get_all(skip=skip, limit=limit, search=search)
    return suppliers

def get_supplier_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    supplier = supplier_repo.get_by_id(id)
    return supplier

def create_supplier_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    supplier = supplier_repo.create(input)
    return {"supplier": supplier}

def update_supplier_resolver(obj, info, id, input, **kwargs):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    supplier = supplier_repo.update(id, input)
    if not supplier:
        raise Exception(f"Поставщик с ID {id} не найден")
    return {"supplier": supplier}

def delete_supplier_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    success = supplier_repo.delete(id)
    if not success:
        raise Exception(f"Поставщик с ID {id} не найден")
    return {"success": success}

def register_suppliers_resolvers(query, mutation):
    query.set_field("suppliers", get_suppliers_resolver)
    query.set_field("supplier", get_supplier_resolver)
    mutation.set_field("create_supplier", create_supplier_resolver)
    mutation.set_field("update_supplier", update_supplier_resolver)
    mutation.set_field("delete_supplier", delete_supplier_resolver)