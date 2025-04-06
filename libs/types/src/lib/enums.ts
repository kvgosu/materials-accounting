// libs/types/src/lib/enums.ts
export enum ContractStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
  }
  
  export enum InvoiceStatus {
    CREATED = 'CREATED',
    PROCESSED = 'PROCESSED',
    CLOSED = 'CLOSED'
  }
  
  export enum TransactionType {
    CLIENT_DEBT = 'CLIENT_DEBT',
    SUPPLIER_DEBT = 'SUPPLIER_DEBT',
    CLIENT_PAYMENT = 'CLIENT_PAYMENT',
    SUPPLIER_PAYMENT = 'SUPPLIER_PAYMENT'
  }
  
  export enum DebtDimension {
    CLIENT_DEBT = 'CLIENT_DEBT',
    SUPPLIER_DEBT = 'SUPPLIER_DEBT'
  }
  
  export enum DebtDirection {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT'
  }