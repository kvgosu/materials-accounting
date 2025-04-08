// libs/graphql/src/operations/mutations/payment.ts
import { graphql } from 'react-relay';

export const RegisterClientPaymentMutation = graphql`
  mutation PaymentMutationsRegisterClientMutation($input: RegisterClientPaymentInput!) {
    register_client_payment(input: $input) {
      transaction {
        id
        type
        amount
        date
        description
        client {
          ...ClientFragments_client
        }
        created_at
        updated_at
      }
    }
  }
`;

export const RegisterSupplierPaymentMutation = graphql`
  mutation PaymentMutationsRegisterSupplierMutation($input: RegisterSupplierPaymentInput!) {
    register_supplier_payment(input: $input) {
      transaction {
        id
        type
        amount
        date
        description
        supplier {
          ...SupplierFragments_supplier
        }
        created_at
        updated_at
      }
    }
  }
`;