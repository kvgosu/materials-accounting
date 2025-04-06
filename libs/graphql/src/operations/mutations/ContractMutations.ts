// libs/graphql/src/operations/mutations/contract.ts
import { graphql } from 'react-relay';

export const CreateContractMutation = graphql`
  mutation ContractMutationsCreateMutation($input: CreateContractInput!) {
    create_contract(input: $input) {
      contract {
        ...ContractFragments_contractDetails
      }
    }
  }
`;

export const UpdateContractMutation = graphql`
  mutation ContractMutationsUpdateMutation($id: ID!, $input: UpdateContractInput!) {
    update_contract(id: $id, input: $input) {
      contract {
        ...ContractFragments_contractDetails
      }
    }
  }
`;

export const DeleteContractMutation = graphql`
  mutation ContractMutationsDeleteMutation($id: ID!) {
    delete_contract(id: $id) {
      success
    }
  }
`;