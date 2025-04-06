// libs/graphql/src/operations/fragments/client.ts
import { graphql } from 'react-relay';

export const ClientBasic = graphql`
  fragment ClientFragments_client on Client {
    id
    name
    contact_person
    phone
    email
    address
  }
`;

export const ClientListFragment = graphql`
  fragment ClientFragments_list on Client @relay(plural: true) {
    id
    name
    contact_person
    phone
    email
    address
    created_at
    updated_at
  }
`;

export const ClientDetails = graphql`
  fragment ClientFragments_clientDetails on Client {
    id
    name
    contact_person
    phone
    email
    address
    contracts {
      ...ContractFragments_list
    }
    invoices {
      ...InvoiceFragments_list
    }
    debt_balance
    created_at
    updated_at
  }
`;