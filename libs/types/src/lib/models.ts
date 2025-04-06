// libs/types/src/lib/models.ts
import { ContractStatus, DebtDimension, DebtDirection, InvoiceStatus, TransactionType } from './enums';

// Базовые интерфейсы моделей
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface Client extends BaseEntity {
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  contracts?: Contract[];
  invoices?: Invoice[];
  transactions?: Transaction[];
  debt_balance?: number;
}

export interface Supplier extends BaseEntity {
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  invoices?: Invoice[];
  transactions?: Transaction[];
  debt_balance?: number;
}

export interface SupplierPriceList extends BaseEntity {
  supplier_id: string;
  supplier?: Supplier;
  date: string;
  file_name?: string;
  is_active: boolean;
  items?: PriceListItem[];
}

export interface PriceListItem extends BaseEntity {
  price_list_id: string;
  price_list?: SupplierPriceList;
  supplier_code?: string;
  barcode?: string;
  name: string;
  article?: string;
  description?: string;
  vat_rate: number;
  price: number;
  availability: number;
  material_id?: string;
  material?: Material;
}

export interface Material extends BaseEntity {
  name: string;
  unit: string;
  description?: string;
}

export interface Contract extends BaseEntity {
  number: string;
  date: string;
  client_id: string;
  client?: Client;
  markup_percentage: number;
  status: ContractStatus;
  expiration_date?: string;
  invoices?: Invoice[];
}

export interface Invoice extends BaseEntity {
  number: string;
  date: string;
  client_id: string;
  client?: Client;
  supplier_id: string;
  supplier?: Supplier;
  contract_id: string;
  contract?: Contract;
  total_amount: number;
  total_with_markup: number;
  status: InvoiceStatus;
  items?: InvoiceItem[];
  transactions?: Transaction[];
}

export interface InvoiceItem extends BaseEntity {
  invoice_id: string;
  invoice?: Invoice;
  material_id: string;
  material?: Material;
  quantity: number;
  price: number;
  amount: number;
  amount_with_markup: number;
}

export interface Transaction extends BaseEntity {
  invoice_id?: string;
  invoice?: Invoice;
  client_id?: string;
  client?: Client;
  supplier_id?: string;
  supplier?: Supplier;
  type: TransactionType;
  amount: number;
  date: string;
  description?: string;
}

export interface DebtMovement extends BaseEntity {
  period: string;
  document_id: string;
  document_type: string;
  client_id?: string;
  client?: Client;
  supplier_id?: string;
  supplier?: Supplier;
  amount: number;
  direction: DebtDirection;
  dimension: DebtDimension;
  invoice_id?: string;
  invoice?: Invoice;
  transaction_id?: string;
  transaction?: Transaction;
}

export interface DebtBalance {
  id?: string;
  client_id?: string;
  client?: Client;
  supplier_id?: string;
  supplier?: Supplier;
  dimension: DebtDimension;
  balance: number;
  as_of_date: string;
}

export interface DebtTurnover {
  id?: string;
  client_id?: string;
  client?: Client;
  supplier_id?: string;
  supplier?: Supplier;
  dimension: DebtDimension;
  debit: number;
  credit: number;
  balance: number;
  start_date: string;
  end_date: string;
}

export interface Dashboard {
  clients_count: number;
  suppliers_count: number;
  active_contracts_count: number;
  client_debts_sum: number;
  supplier_debts_sum: number;
  recent_invoices: Invoice[];
  recent_transactions: Transaction[];
}