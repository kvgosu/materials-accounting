// libs/graphql/src/operations/queries/transactions.ts
import { graphql } from 'react-relay';

export const TransactionsQuery = graphql`
  query TransactionQueriesQuery(
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
`;

export const TransactionQuery = graphql`
  query TransactionQueriesTransactionQuery($id: ID!) {
    transaction(id: $id) {
      ...TransactionFragments_transactionDetails
    }
  }
`;