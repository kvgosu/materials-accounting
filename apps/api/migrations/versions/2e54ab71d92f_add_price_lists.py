# apps/api/migrations/versions/2e54ab71d92f_add_price_lists.py
"""Add price lists tables

Revision ID: 2e54ab71d92f
Revises: 1b9f5e72a901
Create Date: 2025-04-04 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import uuid
import os

revision = '2e54ab71d92f'
down_revision = '1b9f5e72a901'
branch_labels = None
depends_on = None

is_sqlite = os.environ.get('DATABASE_URL', '').startswith('sqlite:')

def upgrade() -> None:
    uuid_type = sa.String(36) if is_sqlite else postgresql.UUID(as_uuid=True)
    default_uuid = lambda: str(uuid.uuid4()) if is_sqlite else uuid.uuid4
    op.create_table('supplier_price_lists',
        sa.Column('id', uuid_type, nullable=False, primary_key=True, default=default_uuid),
        sa.Column('supplier_id', uuid_type, nullable=False),
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('file_name', sa.String(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='1'),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.func.current_timestamp()),
        sa.ForeignKeyConstraint(['supplier_id'], ['suppliers.id'], ondelete='CASCADE'),
    )
    op.create_table('price_list_items',
        sa.Column('id', uuid_type, nullable=False, primary_key=True, default=default_uuid),
        sa.Column('price_list_id', uuid_type, nullable=False),
        sa.Column('supplier_code', sa.String(), nullable=True),
        sa.Column('barcode', sa.String(), nullable=True),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('article', sa.String(), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('vat_rate', sa.Float(), nullable=False, server_default='20.0'),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('availability', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('material_id', uuid_type, nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.func.current_timestamp()),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.func.current_timestamp()),
        sa.ForeignKeyConstraint(['price_list_id'], ['supplier_price_lists.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['material_id'], ['materials.id'], ),
    )
    op.create_index(op.f('ix_supplier_price_lists_supplier_id'), 'supplier_price_lists', ['supplier_id'], unique=False)
    op.create_index(op.f('ix_supplier_price_lists_date'), 'supplier_price_lists', ['date'], unique=False)
    op.create_index(op.f('ix_supplier_price_lists_is_active'), 'supplier_price_lists', ['is_active'], unique=False)
    op.create_index(op.f('ix_price_list_items_price_list_id'), 'price_list_items', ['price_list_id'], unique=False)
    op.create_index(op.f('ix_price_list_items_name'), 'price_list_items', ['name'], unique=False)
    op.create_index(op.f('ix_price_list_items_material_id'), 'price_list_items', ['material_id'], unique=False)
    op.create_index(op.f('ix_price_list_items_supplier_code'), 'price_list_items', ['supplier_code'], unique=False)
    op.create_index(op.f('ix_price_list_items_barcode'), 'price_list_items', ['barcode'], unique=False)
    op.create_index(op.f('ix_price_list_items_article'), 'price_list_items', ['article'], unique=False)

def downgrade() -> None:
    op.drop_index(op.f('ix_price_list_items_article'), table_name='price_list_items')
    op.drop_index(op.f('ix_price_list_items_barcode'), table_name='price_list_items')
    op.drop_index(op.f('ix_price_list_items_supplier_code'), table_name='price_list_items')
    op.drop_index(op.f('ix_price_list_items_material_id'), table_name='price_list_items')
    op.drop_index(op.f('ix_price_list_items_name'), table_name='price_list_items')
    op.drop_index(op.f('ix_price_list_items_price_list_id'), table_name='price_list_items')
    op.drop_index(op.f('ix_supplier_price_lists_is_active'), table_name='supplier_price_lists')
    op.drop_index(op.f('ix_supplier_price_lists_date'), table_name='supplier_price_lists')
    op.drop_index(op.f('ix_supplier_price_lists_supplier_id'), table_name='supplier_price_lists')
    op.drop_table('price_list_items')
    op.drop_table('supplier_price_lists')