// libs/graphql/src/operations/fragments/material.ts
import { graphql } from 'react-relay';

export const MaterialBasic = graphql`
  fragment MaterialFragments_material on Material {
    id
    name
    unit
    description
  }
`;

export const MaterialListFragment = graphql`
  fragment MaterialFragments_list on Material @relay(plural: true) {
    id
    name
    unit
    description
    created_at
    updated_at
  }
`;

export const MaterialDetails = graphql`
  fragment MaterialFragments_materialDetails on Material {
    ...MaterialFragments_material
    created_at
    updated_at
  }
`;