// libs/graphql/src/operations/queries/dashboard.ts
import { graphql } from 'react-relay';

export const DashboardQuery = graphql`
  query DashboardQueriesQuery {
    dashboard {
      clients_count
      suppliers_count
      active_contracts_count
      client_debts_sum
      supplier_debts_sum
      recent_invoices {
        ...InvoiceFragments_invoiceBasic
        client {
          ...ClientFragments_client
        }
        supplier {
          ...SupplierFragments_supplier
        }
      }
      recent_transactions {
        ...TransactionFragments_transaction
        client {
          ...ClientFragments_client
        }
        supplier {
          ...SupplierFragments_supplier
        }
      }
    }
  }
`;