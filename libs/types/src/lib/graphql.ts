// libs/types/src/lib/graphql.ts
import { 
  Client, 
  Contract, 
  DebtBalance, 
  DebtMovement, 
  DebtTurnover, 
  Invoice, 
  Material, 
  Supplier, 
  Transaction,
  PriceListItem, 
  SupplierPriceList 
} from './models';

// Типы для GraphQL ответов
export interface QueryResponse<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}

export interface MutationResponse<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}

// Типы для ответов GraphQL запросов
export interface ClientsQueryResponse {
  clients: Client[];
}

export interface ClientQueryResponse {
  client: Client;
}

export interface SuppliersQueryResponse {
  suppliers: Supplier[];
}

export interface SupplierQueryResponse {
  supplier: Supplier;
}

export interface PriceListsQueryResponse {
  price_lists: SupplierPriceList[];
}

export interface PriceListQueryResponse {
  price_list: SupplierPriceList;
}

export interface PriceListItemsQueryResponse {
  price_list_items: PriceListItem[];
}

export interface CurrentMaterialPriceQueryResponse {
  current_material_price: {
    id: string;
    price: number;
    vat_rate: number;
    availability: number;
    supplier_code?: string;
    created_at: string;
    updated_at: string;
    price_list: {
      id: string;
      date: string;
      is_active: boolean;
      supplier: {
        id: string;
        name: string;
      };
    };
    material: {
      id: string;
      name: string;
      unit: string;
      description?: string;
    };
  } | null;
}

export interface MaterialsQueryResponse {
  materials: Material[];
}

export interface MaterialQueryResponse {
  material: Material;
}

export interface ContractsQueryResponse {
  contracts: Contract[];
}

export interface ContractQueryResponse {
  contract: Contract;
}

export interface InvoicesQueryResponse {
  invoices: Invoice[];
}

export interface InvoiceQueryResponse {
  invoice: Invoice;
}

export interface TransactionsQueryResponse {
  transactions: Transaction[];
}

export interface TransactionQueryResponse {
  transaction: Transaction;
}

export interface DebtBalancesQueryResponse {
  debt_balances: DebtBalance[];
}

export interface DebtTurnoversQueryResponse {
  debt_turnovers: DebtTurnover[];
}

export interface DebtMovementsQueryResponse {
  debt_movements: DebtMovement[];
}

export interface DashboardQueryResponse {
  dashboard: {
    clients_count: number;
    suppliers_count: number;
    active_contracts_count: number;
    client_debts_sum: number;
    supplier_debts_sum: number;
    recent_invoices: Invoice[];
    recent_transactions: Transaction[];
  }
}

// Типы для входных данных мутаций
export interface UploadPriceListInput {
  supplier_id: string;
  date: string;
  file: File | { name: string; data: string };
}

export interface UpdatePriceListItemInput {
  supplier_code?: string;
  barcode?: string;
  name?: string;
  article?: string;
  description?: string;
  vat_rate?: number;
  price?: number;
  availability?: number;
  material_id?: string;
}

// Типы для ответов GraphQL мутаций
export interface CreateClientMutationResponse {
  create_client: {
    client: Client;
  }
}

export interface UpdateClientMutationResponse {
  update_client: {
    client: Client;
  }
}

export interface DeleteClientMutationResponse {
  delete_client: {
    success: boolean;
  }
}

export interface CreateSupplierMutationResponse {
  create_supplier: {
    supplier: Supplier;
  }
}

export interface UpdateSupplierMutationResponse {
  update_supplier: {
    supplier: Supplier;
  }
}

export interface DeleteSupplierMutationResponse {
  delete_supplier: {
    success: boolean;
  }
}

// Типы для ответов мутаций
export interface UploadPriceListMutationResponse {
  upload_price_list: {
    price_list: SupplierPriceList;
    processed_items: number;
    skipped_items: number;
  }
}

export interface DeactivatePriceListMutationResponse {
  deactivate_price_list: {
    success: boolean;
  }
}

export interface ActivatePriceListMutationResponse {
  activate_price_list: {
    success: boolean;
  }
}

export interface GenerateTemplateMutationResponse {
  generate_template: {
    download_url: string;
  }
}

export interface LinkItemToMaterialMutationResponse {
  link_price_list_item_to_material: {
    item: PriceListItem;
    material: Material;
  }
}

export interface UpdatePriceListItemMutationResponse {
  update_price_list_item: {
    item: PriceListItem;
  }
}

export interface CreateMaterialMutationResponse {
  create_material: {
    material: Material;
  }
}

export interface UpdateMaterialMutationResponse {
  update_material: {
    material: Material;
  }
}

export interface DeleteMaterialMutationResponse {
  delete_material: {
    success: boolean;
  }
}

export interface CreateContractMutationResponse {
  create_contract: {
    contract: Contract;
  }
}

export interface UpdateContractMutationResponse {
  update_contract: {
    contract: Contract;
  }
}

export interface DeleteContractMutationResponse {
  delete_contract: {
    success: boolean;
  }
}

export interface CreateInvoiceMutationResponse {
  create_invoice: {
    invoice: Invoice;
  }
}

export interface UpdateInvoiceMutationResponse {
  update_invoice: {
    invoice: Invoice;
  }
}

export interface DeleteInvoiceMutationResponse {
  delete_invoice: {
    success: boolean;
  }
}

export interface ProcessInvoiceMutationResponse {
  process_invoice: {
    invoice: Invoice;
    transactions: Transaction[];
  }
}

export interface CloseInvoiceMutationResponse {
  close_invoice: {
    invoice: Invoice;
  }
}

export interface RegisterClientPaymentMutationResponse {
  register_client_payment: {
    transaction: Transaction;
  }
}

export interface RegisterSupplierPaymentMutationResponse {
  register_supplier_payment: {
    transaction: Transaction;
  }
}