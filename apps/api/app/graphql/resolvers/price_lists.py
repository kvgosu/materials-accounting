# app/graphql/resolvers/price_lists.py
from datetime import datetime, date
from typing import List, Optional, Dict, Any, Union
import base64
import uuid
import os
import tempfile
from flask import current_app, url_for
from ...database.repositories import (
    SupplierPriceListRepository,
    PriceListItemRepository,
    MaterialRepository,
    SupplierRepository
)
from ...database.models import SupplierPriceList, PriceListItem
from ...services.price_list_service import PriceListService

def parse_date(date_string):
    if not date_string:
        return None
    try:
        return datetime.fromisoformat(date_string).date()
    except ValueError:
        try:
            return datetime.strptime(date_string, "%Y-%m-%d").date()
        except ValueError:
            return None

def get_price_lists_resolver(obj, info, **kwargs):
    db = info.context["db"]
    price_list_repo = SupplierPriceListRepository(db)
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    supplier_id = kwargs.get('supplier_id', None)
    is_active = kwargs.get('is_active', None)
    date_from = kwargs.get('date_from', None)
    date_to = kwargs.get('date_to', None)
    date_from_obj = parse_date(date_from)
    date_to_obj = parse_date(date_to)
    price_lists = price_list_repo.get_all(
        skip=skip, 
        limit=limit, 
        supplier_id=supplier_id,
        is_active=is_active,
        date_from=date_from_obj,
        date_to=date_to_obj
    )
    return price_lists

def get_price_list_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    price_list_repo = SupplierPriceListRepository(db)
    price_list = price_list_repo.get_by_id(id)
    return price_list

def get_price_list_items_resolver(obj, info, price_list_id, **kwargs):
    db = info.context["db"]
    item_repo = PriceListItemRepository(db)
    skip = kwargs.get('skip', 0)
    limit = kwargs.get('limit', 100)
    search = kwargs.get('search', None)
    items = item_repo.get_by_price_list(
        price_list_id=price_list_id,
        skip=skip,
        limit=limit,
        search=search
    )
    return items

def resolve_price_list_supplier(price_list, info):
    db = info.context["db"]
    supplier_repo = SupplierRepository(db)
    return supplier_repo.get_by_id(price_list.supplier_id)

def resolve_price_list_items(price_list, info):
    db = info.context["db"]
    item_repo = PriceListItemRepository(db)
    return item_repo.get_by_price_list(price_list.id)

def get_current_material_price_resolver(obj, info, material_id, supplier_id, **kwargs):
    db = info.context["db"]
    item_repo = PriceListItemRepository(db)
    material_repo = MaterialRepository(db)
    supplier_repo = SupplierRepository(db)
    material = material_repo.get_by_id(material_id)
    if not material:
        raise Exception(f"Материал с ID {material_id} не найден")
    supplier = supplier_repo.get_by_id(supplier_id)
    if not supplier:
        raise Exception(f"Поставщик с ID {supplier_id} не найден")
    item = item_repo.get_current_price_for_material(material_id, supplier_id)
    return item

def resolve_price_list_item_price_list(item, info):
    db = info.context["db"]
    price_list_repo = SupplierPriceListRepository(db)
    return price_list_repo.get_by_id(item.price_list_id)

def resolve_price_list_item_material(item, info):
    if not item.material_id:
        return None    
    db = info.context["db"]
    material_repo = MaterialRepository(db)
    return material_repo.get_by_id(item.material_id)

def resolve_supplier_price_lists(supplier, info):
    db = info.context["db"]
    price_list_repo = SupplierPriceListRepository(db)
    return price_list_repo.get_all(supplier_id=supplier.id, limit=100)

def resolve_supplier_latest_price_list(supplier, info):
    db = info.context["db"]
    price_list_repo = SupplierPriceListRepository(db)
    return price_list_repo.get_latest_for_supplier(supplier.id)

