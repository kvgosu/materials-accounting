// libs/graphql/src/operations/mutations/invoice.ts
import { graphql } from 'react-relay';

export const CreateInvoiceMutation = graphql`
  mutation InvoiceMutationsCreateMutation($input: CreateInvoiceInput!) {
    create_invoice(input: $input) {
      invoice {
        ...InvoiceFragments_invoiceDetails
      }
    }
  }
`;

export const UpdateInvoiceMutation = graphql`
  mutation InvoiceMutationsUpdateMutation($id: ID!, $input: UpdateInvoiceInput!) {
    update_invoice(id: $id, input: $input) {
      invoice {
        ...InvoiceFragments_invoiceDetails
      }
    }
  }
`;

export const DeleteInvoiceMutation = graphql`
  mutation InvoiceMutationsDeleteMutation($id: ID!) {
    delete_invoice(id: $id) {
      success
    }
  }
`;

export const ProcessInvoiceMutation = graphql`
  mutation InvoiceMutationsProcessMutation($id: ID!) {
    process_invoice(id: $id) {
      invoice {
        ...InvoiceFragments_invoiceDetails
      }
      transactions {
        ...TransactionFragments_transaction
      }
    }
  }
`;

export const CloseInvoiceMutation = graphql`
  mutation InvoiceMutationsCloseMutation($id: ID!) {
    close_invoice(id: $id) {
      invoice {
        ...InvoiceFragments_invoiceDetails
      }
    }
  }
`;