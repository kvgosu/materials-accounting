// libs/graphql/src/operations/queries/contracts.ts
import { graphql } from 'react-relay';

export const ContractsQuery = graphql`
  query ContractQueriesQuery($skip: Int, $limit: Int, $client_id: ID, $status: ContractStatus) {
    contracts(skip: $skip, limit: $limit, client_id: $client_id, status: $status) {
      ...ContractFragments_list
    }
  }
`;

export const ContractQuery = graphql`
  query ContractQueriesContractQuery($id: ID!) {
    contract(id: $id) {
      ...ContractFragments_contractDetails
      invoices {
        ...InvoiceFragments_list
        id
        number
        date
        status
        total_amount
        total_with_markup
        supplier {
          ...SupplierFragments_supplier
        }
        client {
          ...ClientFragments_client
        }
      }
    }
  }
`;