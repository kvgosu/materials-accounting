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
        ...InvoiceFragments_listWithoutStatus
        id
        number
        date
        total_amount
        total_with_markup
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