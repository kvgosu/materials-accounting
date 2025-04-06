// libs/graphql/src/operations/fragments/invoice.ts
import { graphql } from 'react-relay';

export const InvoiceBasic = graphql`
  fragment InvoiceFragments_invoiceBasic on Invoice {
    id
    number
    date
    total_amount
    total_with_markup
    status
  }
`;

export const InvoiceListFragment = graphql`
  fragment InvoiceFragments_list on Invoice @relay(plural: true) {
    id
    number
    date
    total_amount
    total_with_markup
    status
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    created_at
    updated_at
  }
`;

export const InvoiceListWithoutStatusFragment = graphql`
  fragment InvoiceFragments_listWithoutStatus on Invoice @relay(plural: true) {
    id
    number
    date
    total_amount
    total_with_markup
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    created_at
    updated_at
  }
`;

export const InvoiceDetails = graphql`
  fragment InvoiceFragments_invoiceDetails on Invoice {
    ...InvoiceFragments_invoiceBasic
    client {
      ...ClientFragments_clientDetails
    }
    supplier {
      ...SupplierFragments_supplierDetails,
    }
    contract {
      ...ContractFragments_contractDetails
    }
    created_at
    updated_at
  }
`;

export const InvoiceItemDetails = graphql`
  fragment InvoiceFragments_invoiceItem on InvoiceItem {
    id
    quantity
    price
    amount
    amount_with_markup
    material {
    name
    unit
      ...MaterialFragments_material
    }
  }
`;

export const InvoiceItemListFragment = graphql`
  fragment InvoiceFragments_invoiceItemList on InvoiceItem @relay(plural: true) {
    id
    quantity
    price
    amount
    amount_with_markup
    material {
      name
      unit
      ...MaterialFragments_material
    }
  }
`;