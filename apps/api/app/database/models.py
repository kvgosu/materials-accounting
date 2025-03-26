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

Base = declarative_base()

# Перечисления для статусов и типов
class ContractStatus(enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"

class InvoiceStatus(enum.Enum):
    CREATED = "CREATED"
    PROCESSED = "PROCESSED"
    CLOSED = "CLOSED"

class TransactionType(enum.Enum):
    CLIENT_DEBT = "CLIENT_DEBT"
    SUPPLIER_DEBT = "SUPPLIER_DEBT"
    CLIENT_PAYMENT = "CLIENT_PAYMENT"
    SUPPLIER_PAYMENT = "SUPPLIER_PAYMENT"

class DebtDimension(enum.Enum):
    CLIENT_DEBT = "CLIENT_DEBT"
    SUPPLIER_DEBT = "SUPPLIER_DEBT"

class DebtDirection(enum.Enum):
    DEBIT = "DEBIT"
    CREDIT = "CREDIT"

# Базовый класс для моделей с общими полями
class BaseModel:
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Модель Клиента
class Client(Base, BaseModel):
    __tablename__ = "clients"

    name = Column(String, nullable=False)
    contact_person = Column(String)
    phone = Column(String)
    email = Column(String)
    address = Column(String)

    # Отношения
    contracts = relationship("Contract", back_populates="client")
    invoices = relationship("Invoice", back_populates="client")
    transactions = relationship("Transaction", back_populates="client")
    debt_movements = relationship("DebtMovement", back_populates="client")

    def __repr__(self):
        return f"<Client {self.name}>"

# Модель Поставщика
class Supplier(Base, BaseModel):
    __tablename__ = "suppliers"

    name = Column(String, nullable=False)
    contact_person = Column(String)
    phone = Column(String)
    email = Column(String)
    address = Column(String)

    # Отношения
    invoices = relationship("Invoice", back_populates="supplier")
    transactions = relationship("Transaction", back_populates="supplier")
    debt_movements = relationship("DebtMovement", back_populates="supplier")

    def __repr__(self):
        return f"<Supplier {self.name}>"

# Модель Договора
class Contract(Base, BaseModel):
    __tablename__ = "contracts"

    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    number = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    markup_percentage = Column(Float, nullable=False, default=0.0)
    status = Column(Enum(ContractStatus), nullable=False, default=ContractStatus.ACTIVE)
    expiration_date = Column(Date)

    # Отношения
    client = relationship("Client", back_populates="contracts")
    invoices = relationship("Invoice", back_populates="contract")

    def __repr__(self):
        return f"<Contract {self.number} for {self.client.name}>"

# Модель Материала
class Material(Base, BaseModel):
    __tablename__ = "materials"

    name = Column(String, nullable=False)
    unit = Column(String, nullable=False)
    description = Column(Text)

    # Отношения
    invoice_items = relationship("InvoiceItem", back_populates="material")

    def __repr__(self):
        return f"<Material {self.name} ({self.unit})>"

# Модель Накладной
class Invoice(Base, BaseModel):
    __tablename__ = "invoices"

    number = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    supplier_id = Column(UUID(as_uuid=True), ForeignKey("suppliers.id"), nullable=False)
    contract_id = Column(UUID(as_uuid=True), ForeignKey("contracts.id"), nullable=False)
    total_amount = Column(Float, nullable=False, default=0.0)
    total_with_markup = Column(Float, nullable=False, default=0.0)
    status = Column(Enum(InvoiceStatus), nullable=False, default=InvoiceStatus.CREATED)

    # Отношения
    client = relationship("Client", back_populates="invoices")
    supplier = relationship("Supplier", back_populates="invoices")
    contract = relationship("Contract", back_populates="invoices")
    items = relationship("InvoiceItem", back_populates="invoice", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="invoice")
    debt_movements = relationship("DebtMovement", back_populates="invoice")

    def __repr__(self):
        return f"<Invoice {self.number} for {self.client.name} from {self.supplier.name}>"

# Модель Позиции накладной
class InvoiceItem(Base, BaseModel):
    __tablename__ = "invoice_items"

    invoice_id = Column(UUID(as_uuid=True), ForeignKey("invoices.id"), nullable=False)
    material_id = Column(UUID(as_uuid=True), ForeignKey("materials.id"), nullable=False)
    quantity = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    amount = Column(Float, nullable=False)
    amount_with_markup = Column(Float, nullable=False)

    # Отношения
    invoice = relationship("Invoice", back_populates="items")
    material = relationship("Material", back_populates="invoice_items")

    def __repr__(self):
        return f"<InvoiceItem {self.material.name} for {self.invoice.number}>"

# Модель Транзакции
class Transaction(Base, BaseModel):
    __tablename__ = "transactions"

    invoice_id = Column(UUID(as_uuid=True), ForeignKey("invoices.id"))
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"))
    supplier_id = Column(UUID(as_uuid=True), ForeignKey("suppliers.id"))
    type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
    description = Column(Text)

    # Отношения
    invoice = relationship("Invoice", back_populates="transactions")
    client = relationship("Client", back_populates="transactions")
    supplier = relationship("Supplier", back_populates="transactions")
    debt_movements = relationship("DebtMovement", back_populates="transaction")

    def __repr__(self):
        return f"<Transaction {self.type.value} {self.amount}>"

# Модель Регистра движения долгов (аккумулирующий регистр)
class DebtMovement(Base):
    __tablename__ = "debt_movements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    period = Column(DateTime, nullable=False)
    document_id = Column(UUID(as_uuid=True), nullable=False)
    document_type = Column(String, nullable=False)  # invoice или transaction
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"))
    supplier_id = Column(UUID(as_uuid=True), ForeignKey("suppliers.id"))
    amount = Column(Float, nullable=False)
    direction = Column(Enum(DebtDirection), nullable=False)
    dimension = Column(Enum(DebtDimension), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Отношения для обратной связи с документами-основаниями
    invoice_id = Column(UUID(as_uuid=True), ForeignKey("invoices.id"))
    transaction_id = Column(UUID(as_uuid=True), ForeignKey("transactions.id"))
    
    # Отношения
    client = relationship("Client", back_populates="debt_movements")
    supplier = relationship("Supplier", back_populates="debt_movements")
    invoice = relationship("Invoice", back_populates="debt_movements")
    transaction = relationship("Transaction", back_populates="debt_movements")

    def __repr__(self):
        dimension_str = self.dimension.value if self.dimension else ""
        direction_str = self.direction.value if self.direction else ""
        return f"<DebtMovement {dimension_str} {direction_str} {self.amount}>"

# Представление для остатков долгов (View)
class DebtBalance(Base):
    __tablename__ = "debt_balances_view"
    
    # Это представление (View) в базе данных, не таблица
    __table_args__ = {'info': {'is_view': True}}
    
    id = Column(UUID(as_uuid=True), primary_key=True)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"))
    supplier_id = Column(UUID(as_uuid=True), ForeignKey("suppliers.id"))
    dimension = Column(Enum(DebtDimension), nullable=False)
    balance = Column(Float, nullable=False)
    as_of_date = Column(DateTime, nullable=False)
    
    # Отношения
    client = relationship("Client")
    supplier = relationship("Supplier")