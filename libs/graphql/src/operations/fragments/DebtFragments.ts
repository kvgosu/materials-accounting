import { graphql } from 'react-relay';

// Фрагменты для движений долгов
export const DebtMovementFragment = graphql`
  fragment DebtFragments_debtMovement on DebtMovement {
    id
    period
    document_id
    document_type
    amount
    direction
    dimension
    client {
      id
      name
    }
    supplier {
      id
      name
    }
    invoice {
      id
      number
    }
    transaction {
      id
      type
      amount
    }
    created_at
  }
`;

// Фрагмент списка движений долгов
export const DebtMovementListFragment = graphql`
  fragment DebtFragments_debtMovementList on DebtMovement @relay(plural: true) {
    ...DebtFragments_debtMovement
  }
`;

// Фрагменты для остатков долгов
export const DebtBalanceFragment = graphql`
  fragment DebtFragments_debtBalance on DebtBalance {
    id
    client {
      id
      name
    }
    supplier {
      id
      name
    }
    dimension
    balance
    as_of_date
  }
`;

// Фрагмент списка остатков долгов
export const DebtBalanceListFragment = graphql`
  fragment DebtFragments_debtBalanceList on DebtBalance @relay(plural: true) {
    id
    client {
      id
      name
    }
    supplier {
      id
      name
    }
    dimension
    balance
    as_of_date
  }
`;

// Фрагменты для оборотов долгов
export const DebtTurnoverFragment = graphql`
  fragment DebtFragments_debtTurnover on DebtTurnover {
    id
    client {
      id
      name
    }
    supplier {
      id
      name
    }
    dimension
    debit
    credit
    balance
    start_date
    end_date
  }
`;

// Фрагмент списка оборотов долгов
export const DebtTurnoverListFragment = graphql`
  fragment DebtFragments_debtTurnoverList on DebtTurnover @relay(plural: true) {
    id
    client {
      id
      name
    }
    supplier {
      id
      name
    }
    dimension
    debit
    credit
    balance
    start_date
    end_date
  }
`;