// libs/graphql/src/operations/fragments/transaction.ts
import { graphql } from 'react-relay';

export const TransactionBasic = graphql`
  fragment TransactionFragments_transaction on Transaction {
    id
    type
    amount
    date
    description
  }
`;

export const TransactionListFragment = graphql`
  fragment TransactionFragments_list on Transaction @relay(plural: true) {
    id
    type
    amount
    date
    description
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    created_at
    updated_at
  }
`;

export const TransactionDetails = graphql`
  fragment TransactionFragments_transactionDetails on Transaction {
    ...TransactionFragments_transaction
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    created_at
    updated_at
  }
`;