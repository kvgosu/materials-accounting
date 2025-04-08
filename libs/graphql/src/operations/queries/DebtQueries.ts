import { graphql } from 'react-relay';

export const DebtBalancesQuery = graphql`
  query DebtQueriesBalancesQuery(
    $client_id: ID, 
    $supplier_id: ID,
    $dimension: DebtDimension,
    $as_of_date: String
  ) {
    debt_balances(
      client_id: $client_id, 
      supplier_id: $supplier_id, 
      dimension: $dimension,
      as_of_date: $as_of_date
    ) {
      ...DebtFragments_debtBalanceList
    }
  }
`;

export const DebtTurnoversQuery = graphql`
  query DebtQueriesTurnoversQuery(
    $client_id: ID,
    $supplier_id: ID,
    $dimension: DebtDimension,
    $start_date: String!,
    $end_date: String!
  ) {
    debt_turnovers(
      client_id: $client_id,
      supplier_id: $supplier_id,
      dimension: $dimension,
      start_date: $start_date,
      end_date: $end_date
    ) {
      ...DebtFragments_debtTurnoverList
    }
  }
`;

export const DebtMovementsQuery = graphql`
  query DebtQueriesMovementsQuery(
    $skip: Int,
    $limit: Int,
    $client_id: ID,
    $supplier_id: ID,
    $dimension: DebtDimension,
    $period_from: String,
    $period_to: String
  ) {
    debt_movements(
      skip: $skip,
      limit: $limit,
      client_id: $client_id,
      supplier_id: $supplier_id,
      dimension: $dimension,
      period_from: $period_from,
      period_to: $period_to
    ) {
      ...DebtFragments_debtMovementList
    }
  }
`;