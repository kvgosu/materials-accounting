// libs/graphql/src/operations/fragments/contract.ts
import { graphql } from 'react-relay';

export const ContractBasic = graphql`
  fragment ContractFragments_contract on Contract {
    id
    number
    date
    markup_percentage
    status
    expiration_date
  }
`;

export const ContractListFragment = graphql`
  fragment ContractFragments_list on Contract @relay(plural: true) {
    id
    number
    date
    markup_percentage
    expiration_date
    client {
      ...ClientFragments_client
    }
    created_at
    updated_at
  }
`;

export const ContractDetails = graphql`
  fragment ContractFragments_contractDetails on Contract {
    id
    number
    date
    markup_percentage
    status
    expiration_date
    client {
      ...ClientFragments_clientDetails
    }
    created_at
    updated_at
  }
`;