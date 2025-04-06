// libs/graphql/src/hooks/supplier.ts
import { graphql } from 'react-relay';
import { 
  useEntityList, 
  useEntityDetails, 
  useEntityCreate, 
  useEntityUpdate, 
  useEntityDelete 
} from '../generic';
import { 
  SuppliersQueryResponse,
  SupplierQueryResponse,
  CreateSupplierMutationResponse,
  UpdateSupplierMutationResponse,
  DeleteSupplierMutationResponse
} from '@materials-accounting/types'; // Замените на правильный путь к вашим типам
import { SupplierFormValues } from '@materials-accounting/types'; // Замените на правильный путь к вашим типам

/**
 * Хук для получения списка поставщиков
 */
export function useSuppliers(
  skip: number = 0,
  limit: number = 10,
  search?: string
) {
  return useEntityList<
    SuppliersQueryResponse,
    { skip?: number; limit?: number; search?: string }
  >(
    graphql`
      query useSuppliersQuery($skip: Int, $limit: Int, $search: String) {
        suppliers(skip: $skip, limit: $limit, search: $search) {
          ...SupplierFragments_list
        }
      }
    `,
    { skip, limit, search },
    { entityKey: 'suppliers' }
  );
}

/**
 * Хук для получения информации о поставщике
 */
export function useSupplier(id: string) {
  return useEntityDetails
    <SupplierQueryResponse,
    { id: string }
  >(
    graphql`
      query useSupplierQuery($id: ID!) {
        supplier(id: $id) {
          ...SupplierFragments_supplierDetails
          debt_balance
          invoices {
            ...InvoiceFragments_list
            id
            number
            date
            total_amount
            total_with_markup
            status
          }
          transactions {
            ...TransactionFragments_list
            id
            date
            amount
            type
          }
          debt_movements {
            ...DebtFragments_debtMovementList
          }
        }
      }
    `,
    { id },
    { entityKey: 'supplier' }
  );
}

/**
 * Хук для создания поставщика
 */
export function useCreateSupplier() {
  const { create, loading, error } = useEntityCreate<
    SupplierFormValues,
    CreateSupplierMutationResponse,
    'create_supplier'
  >(
    graphql`
      mutation useCreateSupplierMutation($input: CreateSupplierInput!) {
        create_supplier(input: $input) {
          supplier {
            ...SupplierFragments_supplierDetails
          }
        }
      }
    `,
    { responseKey: 'create_supplier' }
  );

  return {
    createSupplier: create,
    loading,
    error
  };
}

/**
 * Хук для обновления поставщика
 */
export function useUpdateSupplier() {
  const { update, loading, error } = useEntityUpdate<
    SupplierFormValues,
    UpdateSupplierMutationResponse,
    'update_supplier'
  >(
    graphql`
      mutation useUpdateSupplierMutation($id: ID!, $input: UpdateSupplierInput!) {
        update_supplier(id: $id, input: $input) {
          supplier {
            ...SupplierFragments_supplierDetails
          }
        }
      }
    `,
    { responseKey: 'update_supplier' }
  );

  return {
    updateSupplier: update,
    loading,
    error
  };
}

/**
 * Хук для удаления поставщика
 */
export function useDeleteSupplier() {
  const { delete: deleteEntity, loading, error } = useEntityDelete<
    DeleteSupplierMutationResponse
  >(
    graphql`
      mutation useDeleteSupplierMutation($id: ID!) {
        delete_supplier(id: $id) {
          success
        }
      }
    `,
    { responseKey: 'delete_supplier' }
  );

  return {
    deleteSupplier: deleteEntity,
    loading,
    error
  };
}