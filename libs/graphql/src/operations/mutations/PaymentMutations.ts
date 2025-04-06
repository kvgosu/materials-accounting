// libs/graphql/src/operations/mutations/payment.ts
import { graphql } from 'react-relay';

export const RegisterClientPaymentMutation = graphql`
  mutation PaymentMutationsRegisterClientMutation($input: RegisterClientPaymentInput!) {
    register_client_payment(input: $input) {
      transaction {
        ...TransactionFragments_transactionDetails
      }
    }
  }
`;

export const RegisterSupplierPaymentMutation = graphql`
  mutation PaymentMutationsRegisterSupplierMutation($input: RegisterSupplierPaymentInput!) {
    register_supplier_payment(input: $input) {
      transaction {
        ...TransactionFragments_transactionDetails
      }
    }
  }
`;