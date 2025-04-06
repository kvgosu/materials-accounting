// libs/graphql/src/operations/queries/invoices.ts
import { graphql } from 'react-relay';

export const InvoicesQuery = graphql`
  query InvoiceQueriesQuery(
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
`;

export const InvoiceQuery = graphql`
  query InvoiceQueriesInvoiceQuery($id: ID!) {
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
`;