# app/database/models.py
from datetime import datetime
from typing import List, Optional
from sqlalchemy import (
    Column, String, Float, Integer, 
    ForeignKey, DateTime, Date, Text, 
    Boolean, Enum, Table, func,
    case, select
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
import enum
import uuid
from .sqlite_helper import UUIDType, get_uuid_column, is_using_sqlite

Base = declarative_base()
class ContractStatus(enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"

    def __str__(self):
        return self.value
    
    @classmethod
    def coerce(cls, value):
        if isinstance(value, cls):
            return value.value
        if isinstance(value, str):
            try:
                return cls[value.upper()].value
            except KeyError:
                raise ValueError(f"Invalid {cls.__name__}: {value}")
        raise ValueError(f"Cannot coerce {value} to {cls.__name__}")
class InvoiceStatus(enum.Enum):
    CREATED = "CREATED"
    PROCESSED = "PROCESSED"
    CLOSED = "CLOSED"

    def __str__(self):
        return self.value

    @classmethod
    def coerce(cls, value):
        if isinstance(value, cls):
            return value.value
        if isinstance(value, str):
            try:
                return cls[value.upper()].value
            except KeyError:
                raise ValueError(f"Invalid {cls.__name__}: {value}")
        raise ValueError(f"Cannot coerce {value} to {cls.__name__}")
class TransactionType(enum.Enum):
    CLIENT_DEBT = "CLIENT_DEBT"
    SUPPLIER_DEBT = "SUPPLIER_DEBT"
    CLIENT_PAYMENT = "CLIENT_PAYMENT"
    SUPPLIER_PAYMENT = "SUPPLIER_PAYMENT"

    def __str__(self):
        return self.value

    @classmethod
    def coerce(cls, value):
        if isinstance(value, cls):
            return value.value
        if isinstance(value, str):
            try:
                return cls[value.upper()].value
            except KeyError:
                raise ValueError(f"Invalid {cls.__name__}: {value}")
        raise ValueError(f"Cannot coerce {value} to {cls.__name__}")
class DebtDimension(enum.Enum):
    CLIENT_DEBT = "CLIENT_DEBT"
    SUPPLIER_DEBT = "SUPPLIER_DEBT"

    def __str__(self):
        return self.value

    @classmethod
    def coerce(cls, value):
        if isinstance(value, cls):
            return value.value
        if isinstance(value, str):
            try:
                return cls[value.upper()].value
            except KeyError:
                raise ValueError(f"Invalid {cls.__name__}: {value}")
        raise ValueError(f"Cannot coerce {value} to {cls.__name__}")
class DebtDirection(enum.Enum):
    DEBIT = "DEBIT"
    CREDIT = "CREDIT"

    def __str__(self):
        return self.value

    @classmethod
    def coerce(cls, value):
        if isinstance(value, cls):
            return value.value
        if isinstance(value, str):
            try:
                return cls[value.upper()].value
            except KeyError:
                raise ValueError(f"Invalid {cls.__name__}: {value}")
        raise ValueError(f"Cannot coerce {value} to {cls.__name__}")   
class BaseModel:
    id = get_uuid_column(primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
class Client(Base, BaseModel):
    __tablename__ = "clients"

    name = Column(String, nullable=False)
    contact_person = Column(String)
    phone = Column(String)
    email = Column(String)
    address = Column(String)
    contracts = relationship("Contract", back_populates="client", cascade="all, delete-orphan")
    invoices = relationship("Invoice", back_populates="client")
    transactions = relationship("Transaction", back_populates="client")
    debt_movements = relationship("DebtMovement", back_populates="client")

    def __repr__(self):
        return f"<Client {self.name}>"
class Supplier(Base, BaseModel):
    __tablename__ = "suppliers"

    name = Column(String, nullable=False)
    contact_person = Column(String)
    phone = Column(String)
    email = Column(String)
    address = Column(String)
    price_lists = relationship("SupplierPriceList", back_populates="supplier", cascade="all, delete-orphan")
    invoices = relationship("Invoice", back_populates="supplier")
    transactions = relationship("Transaction", back_populates="supplier")
    debt_movements = relationship("DebtMovement", back_populates="supplier")

    def __repr__(self):
        return f"<Supplier {self.name}>"
class SupplierPriceList(Base, BaseModel):
    __tablename__ = "supplier_price_lists"

    supplier_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("suppliers.id"), 
        nullable=False
    )
    date = Column(Date, nullable=False)
    file_name = Column(String)
    is_active = Column(Boolean, default=True)
    supplier = relationship("Supplier", back_populates="price_lists")
    items = relationship("PriceListItem", back_populates="price_list", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<SupplierPriceList for {self.supplier.name} on {self.date}>"
class PriceListItem(Base, BaseModel):
    __tablename__ = "price_list_items"

    price_list_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("supplier_price_lists.id", ondelete="CASCADE"), 
        nullable=False
    )
    supplier_code = Column(String)
    barcode = Column(String)
    name = Column(String, nullable=False)
    article = Column(String)
    description = Column(Text)
    vat_rate = Column(Float, default=20.0)
    price = Column(Float, nullable=False)
    availability = Column(Integer, default=0)  
    material_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("materials.id"), 
        nullable=True
    )
    price_list = relationship("SupplierPriceList", back_populates="items")
    material = relationship("Material", backref="price_list_items")

    def __repr__(self):
        return f"<PriceListItem {self.name} - {self.price}>"
class Contract(Base, BaseModel):
    __tablename__ = "contracts"

    client_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("clients.id", ondelete="CASCADE"), 
        nullable=False
    )
    number = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    markup_percentage = Column(Float, nullable=False, default=0.0)
    status = Column(Enum(ContractStatus), nullable=False, default=ContractStatus.ACTIVE)
    expiration_date = Column(Date)
    client = relationship("Client", back_populates="contracts")
    invoices = relationship("Invoice", back_populates="contract")

    def __repr__(self):
        return f"<Contract {self.number} for {self.client.name}>"
