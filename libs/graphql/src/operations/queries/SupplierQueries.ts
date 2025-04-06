// libs/graphql/src/operations/queries/suppliers.ts
import { graphql } from 'react-relay';

export const SuppliersQuery = graphql`
  query SupplierQueriesQuery($skip: Int, $limit: Int, $search: String) {
    suppliers(skip: $skip, limit: $limit, search: $search) {
      ...SupplierFragments_list
    }
  }
`;

export const SupplierQuery = graphql`
  query SupplierQueriesDetailQuery($id: ID!) {
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
`;