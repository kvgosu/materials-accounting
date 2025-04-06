// libs/graphql/src/operations/fragments/debt.ts
import { graphql } from 'react-relay';

export const DebtMovementDetails = graphql`
  fragment DebtFragments_debtMovement on DebtMovement {
    id
    period
    document_id
    document_type
    amount
    direction
    dimension
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    created_at
  }
`;

export const DebtMovementListFragment = graphql`
  fragment DebtFragments_debtMovementList on DebtMovement @relay(plural: true) {
    id
    period
    document_id
    document_type
    amount
    direction
    dimension
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    created_at
  }
`;

export const DebtBalanceDetails = graphql`
  fragment DebtFragments_debtBalance on DebtBalance {
    id
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    dimension
    balance
    as_of_date
  }
`;

export const DebtBalanceListFragment = graphql`
  fragment DebtFragments_debtBalanceList on DebtBalance @relay(plural: true) {
    id
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    dimension
    balance
    as_of_date
  }
`;

export const DebtTurnoverDetails = graphql`
  fragment DebtFragments_debtTurnover on DebtTurnover {
    id
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    dimension
    debit
    credit
    balance
    start_date
    end_date
  }
`;

export const DebtTurnoverListFragment = graphql`
  fragment DebtFragments_debtTurnoverList on DebtTurnover @relay(plural: true) {
    id
    client {
      ...ClientFragments_client
    }
    supplier {
      ...SupplierFragments_supplier
    }
    dimension
    debit
    credit
    balance
    start_date
    end_date
  }
`;