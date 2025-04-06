// libs/graphql/src/hooks/client.ts
import { graphql } from 'react-relay';
import { 
  useEntityList, 
  useEntityDetails, 
  useEntityCreate, 
  useEntityUpdate, 
  useEntityDelete 
} from '../generic';
import { 
  ClientsQueryResponse, 
  ClientQueryResponse, 
  CreateClientMutationResponse, 
  UpdateClientMutationResponse, 
  DeleteClientMutationResponse, 
  ClientFormValues } from '@materials-accounting/types';


export function useClients(
  skip: number = 0,
  limit: number = 10,
  search?: string
) {
  return useEntityList<
    ClientsQueryResponse,
    { skip?: number; limit?: number; search?: string }
  >(
    graphql`
      query useClientsQuery($skip: Int, $limit: Int, $search: String) {
        clients(skip: $skip, limit: $limit, search: $search) {
          ...ClientFragments_list
        }
      }
    `,
    { skip, limit, search },
    { entityKey: 'clients' }
  );
}

/**
 * Хук для получения информации о клиенте
 */
export function useClient(id: string) {
  return useEntityDetails<
    ClientQueryResponse,
    { id: string }
  >(
    graphql`
      query useClientQuery($id: ID!) {
        client(id: $id) {
          ...ClientFragments_clientDetails
          contracts {
            ...ContractFragments_list
          }
          invoices {
            ...InvoiceFragments_list
          }
        }
      }
    `,
    { id },
    { entityKey: 'client' }
  );
}

/**
 * Хук для создания клиента
 */
export function useCreateClient() {
  const { create, loading, error } = useEntityCreate<
    ClientFormValues,
    CreateClientMutationResponse,
    'create_client'
  >(
    graphql`
      mutation useCreateClientMutation($input: CreateClientInput!) {
        create_client(input: $input) {
          client {
            ...ClientFragments_clientDetails
          }
        }
      }
    `,
    { responseKey: 'create_client' }
  );

  return {
    createClient: create,
    loading,
    error
  };
}

/**
 * Хук для обновления клиента
 */
export function useUpdateClient() {
  const { update, loading, error } = useEntityUpdate<
    ClientFormValues,
    UpdateClientMutationResponse,
    'update_client'
  >(
    graphql`
      mutation useUpdateClientMutation($id: ID!, $input: UpdateClientInput!) {
        update_client(id: $id, input: $input) {
          client {
            ...ClientFragments_clientDetails
          }
        }
      }
    `,
    { responseKey: 'update_client' }
  );

  return {
    updateClient: update,
    loading,
    error
  };
}

/**
 * Хук для удаления клиента
 */
export function useDeleteClient() {
  const { delete: deleteEntity, loading, error } = useEntityDelete<
    DeleteClientMutationResponse
  >(
    graphql`
      mutation useDeleteClientMutation($id: ID!) {
        delete_client(id: $id) {
          success
        }
      }
    `,
    { responseKey: 'delete_client' }
  );

  return {
    deleteClient: deleteEntity,
    loading,
    error
  };
}