// libs/graphql/src/hooks/special/debt.ts
import { useMemo } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { 
  DebtMovementsQueryResponse
} from '@materials-accounting/types'; // Замените на правильный путь к вашим типам
import { DebtDimension } from '@materials-accounting/types'; // Замените на правильный путь к вашим типам
import { useEntityList } from '../../generic';

/**
 * Хук для получения остатков по долгам
 */
export function useDebtBalances(
  client_id?: string,
  supplier_id?: string,
  dimension?: DebtDimension,
  as_of_date?: string
) {
  const data = useLazyLoadQuery<any>(
    graphql`
      query useDebtBalancesQuery(
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
    `,
    { 
      client_id, 
      supplier_id, 
      dimension, 
      as_of_date 
    },
    { fetchPolicy: 'store-or-network' }
  );

  return useMemo(() => ({
    debtBalances: data.debt_balances || [],
  }), [data]);
}

/**
 * Хук для получения оборотов по долгам
 */
export function useDebtTurnovers(
  start_date: string,
  end_date: string,
  client_id?: string,
  supplier_id?: string,
  dimension?: DebtDimension
) {
  const data = useLazyLoadQuery<any>(
    graphql`
      query useDebtTurnoversQuery(
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
    `,
    { 
      client_id, 
      supplier_id, 
      dimension, 
      start_date, 
      end_date 
    },
    { fetchPolicy: 'store-or-network' }
  );

  return useMemo(() => ({
    debtTurnovers: data.debt_turnovers || [],
  }), [data]);
}

/**
 * Хук для получения движений по долгам
 */
export function useDebtMovements(
  skip: number = 0,
  limit: number = 10,
  client_id?: string,
  supplier_id?: string,
  dimension?: DebtDimension,
  period_from?: string,
  period_to?: string
) {
  return useEntityList<
    DebtMovementsQueryResponse,
    {
      skip?: number;
      limit?: number;
      client_id?: string;
      supplier_id?: string;
      dimension?: DebtDimension;
      period_from?: string;
      period_to?: string;
    }
  >(
    graphql`
      query useDebtMovementsQuery(
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
    `,
    { 
      skip,
      limit,
      client_id, 
      supplier_id, 
      dimension, 
      period_from, 
      period_to 
    },
    { entityKey: 'debt_movements' }
  );
}