// libs/types/src/lib/relay-types.ts
import { 
  ClientsQueryResponse, 
  ClientQueryResponse,
  DashboardQueryResponse,
  CreateClientMutationResponse,
  SuppliersQueryResponse,
  DeactivatePriceListMutationResponse,
  GenerateTemplateMutationResponse,
  LinkItemToMaterialMutationResponse,
  PriceListItemsQueryResponse,
  PriceListQueryResponse,
  PriceListsQueryResponse,
  UpdatePriceListItemInput,
  UpdatePriceListItemMutationResponse,
  UploadPriceListInput,
  UploadPriceListMutationResponse,
  // Другие типы ответов
} from './graphql';

// Типы для GraphQL запросов Relay
export interface ClientsQueryType {
  readonly variables: {
    skip?: number;
    limit?: number;
    search?: string;
  };
  readonly response: ClientsQueryResponse;
}

export interface ClientQueryType {
  readonly variables: {
    id: string;
  };
  readonly response: ClientQueryResponse;
}

export interface DashboardQueryType {
  readonly variables: Record<string, never>; // пустой объект
  readonly response: DashboardQueryResponse;
}

// Типы для GraphQL мутаций Relay
export interface CreateClientMutationType {
  readonly variables: {
    input: {
      name: string;
      contact_person?: string | null;
      phone?: string | null;
      email?: string | null;
      address?: string | null;
    };
  };
  readonly response: CreateClientMutationResponse;
}

export interface SuppliersQueryType {
  readonly variables: {
    skip?: number;
    limit?: number;
    search?: string;
  };
  readonly response: SuppliersQueryResponse;
}

export interface PriceListsQueryType {
  readonly variables: {
    skip?: number;
    limit?: number;
    supplier_id?: string;
    is_active?: boolean;
    date_from?: string;
    date_to?: string;
  };
  readonly response: PriceListsQueryResponse;
}

export interface PriceListQueryType {
  readonly variables: {
    id: string;
  };
  readonly response: PriceListQueryResponse;
}

export interface PriceListItemsQueryType {
  readonly variables: {
    price_list_id: string;
    search?: string;
    skip?: number;
    limit?: number;
  };
  readonly response: PriceListItemsQueryResponse;
}

export interface UploadPriceListMutationType {
  readonly variables: {
    input: UploadPriceListInput;
  };
  readonly response: UploadPriceListMutationResponse;
}

export interface DeactivatePriceListMutationType {
  readonly variables: {
    id: string;
  };
  readonly response: DeactivatePriceListMutationResponse;
}

export interface GenerateTemplateMutationType {
  readonly variables: {
    supplier_id: string;
  };
  readonly response: GenerateTemplateMutationResponse;
}

export interface LinkItemToMaterialMutationType {
  readonly variables: {
    item_id: string;
    material_id: string;
  };
  readonly response: LinkItemToMaterialMutationResponse;
}

export interface UpdatePriceListItemMutationType {
  readonly variables: {
    item_id: string;
    input: UpdatePriceListItemInput;
  };
  readonly response: UpdatePriceListItemMutationResponse;
}