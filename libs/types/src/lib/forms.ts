// libs/types/src/lib/forms.ts
import { ContractStatus } from './enums';

// Типы для форм
export interface ClientFormValues {
  id?: string;
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface SupplierFormValues {
  id?: string;
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface PriceListUploadFormValues {
  supplier_id: string;
  date: string; 
  file: File;
}

export interface PriceListItemFormValues {
  id?: string;
  supplier_code?: string;
  barcode?: string;
  name: string;
  article?: string;
  description?: string;
  vat_rate: number;
  price: number;
  availability: number;
  material_id?: string;
}

export interface MaterialFormValues {
  id?: string;
  name: string;
  unit: string;
  description?: string;
}

export interface ContractFormValues {
  id?: string;
  client_id: string;
  number: string;
  date: string; // ISO string
  markup_percentage: number;
  status: ContractStatus;
  expiration_date?: string; // ISO string
}

export interface InvoiceItemFormValues {
  id?: string;
  material_id: string;
  material_name?: string;
  unit?: string;
  quantity: number;
  price: number;
  amount?: number;
  amount_with_markup?: number;
}

export interface InvoiceFormValues {
  id?: string;
  number: string;
  date: string; // ISO string
  client_id: string;
  supplier_id: string;
  contract_id: string;
  items: InvoiceItemFormValues[];
  total_amount?: number;
  total_with_markup?: number;
}

export interface ClientPaymentFormValues {
  client_id: string;
  amount: number;
  date: string; // ISO string
  description?: string;
}

export interface SupplierPaymentFormValues {
  supplier_id: string;
  amount: number;
  date: string; // ISO string
  description?: string;
}