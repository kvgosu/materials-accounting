// libs/types/src/lib/filters.ts
import { ContractStatus, DebtDimension, InvoiceStatus, TransactionType } from './enums';

// Типы для запросов
export interface PaginationInput {
  skip?: number;
  limit?: number;
}

export interface ClientFilterInput extends PaginationInput {
  search?: string;
}

export interface SupplierFilterInput extends PaginationInput {
  search?: string;
}

export interface PriceListFilterInput extends PaginationInput {
  supplier_id?: string;
  is_active?: boolean;
  date_from?: string;
  date_to?: string;
}

export interface PriceListItemFilterInput extends PaginationInput {
  price_list_id: string;
  search?: string;
}

export interface MaterialFilterInput extends PaginationInput {
  search?: string;
}

export interface ContractFilterInput extends PaginationInput {
  client_id?: string;
  status?: ContractStatus;
}

export interface InvoiceFilterInput extends PaginationInput {
  client_id?: string;
  supplier_id?: string;
  contract_id?: string;
  status?: InvoiceStatus;
  date_from?: string;
  date_to?: string;
}

export interface TransactionFilterInput extends PaginationInput {
  client_id?: string;
  supplier_id?: string;
  invoice_id?: string;
  type?: TransactionType;
  date_from?: string;
  date_to?: string;
}

export interface DebtBalanceFilterInput {
  client_id?: string;
  supplier_id?: string;
  dimension?: DebtDimension;
  as_of_date?: string;
}

export interface DebtTurnoverFilterInput {
  client_id?: string;
  supplier_id?: string;
  dimension?: DebtDimension;
  start_date: string;
  end_date: string;
}