// libs/graphql/src/operations/queries/materials.ts
import { graphql } from 'react-relay';

export const MaterialsQuery = graphql`
  query MaterialQueriesQuery($skip: Int, $limit: Int, $search: String) {
    materials(skip: $skip, limit: $limit, search: $search) {
      ...MaterialFragments_list
    }
  }
`;

export const MaterialQuery = graphql`
  query MaterialQueriesMaterialQuery($id: ID!) {
    material(id: $id) {
      ...MaterialFragments_materialDetails
    }
  }
`;