class Material(Base, BaseModel):
    __tablename__ = "materials"

    name = Column(String, nullable=False)
    unit = Column(String, nullable=False)
    description = Column(Text)
    invoice_items = relationship("InvoiceItem", back_populates="material")

    def __repr__(self):
        return f"<Material {self.name} ({self.unit})>"
class Invoice(Base, BaseModel):
    __tablename__ = "invoices"

    number = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    client_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("clients.id"), 
        nullable=False
    )
    supplier_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("suppliers.id"), 
        nullable=False
    )
    contract_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("contracts.id"), 
        nullable=False
    )
    total_amount = Column(Float, nullable=False, default=0.0)
    total_with_markup = Column(Float, nullable=False, default=0.0)
    status = Column(Enum(InvoiceStatus), nullable=False, default=InvoiceStatus.CREATED)
    client = relationship("Client", back_populates="invoices")
    supplier = relationship("Supplier", back_populates="invoices")
    contract = relationship("Contract", back_populates="invoices")
    items = relationship("InvoiceItem", back_populates="invoice", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="invoice")
    debt_movements = relationship("DebtMovement", back_populates="invoice")

    def __repr__(self):
        return f"<Invoice {self.number} for {self.client.name} from {self.supplier.name}>"
class InvoiceItem(Base, BaseModel):
    __tablename__ = "invoice_items"

    invoice_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("invoices.id")
    )
    material_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("materials.id")
    )
    quantity = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    amount = Column(Float, nullable=False)
    amount_with_markup = Column(Float, nullable=False)
    invoice = relationship("Invoice", back_populates="items")
    material = relationship("Material", back_populates="invoice_items")

    def __repr__(self):
        return f"<InvoiceItem {self.material.name} for {self.invoice.number}>"
class Transaction(Base, BaseModel):
    __tablename__ = "transactions"

    invoice_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("invoices.id")
    )
    client_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("clients.id")
    )
    supplier_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("suppliers.id")
    )
    type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
    description = Column(Text)
    invoice = relationship("Invoice", back_populates="transactions")
    client = relationship("Client", back_populates="transactions")
    supplier = relationship("Supplier", back_populates="transactions")
    debt_movements = relationship("DebtMovement", back_populates="transaction")

    def __repr__(self):
        return f"<Transaction {self.type.value} {self.amount}>"
class DebtMovement(Base):
    __tablename__ = "debt_movements"

    id = get_uuid_column(primary_key=True)
    period = Column(DateTime, nullable=False)
    document_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        nullable=False
    )
    document_type = Column(String, nullable=False) 
    client_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("clients.id")
    )
    supplier_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("suppliers.id")
    )
    amount = Column(Float, nullable=False)
    direction = Column(Enum(DebtDirection), nullable=False)
    dimension = Column(Enum(DebtDimension), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    invoice_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("invoices.id")
    )
    transaction_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("transactions.id")
    )
    client = relationship("Client", back_populates="debt_movements")
    supplier = relationship("Supplier", back_populates="debt_movements")
    invoice = relationship("Invoice", back_populates="debt_movements")
    transaction = relationship("Transaction", back_populates="debt_movements")

    def __repr__(self):
        dimension_str = self.dimension.value if self.dimension else ""
        direction_str = self.direction.value if self.direction else ""
        return f"<DebtMovement {dimension_str} {direction_str} {self.amount}>"
class DebtBalance(Base):
    __tablename__ = "debt_balances_view"
    
    __table_args__ = {'info': {'is_view': True}}
    
    id = get_uuid_column(primary_key=True)
    client_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("clients.id")
    )
    supplier_id = Column(
        UUIDType(36) if is_using_sqlite() else UUID(as_uuid=True), 
        ForeignKey("suppliers.id")
    )
    dimension = Column(Enum(DebtDimension), nullable=False)
    balance = Column(Float, nullable=False)
    as_of_date = Column(DateTime, nullable=False)
    client = relationship("Client")
    supplier = relationship("Supplier")