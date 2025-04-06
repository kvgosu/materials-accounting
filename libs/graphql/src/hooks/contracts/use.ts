// libs/graphql/src/hooks/contract.ts
import { graphql } from 'react-relay';
import { 
  useEntityList, 
  useEntityDetails, 
  useEntityCreate, 
  useEntityUpdate, 
  useEntityDelete 
} from '../generic';
import { 
  ContractsQueryResponse,
  ContractQueryResponse,
  CreateContractMutationResponse,
  UpdateContractMutationResponse,
  DeleteContractMutationResponse
} from '@materials-accounting/types'; 
import { ContractFormValues, ContractStatus } from '@materials-accounting/types';

export function useContracts(
  skip: number = 0,
  limit: number = 10,
  client_id?: string,
  status?: ContractStatus
) {
  return useEntityList<
    ContractsQueryResponse,
    { skip?: number; limit?: number; client_id?: string; status?: ContractStatus }
  >(
    graphql`
      query useContractsQuery(
        $skip: Int, 
        $limit: Int, 
        $client_id: ID, 
        $status: ContractStatus
      ) {
        contracts(
          skip: $skip, 
          limit: $limit, 
          client_id: $client_id, 
          status: $status
        ) {
          ...ContractFragments_list
        }
      }
    `,
    { skip, limit, client_id, status },
    { entityKey: 'contracts' }
  );
}

export function useContract(id: string) {
  return useEntityDetails<
    ContractQueryResponse,
    { id: string }
  >(
    graphql`
      query useContractQuery($id: ID!) {
        contract(id: $id) {
          ...ContractFragments_contractDetails
          invoices {
            ...InvoiceFragments_listWithoutStatus
            id
            number
            date
            total_amount
            total_with_markup
            supplier {
              ...SupplierFragments_supplier
            }
            client {
              ...ClientFragments_client
            }
          }
        }
      }
    `,
    { id },
    { entityKey: 'contract' }
  );
}

export function useCreateContract() {
  const { create, loading, error } = useEntityCreate<
    ContractFormValues,
    CreateContractMutationResponse,
    'create_contract'
  >(
    graphql`
      mutation useCreateContractMutation($input: CreateContractInput!) {
        create_contract(input: $input) {
          contract {
            ...ContractFragments_contractDetails
          }
        }
      }
    `,
    { responseKey: 'create_contract' }
  );

  return {
    createContract: create,
    loading,
    error
  };
}

export function useUpdateContract() {
  const { update, loading, error } = useEntityUpdate<
    ContractFormValues,
    UpdateContractMutationResponse,
    'update_contract'
  >(
    graphql`
      mutation useUpdateContractMutation($id: ID!, $input: UpdateContractInput!) {
        update_contract(id: $id, input: $input) {
          contract {
            ...ContractFragments_contractDetails
          }
        }
      }
    `,
    { responseKey: 'update_contract' }
  );

  return {
    updateContract: update,
    loading,
    error
  };
}

export function useDeleteContract() {
  const { delete: deleteEntity, loading, error } = useEntityDelete<
    DeleteContractMutationResponse
  >(
    graphql`
      mutation useDeleteContractMutation($id: ID!) {
        delete_contract(id: $id) {
          success
        }
      }
    `,
    { responseKey: 'delete_contract' }
  );

  return {
    deleteContract: deleteEntity,
    loading,
    error
  };
}