// libs/graphql/src/operations/fragments/supplier.ts
import { graphql } from 'react-relay';

export const SupplierBasic = graphql`
  fragment SupplierFragments_supplier on Supplier {
    id
    name
    contact_person
    phone
    email
    address
  }
`;

export const SupplierListFragment = graphql`
  fragment SupplierFragments_list on Supplier @relay(plural: true) {
    id
    name
    contact_person
    phone
    email
    address
    created_at
    updated_at
  }
`;

export const SupplierDetails = graphql`
  fragment SupplierFragments_supplierDetails on Supplier {
    id
    name
    contact_person
    phone
    email
    address
    created_at
    updated_at
    debt_balance
  }
`;