// libs/graphql/src/hooks/transaction/use.ts
import { graphql } from 'react-relay';
import { 
  useEntityList, 
  useEntityDetails
} from '../generic';
import { 
  TransactionsQueryResponse,
  TransactionQueryResponse
} from '@materials-accounting/types';

/**
 * Хук для получения списка транзакций
 */
export function useTransactions(
  skip: number = 0,
  limit: number = 10,
  client_id?: string,
  supplier_id?: string,
  invoice_id?: string,
  type?: string,
  date_from?: string,
  date_to?: string
) {
  return useEntityList<
    TransactionsQueryResponse,
    {
      skip?: number;
      limit?: number;
      client_id?: string;
      supplier_id?: string;
      invoice_id?: string;
      type?: string;
      date_from?: string;
      date_to?: string;
    }
  >(
    graphql`
      query useTransactionsQuery(
        $skip: Int,
        $limit: Int, 
        $client_id: ID, 
        $supplier_id: ID, 
        $invoice_id: ID,
        $type: TransactionType,
        $date_from: String,
        $date_to: String
      ) {
        transactions(
          skip: $skip, 
          limit: $limit, 
          client_id: $client_id, 
          supplier_id: $supplier_id, 
          invoice_id: $invoice_id,
          type: $type,
          date_from: $date_from,
          date_to: $date_to
        ) {
          ...TransactionFragments_list
        }
      }
    `,
    { 
      skip, 
      limit, 
      client_id, 
      supplier_id, 
      invoice_id, 
      type, 
      date_from, 
      date_to 
    },
    { entityKey: 'transactions' }
  );
}

/**
 * Хук для получения информации о транзакции
 */
export function useTransaction(id: string) {
  return useEntityDetails<
    TransactionQueryResponse,
    { id: string }
  >(
    graphql`
      query useTransactionQuery($id: ID!) {
        transaction(id: $id) {
          ...TransactionFragments_transactionDetails
        }
      }
    `,
    { id },
    { entityKey: 'transaction' }
  );
}