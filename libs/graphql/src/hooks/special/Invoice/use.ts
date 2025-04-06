// libs/graphql/src/hooks/special/invoice.ts
import { useState, useCallback } from 'react';
import { graphql, useMutation, useLazyLoadQuery } from 'react-relay';
import { 
  InvoicesQueryResponse, 
  InvoiceQueryResponse, 
  CreateInvoiceMutationResponse, 
  UpdateInvoiceMutationResponse, 
  DeleteInvoiceMutationResponse,
  ProcessInvoiceMutationResponse,
  CloseInvoiceMutationResponse
} from '@materials-accounting/types'; // Замените на правильный путь к вашим типам
import { InvoiceFormValues, InvoiceStatus } from '@materials-accounting/types'; // Замените на правильный путь к вашим типам
import { useEntityList, useEntityDetails, useEntityDelete } from '../../generic';

/**
 * Хук для получения списка накладных
 */
export function useInvoices(
  skip: number = 0,
  limit: number = 10,
  client_id?: string,
  supplier_id?: string,
  contract_id?: string,
  status?: InvoiceStatus,
  date_from?: string,
  date_to?: string
) {
  return useEntityList<
    InvoicesQueryResponse,
    {
      skip?: number;
      limit?: number;
      client_id?: string;
      supplier_id?: string;
      contract_id?: string;
      status?: InvoiceStatus;
      date_from?: string;
      date_to?: string;
    }
  >(
    graphql`
      query useInvoicesQuery(
        $skip: Int,
        $limit: Int, 
        $client_id: ID, 
        $supplier_id: ID, 
        $contract_id: ID,
        $status: InvoiceStatus,
        $date_from: String,
        $date_to: String
      ) {
        invoices(
          skip: $skip, 
          limit: $limit, 
          client_id: $client_id, 
          supplier_id: $supplier_id, 
          contract_id: $contract_id,
          status: $status,
          date_from: $date_from,
          date_to: $date_to
        ) {
          ...InvoiceFragments_list
        }
      }
    `,
    { 
      skip, 
      limit, 
      client_id, 
      supplier_id, 
      contract_id, 
      status, 
      date_from, 
      date_to 
    },
    { entityKey: 'invoices' }
  );
}

/**
 * Хук для получения информации о накладной
 */
export function useInvoice(id: string) {
  return useEntityDetails<
    InvoiceQueryResponse,
    { id: string }
  >(
    graphql`
      query useInvoiceQuery($id: ID!) {
        invoice(id: $id) {
          ...InvoiceFragments_invoiceDetails
          items {
            ...InvoiceFragments_invoiceItemList
          }
          transactions {
            ...TransactionFragments_list
          }
          debt_movements {
            ...DebtFragments_debtMovementList
          }
        }
      }
    `,
    { id },
    { entityKey: 'invoice' }
  );
}

/**
 * Хук для создания накладной
 */
export function useCreateInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useCreateInvoiceMutation($input: CreateInvoiceInput!) {
        create_invoice(input: $input) {
          invoice {
            ...InvoiceFragments_invoiceDetails
          }
        }
      }
    `
  );

  const createInvoice = useCallback(
    async (data: InvoiceFormValues) => {
      setLoading(true);
      setError(null);

      try {
        // Преобразуем данные формы в формат GraphQL
        const input = {
          number: data.number,
          date: data.date,
          client_id: data.client_id,
          supplier_id: data.supplier_id,
          contract_id: data.contract_id,
          items: data.items.map((item:any) => ({
            material_id: item.material_id,
            quantity: item.quantity,
            price: item.price,
          })),
        };

        const response = await new Promise<CreateInvoiceMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              input,
            },
            onCompleted: (response, errors) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as unknown as CreateInvoiceMutationResponse);
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при создании накладной');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    createInvoice,
    loading,
    error,
  };
}

/**
 * Хук для обновления накладной
 */
export function useUpdateInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useUpdateInvoiceMutation($id: ID!, $input: UpdateInvoiceInput!) {
        update_invoice(id: $id, input: $input) {
          invoice {
            ...InvoiceFragments_invoiceDetails
          }
        }
      }
    `
  );

  const updateInvoice = useCallback(
    async (data: InvoiceFormValues) => {
      if (!data.id) {
        setError('ID накладной не указан');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const input = {
          number: data.number,
          date: data.date,
          client_id: data.client_id,
          supplier_id: data.supplier_id,
          contract_id: data.contract_id,
          items: data.items.map((item:any) => ({
            id: item.id,
            material_id: item.material_id,
            quantity: item.quantity,
            price: item.price,
          })),
        };

        const response = await new Promise<UpdateInvoiceMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              id: data.id,
              input,
            },
            onCompleted: (response, errors) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as unknown as UpdateInvoiceMutationResponse);
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при обновлении накладной');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    updateInvoice,
    loading,
    error,
  };
}

/**
 * Хук для удаления накладной
 */
export function useDeleteInvoice() {
  const { delete: deleteEntity, loading, error } = useEntityDelete<
    DeleteInvoiceMutationResponse
  >(
    graphql`
      mutation useDeleteInvoiceMutation($id: ID!) {
        delete_invoice(id: $id) {
          success
        }
      }
    `,
    { responseKey: 'delete_invoice' }
  );

  return {
    deleteInvoice: deleteEntity,
    loading,
    error
  };
}

/**
 * Хук для обработки накладной
 */
export function useProcessInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useProcessInvoiceMutation($id: ID!) {
        process_invoice(id: $id) {
          invoice {
            ...InvoiceFragments_invoiceDetails
          }
          transactions {
            ...TransactionFragments_list
          }
        }
      }
    `
  );

  const processInvoice = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise<ProcessInvoiceMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              id,
            },
            onCompleted: (response, errors) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as unknown as ProcessInvoiceMutationResponse);
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при обработке накладной');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    processInvoice,
    loading,
    error,
  };
}

/**
 * Хук для закрытия накладной
 */
export function useCloseInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useCloseInvoiceMutation($id: ID!) {
        close_invoice(id: $id) {
          invoice {
            ...InvoiceFragments_invoiceDetails
          }
        }
      }
    `
  );

  const closeInvoice = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise<CloseInvoiceMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              id,
            },
            onCompleted: (response, errors) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as unknown as CloseInvoiceMutationResponse);
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при закрытии накладной');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    closeInvoice,
    loading,
    error,
  };
}