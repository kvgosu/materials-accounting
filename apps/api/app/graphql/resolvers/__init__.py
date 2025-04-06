# app/graphql/resolvers/__init__.py
from ariadne import QueryType, MutationType, ObjectType

query = QueryType()
mutation = MutationType()

type_defs = {
    "Client": ObjectType("Client"),
    "Supplier": ObjectType("Supplier"),
    "Material": ObjectType("Material"),
    "Contract": ObjectType("Contract"),
    "Invoice": ObjectType("Invoice"),
    "InvoiceItem": ObjectType("InvoiceItem"),
    "Transaction": ObjectType("Transaction"),
    "DebtMovement": ObjectType("DebtMovement"),
    "DebtBalance": ObjectType("DebtBalance"),
    "DebtTurnover": ObjectType("DebtTurnover"),
    "SupplierPriceList": ObjectType("SupplierPriceList"),
    "PriceListItem": ObjectType("PriceListItem")
}

type_resolvers = type_defs

from .clients import register_clients_resolvers
from .suppliers import register_suppliers_resolvers
from .materials import register_materials_resolvers
from .contracts import register_contracts_resolvers
from .invoices import register_invoices_resolvers
from .transactions import register_transactions_resolvers
from .debt_movements import register_debt_movements_resolvers
from .dashboard import register_dashboard_resolvers
from .price_lists import register_price_lists_resolvers

register_clients_resolvers(query, mutation)
register_suppliers_resolvers(query, mutation)
register_materials_resolvers(query, mutation)
register_contracts_resolvers(query, mutation, type_defs)
register_invoices_resolvers(query, mutation, type_defs)
register_transactions_resolvers(query, mutation, type_defs)
register_debt_movements_resolvers(query, mutation, type_defs)
register_dashboard_resolvers(query, mutation, type_defs)
register_price_lists_resolvers(query, mutation, type_defs)

__all__ = ['query', 'mutation', 'type_defs', 'type_resolvers']