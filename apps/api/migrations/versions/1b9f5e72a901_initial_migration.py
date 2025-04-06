# apps/api/migrations/versions/1b9f5e72a901_initial_migration.py
"""Initial migration

Revision ID: 1b9f5e72a901
Revises: 
Create Date: 2025-03-26 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import uuid
import os

revision = '1b9f5e72a901'
down_revision = None
branch_labels = None
depends_on = None

is_sqlite = os.environ.get('DATABASE_URL', '').startswith('sqlite:')


def upgrade() -> None:
    uuid_type = sa.String(36) if is_sqlite else postgresql.UUID(as_uuid=True)
    default_uuid = lambda: str(uuid.uuid4()) if is_sqlite else uuid.uuid4

    if is_sqlite:
        contractstatus_type = sa.String(10)
        invoicestatus_type = sa.String(10)
        transactiontype_type = sa.String(20)
        debtdirection_type = sa.String(10)
        debtdimension_type = sa.String(20)
        contractstatus_check = sa.CheckConstraint(
            "status IN ('ACTIVE', 'INACTIVE')", 
            name="ck_contracts_status"
        )
        invoicestatus_check = sa.CheckConstraint(
            "status IN ('CREATED', 'PROCESSED', 'CLOSED')", 
            name="ck_invoices_status"
        )
        transactiontype_check = sa.CheckConstraint(
            "type IN ('CLIENT_DEBT', 'SUPPLIER_DEBT', 'CLIENT_PAYMENT', 'SUPPLIER_PAYMENT')", 
            name="ck_transactions_type"
        )
        debtdirection_check = sa.CheckConstraint(
            "direction IN ('DEBIT', 'CREDIT')", 
            name="ck_debt_movements_direction"
        )
        debtdimension_check = sa.CheckConstraint(
            "dimension IN ('CLIENT_DEBT', 'SUPPLIER_DEBT')", 
            name="ck_debt_movements_dimension"
        )
    else:
        contractstatus_type = sa.Enum('ACTIVE', 'INACTIVE', name='contractstatus')
        invoicestatus_type = sa.Enum('CREATED', 'PROCESSED', 'CLOSED', name='invoicestatus')
        transactiontype_type = sa.Enum('CLIENT_DEBT', 'SUPPLIER_DEBT', 'CLIENT_PAYMENT', 'SUPPLIER_PAYMENT', name='transactiontype')
        debtdirection_type = sa.Enum('DEBIT', 'CREDIT', name='debtdirection')
        debtdimension_type = sa.Enum('CLIENT_DEBT', 'SUPPLIER_DEBT', name='debtdimension')
        contractstatus_check = None
        invoicestatus_check = None
        transactiontype_check = None
        debtdirection_check = None
        debtdimension_check = None
    
    op.create_table('clients',
        sa.Column('id', uuid_type, nullable=False, default=default_uuid),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('contact_person', sa.String(), nullable=True),
        sa.Column('phone', sa.String(), nullable=True),
        sa.Column('email', sa.String(), nullable=True),
        sa.Column('address', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.PrimaryKeyConstraint('id')
    )
    
    op.create_table('materials',
        sa.Column('id', uuid_type, nullable=False, default=default_uuid),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('unit', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.PrimaryKeyConstraint('id')
    )
    
    op.create_table('suppliers',
        sa.Column('id', uuid_type, nullable=False, default=default_uuid),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('contact_person', sa.String(), nullable=True),
        sa.Column('phone', sa.String(), nullable=True),
        sa.Column('email', sa.String(), nullable=True),
        sa.Column('address', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.PrimaryKeyConstraint('id')
    )
    
    contract_table = op.create_table('contracts',
        sa.Column('id', uuid_type, nullable=False, default=default_uuid),
        sa.Column('client_id', uuid_type, nullable=False),
        sa.Column('number', sa.String(), nullable=False),
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('markup_percentage', sa.Float(), nullable=False, server_default='0.0'),
        sa.Column('status', contractstatus_type, nullable=False, server_default='ACTIVE'),
        sa.Column('expiration_date', sa.Date(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    
    if is_sqlite and contractstatus_check:
        op.create_check_constraint(
            contractstatus_check.name,
            'contracts',
            contractstatus_check.sqltext
        )
    
    invoice_table = op.create_table('invoices',
        sa.Column('id', uuid_type, nullable=False, default=default_uuid),
        sa.Column('number', sa.String(), nullable=False),
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('client_id', uuid_type, nullable=False),
        sa.Column('supplier_id', uuid_type, nullable=False),
        sa.Column('contract_id', uuid_type, nullable=False),
        sa.Column('total_amount', sa.Float(), nullable=False, server_default='0.0'),
        sa.Column('total_with_markup', sa.Float(), nullable=False, server_default='0.0'),
        sa.Column('status', invoicestatus_type, nullable=False, server_default='CREATED'),
        sa.Column('created_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
        sa.ForeignKeyConstraint(['contract_id'], ['contracts.id'], ),
        sa.ForeignKeyConstraint(['supplier_id'], ['suppliers.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    if is_sqlite and invoicestatus_check:
        op.create_check_constraint(
            invoicestatus_check.name,
            'invoices',
            invoicestatus_check.sqltext
        )
    
    op.create_table('invoice_items',
        sa.Column('id', uuid_type, nullable=False, default=default_uuid),
        sa.Column('invoice_id', uuid_type, nullable=False),
        sa.Column('material_id', uuid_type, nullable=False),
        sa.Column('quantity', sa.Float(), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('amount_with_markup', sa.Float(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.ForeignKeyConstraint(['invoice_id'], ['invoices.id'], ),
        sa.ForeignKeyConstraint(['material_id'], ['materials.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    
    transaction_table = op.create_table('transactions',
        sa.Column('id', uuid_type, nullable=False, default=default_uuid),
        sa.Column('invoice_id', uuid_type, nullable=True),
        sa.Column('client_id', uuid_type, nullable=True),
        sa.Column('supplier_id', uuid_type, nullable=True),
        sa.Column('type', transactiontype_type, nullable=False),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
        sa.ForeignKeyConstraint(['invoice_id'], ['invoices.id'], ),
        sa.ForeignKeyConstraint(['supplier_id'], ['suppliers.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    
    if is_sqlite and transactiontype_check:
        op.create_check_constraint(
            transactiontype_check.name,
            'transactions',
            transactiontype_check.sqltext
        )
    
    debt_movement_table = op.create_table('debt_movements',
        sa.Column('id', uuid_type, nullable=False, default=default_uuid),
        sa.Column('period', sa.DateTime(), nullable=False),
        sa.Column('document_id', uuid_type, nullable=False),
        sa.Column('document_type', sa.String(), nullable=False),
        sa.Column('client_id', uuid_type, nullable=True),
        sa.Column('supplier_id', uuid_type, nullable=True),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('direction', debtdirection_type, nullable=False),
        sa.Column('dimension', debtdimension_type, nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False, 
                 server_default=sa.func.current_timestamp()),
        sa.Column('invoice_id', uuid_type, nullable=True),
        sa.Column('transaction_id', uuid_type, nullable=True),
        sa.ForeignKeyConstraint(['client_id'], ['clients.id'], ),
        sa.ForeignKeyConstraint(['invoice_id'], ['invoices.id'], ),
        sa.ForeignKeyConstraint(['supplier_id'], ['suppliers.id'], ),
        sa.ForeignKeyConstraint(['transaction_id'], ['transactions.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    if is_sqlite:
        if debtdirection_check:
            op.create_check_constraint(
                debtdirection_check.name,
                'debt_movements',
                debtdirection_check.sqltext
            )
        if debtdimension_check:
            op.create_check_constraint(
                debtdimension_check.name,
                'debt_movements',
                debtdimension_check.sqltext
            )
 
    op.create_index(op.f('ix_clients_name'), 'clients', ['name'], unique=False)
    op.create_index(op.f('ix_suppliers_name'), 'suppliers', ['name'], unique=False)
    op.create_index(op.f('ix_materials_name'), 'materials', ['name'], unique=False)
    op.create_index(op.f('ix_contracts_client_id'), 'contracts', ['client_id'], unique=False)
    op.create_index(op.f('ix_contracts_number'), 'contracts', ['number'], unique=False)
    op.create_index(op.f('ix_invoices_client_id'), 'invoices', ['client_id'], unique=False)
    op.create_index(op.f('ix_invoices_supplier_id'), 'invoices', ['supplier_id'], unique=False)
    op.create_index(op.f('ix_invoices_contract_id'), 'invoices', ['contract_id'], unique=False)
    op.create_index(op.f('ix_invoices_number'), 'invoices', ['number'], unique=False)
    op.create_index(op.f('ix_invoice_items_invoice_id'), 'invoice_items', ['invoice_id'], unique=False)
    op.create_index(op.f('ix_transactions_client_id'), 'transactions', ['client_id'], unique=False)
    op.create_index(op.f('ix_transactions_supplier_id'), 'transactions', ['supplier_id'], unique=False)
    op.create_index(op.f('ix_transactions_invoice_id'), 'transactions', ['invoice_id'], unique=False)
    op.create_index(op.f('ix_debt_movements_client_id'), 'debt_movements', ['client_id'], unique=False)
    op.create_index(op.f('ix_debt_movements_supplier_id'), 'debt_movements', ['supplier_id'], unique=False)
    op.create_index(op.f('ix_debt_movements_dimension'), 'debt_movements', ['dimension'], unique=False)
    op.create_index(op.f('ix_debt_movements_period'), 'debt_movements', ['period'], unique=False)
    
    if not is_sqlite:
        op.execute("""
        CREATE OR REPLACE VIEW debt_balances_view AS
        SELECT 
            uuid_generate_v4() as id,
            client_id,
            supplier_id,
            dimension,
            (SUM(CASE WHEN direction = 'DEBIT' THEN amount ELSE 0 END) - 
             SUM(CASE WHEN direction = 'CREDIT' THEN amount ELSE 0 END)) as balance,
            NOW() as as_of_date
        FROM 
            debt_movements
        GROUP BY 
            client_id, supplier_id, dimension;
        """)
    else:
        op.execute("""
        CREATE VIEW IF NOT EXISTS debt_balances_view AS
        SELECT 
            hex(randomblob(16)) as id,
            client_id,
            supplier_id,
            dimension,
            (SUM(CASE WHEN direction = 'DEBIT' THEN amount ELSE 0 END) - 
             SUM(CASE WHEN direction = 'CREDIT' THEN amount ELSE 0 END)) as balance,
            datetime('now') as as_of_date
        FROM 
            debt_movements
        GROUP BY 
            client_id, supplier_id, dimension;
        """)

def downgrade() -> None:
    is_sqlite = os.environ.get('DATABASE_URL', '').startswith('sqlite:')
    if is_sqlite:
        op.execute("DROP VIEW IF EXISTS debt_balances_view")
    else:
        op.execute("DROP VIEW IF EXISTS debt_balances_view")

    op.drop_index(op.f('ix_debt_movements_period'), table_name='debt_movements')
    op.drop_index(op.f('ix_debt_movements_dimension'), table_name='debt_movements')
    op.drop_index(op.f('ix_debt_movements_supplier_id'), table_name='debt_movements')
    op.drop_index(op.f('ix_debt_movements_client_id'), table_name='debt_movements')
    op.drop_index(op.f('ix_transactions_invoice_id'), table_name='transactions')
    op.drop_index(op.f('ix_transactions_supplier_id'), table_name='transactions')
    op.drop_index(op.f('ix_transactions_client_id'), table_name='transactions')
    op.drop_index(op.f('ix_invoice_items_invoice_id'), table_name='invoice_items')
    op.drop_index(op.f('ix_invoices_number'), table_name='invoices')
    op.drop_index(op.f('ix_invoices_contract_id'), table_name='invoices')
    op.drop_index(op.f('ix_invoices_supplier_id'), table_name='invoices')
    op.drop_index(op.f('ix_invoices_client_id'), table_name='invoices')
    op.drop_index(op.f('ix_contracts_number'), table_name='contracts')
    op.drop_index(op.f('ix_contracts_client_id'), table_name='contracts')
    op.drop_index(op.f('ix_materials_name'), table_name='materials')
    op.drop_index(op.f('ix_suppliers_name'), table_name='suppliers')
    op.drop_index(op.f('ix_clients_name'), table_name='clients')
    op.drop_table('debt_movements')
    op.drop_table('transactions')
    op.drop_table('invoice_items')
    op.drop_table('invoices')
    op.drop_table('contracts')
    op.drop_table('suppliers')
    op.drop_table('materials')
    op.drop_table('clients')

    if not is_sqlite:
        op.execute("DROP TYPE IF EXISTS debtdimension")
        op.execute("DROP TYPE IF EXISTS debtdirection")
        op.execute("DROP TYPE IF EXISTS transactiontype")
        op.execute("DROP TYPE IF EXISTS invoicestatus")
        op.execute("DROP TYPE IF EXISTS contractstatus")
