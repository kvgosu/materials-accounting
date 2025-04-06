// libs/graphql/src/operations/mutations/client.ts
import { graphql } from 'relay-runtime';

export const ClientMutationsCreateMutation = graphql`
  mutation ClientMutationsCreateMutation($input: CreateClientInput!) {
    create_client(input: $input) {
      client {
        ...ClientFragments_clientDetails
      }
    }
  }
`;

export const ClientMutationsUpdateMutation = graphql`
  mutation ClientMutationsUpdateMutation($id: ID!, $input: UpdateClientInput!) {
    update_client(id: $id, input: $input) {
      client {
        ...ClientFragments_clientDetails
      }
    }
  }
`;

export const ClientMutationsDeleteMutation = graphql`
  mutation ClientMutationsDeleteMutation($id: ID!) {
    delete_client(id: $id) {
      success
    }
  }
`;