// libs/graphql/src/operations/mutations/material.ts
import { graphql } from 'react-relay';

export const CreateMaterialMutation = graphql`
  mutation MaterialMutationsCreateMutation($input: CreateMaterialInput!) {
    create_material(input: $input) {
      material {
        ...MaterialFragments_materialDetails
      }
    }
  }
`;

export const UpdateMaterialMutation = graphql`
  mutation MaterialMutationsUpdateMutation($id: ID!, $input: UpdateMaterialInput!) {
    update_material(id: $id, input: $input) {
      material {
        ...MaterialFragments_materialDetails
      }
    }
  }
`;

export const DeleteMaterialMutation = graphql`
  mutation MaterialMutationsDeleteMutation($id: ID!) {
    delete_material(id: $id) {
      success
    }
  }
`;