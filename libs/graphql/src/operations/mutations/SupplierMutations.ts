// libs/graphql/src/operations/mutations/supplier.ts
import { graphql } from 'react-relay';

export const CreateSupplierMutation = graphql`
  mutation SupplierMutationsCreateMutation($input: CreateSupplierInput!) {
    create_supplier(input: $input) {
      supplier {
        ...SupplierFragments_supplierDetails
      }
    }
  }
`;

export const UpdateSupplierMutation = graphql`
  mutation SupplierMutationsUpdateMutation($id: ID!, $input: UpdateSupplierInput!) {
    update_supplier(id: $id, input: $input) {
      supplier {
        ...SupplierFragments_supplierDetails
      }
    }
  }
`;

export const DeleteSupplierMutation = graphql`
  mutation SupplierMutationsDeleteMutation($id: ID!) {
    delete_supplier(id: $id) {
      success
    }
  }
`;