def upload_price_list_resolver(obj, info, input, **kwargs):
    db = info.context["db"]
    price_list_service = PriceListService(db)
    supplier_id = input.get('supplier_id')
    date_str = input.get('date')
    file_data = input.get('file')
    if isinstance(file_data, dict) and 'data' in file_data and 'name' in file_data:
        try:
            file_contents = base64.b64decode(file_data['data'])
            file_name = file_data['name']
            result = price_list_service.process_price_list(
                supplier_id=supplier_id,
                date_str=date_str,
                file_data=file_contents,
                file_name=file_name
            )
            price_list = price_list_service.price_list_repo.get_by_id(result['price_list_id'])
            return {
                'price_list': price_list,
                'processed_items': result['processed_items'],
                'skipped_items': 0
            }
        except Exception as e:
            current_app.logger.error(f"Ошибка при загрузке прайс-листа: {str(e)}")
            raise Exception(f"Ошибка при загрузке прайс-листа: {str(e)}")
    else:
        raise Exception("Неверный формат данных файла")

def deactivate_price_list_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    price_list_service = PriceListService(db)
    success = price_list_service.deactivate_price_list(id)
    return {"success": success}

def activate_price_list_resolver(obj, info, id, **kwargs):
    db = info.context["db"]
    price_list_service = PriceListService(db)
    success = price_list_service.activate_price_list(id)
    return {"success": success}

def generate_template_resolver(obj, info, supplier_id, **kwargs):
    db = info.context["db"]
    price_list_service = PriceListService(db)
    try:
        template_bytes = price_list_service.create_template(supplier_id)
        temp_dir = current_app.config.get('TEMP_FOLDER', tempfile.gettempdir())
        os.makedirs(temp_dir, exist_ok=True)
        filename = f"template_{supplier_id}_{uuid.uuid4()}.xlsx"
        file_path = os.path.join(temp_dir, filename)
        with open(file_path, 'wb') as f:
            f.write(template_bytes)
        download_url = url_for('template.download_template', filename=filename, _external=True)
        return {"download_url": download_url}
    except Exception as e:
        current_app.logger.error(f"Ошибка при генерации шаблона: {str(e)}")
        raise Exception(f"Ошибка при генерации шаблона: {str(e)}")

def link_price_list_item_to_material_resolver(obj, info, item_id, material_id, **kwargs):
    db = info.context["db"]
    price_list_service = PriceListService(db)
    success = price_list_service.link_item_to_material(item_id, material_id)
    if not success:
        raise Exception(f"Не удалось связать позицию с материалом")
    item = price_list_service.price_list_item_repo.get_by_id(item_id)
    material = price_list_service.material_repo.get_by_id(material_id)
    return {"item": item, "material": material}

def update_price_list_item_resolver(obj, info, item_id, input, **kwargs):
    db = info.context["db"]
    price_list_service = PriceListService(db)
    updated_item = price_list_service.update_price_list_item(item_id, input)
    item = price_list_service.price_list_item_repo.get_by_id(item_id)
    return {"item": item}

def register_price_lists_resolvers(query, mutation, type_defs):
    query.set_field("price_lists", get_price_lists_resolver)
    query.set_field("price_list", get_price_list_resolver)
    query.set_field("price_list_items", get_price_list_items_resolver)
    query.set_field("current_material_price", get_current_material_price_resolver)
    price_list_type = type_defs["SupplierPriceList"]
    price_list_type.set_field("supplier", resolve_price_list_supplier)
    price_list_type.set_field("items", resolve_price_list_items)
    price_list_item_type = type_defs["PriceListItem"]
    price_list_item_type.set_field("price_list", resolve_price_list_item_price_list)
    price_list_item_type.set_field("material", resolve_price_list_item_material)
    supplier_type = type_defs["Supplier"]
    supplier_type.set_field("price_lists", resolve_supplier_price_lists)
    supplier_type.set_field("latest_price_list", resolve_supplier_latest_price_list)
    mutation.set_field("upload_price_list", upload_price_list_resolver)
    mutation.set_field("deactivate_price_list", deactivate_price_list_resolver)
    mutation.set_field("activate_price_list", activate_price_list_resolver)
    mutation.set_field("generate_template", generate_template_resolver)
    mutation.set_field("link_price_list_item_to_material", link_price_list_item_to_material_resolver)
    mutation.set_field("update_price_list_item", update_price_list_item_resolver)