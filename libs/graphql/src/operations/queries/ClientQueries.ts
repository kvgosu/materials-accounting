// libs/graphql/src/operations/queries/ClientQueries.ts
import { graphql } from 'react-relay';

export const ClientsQuery = graphql`
  query ClientQueriesQuery($skip: Int, $limit: Int, $search: String) {
    clients(skip: $skip, limit: $limit, search: $search) {
      ...ClientFragments_list
    }
  }
`;

export const ClientQuery = graphql`
  query ClientQueriesClientQuery($id: ID!) {
    client(id: $id) {
      ...ClientFragments_clientDetails
      contracts {
        ...ContractFragments_contract
      }
      invoices {
        ...InvoiceFragments_invoiceBasic
      }
    }
  }
`;