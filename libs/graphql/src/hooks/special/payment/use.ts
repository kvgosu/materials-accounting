// libs/graphql/src/hooks/special/payment.ts
import { useState, useCallback } from 'react';
import { graphql, useMutation } from 'react-relay';
import { 
  RegisterClientPaymentMutationResponse,
  RegisterSupplierPaymentMutationResponse
} from '@materials-accounting/types'; // Замените на правильный путь к вашим типам
import { ClientPaymentFormValues, SupplierPaymentFormValues } from '@materials-accounting/types'; // Замените на правильный путь к вашим типам

/**
 * Хук для регистрации оплаты от клиента
 */
export function useRegisterClientPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useRegisterClientPaymentMutation($input: RegisterClientPaymentInput!) {
        register_client_payment(input: $input) {
          transaction {
            ...TransactionFragments_transactionDetails
          }
        }
      }
    `
  );

  const registerClientPayment = useCallback(
    async (data: ClientPaymentFormValues) => {
      setLoading(true);
      setError(null);

      try {
        const input = {
          client_id: data.client_id,
          amount: data.amount,
          date: data.date,
          description: data.description || null,
        };

        const response = await new Promise<RegisterClientPaymentMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              input,
            },
            onCompleted: (response, errors) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as unknown as RegisterClientPaymentMutationResponse);
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при регистрации оплаты от клиента');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    registerClientPayment,
    loading,
    error,
  };
}

/**
 * Хук для регистрации оплаты поставщику
 */
export function useRegisterSupplierPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useRegisterSupplierPaymentMutation($input: RegisterSupplierPaymentInput!) {
        register_supplier_payment(input: $input) {
          transaction {
            ...TransactionFragments_transactionDetails
          }
        }
      }
    `
  );

  const registerSupplierPayment = useCallback(
    async (data: SupplierPaymentFormValues) => {
      setLoading(true);
      setError(null);

      try {
        const input = {
          supplier_id: data.supplier_id,
          amount: data.amount,
          date: data.date,
          description: data.description || null,
        };

        const response = await new Promise<RegisterSupplierPaymentMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              input,
            },
            onCompleted: (response, errors) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as unknown as RegisterSupplierPaymentMutationResponse);
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при регистрации оплаты поставщику');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    registerSupplierPayment,
    loading,
    error,
  };
}