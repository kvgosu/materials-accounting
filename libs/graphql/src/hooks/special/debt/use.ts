// libs/graphql/src/hooks/special/debt/use.ts
import { useEffect, useRef, useState } from 'react';
import { graphql, useLazyLoadQuery, FetchPolicy } from 'react-relay';
import { 
  DebtMovementsQueryResponse
} from '@materials-accounting/types';
import { DebtDimension } from '@materials-accounting/types';
import { useEntityList } from '../../generic';

export const DebtBalancesQuery = graphql`
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
`;

export const DebtTurnoversQuery = graphql`
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
`;

export function useDebtBalances(
  client_id?: string,
  supplier_id?: string,
  dimension?: DebtDimension,
  as_of_date?: string
) {
  console.log("🔍 useDebtBalances вызван с параметрами:", { client_id, supplier_id, dimension, as_of_date });
  
  const paramsRef = useRef({
    client_id,
    supplier_id,
    dimension,
    as_of_date
  });
  const [requestId, setRequestId] = useState(1);

  useEffect(() => {
    console.log("🔄 useEffect в useDebtBalances");
    const prevParams = paramsRef.current;
    const currentParams = { client_id, supplier_id, dimension, as_of_date };
    
    console.log("📊 Предыдущие параметры:", prevParams);
    console.log("📊 Текущие параметры:", currentParams);
    
    if (
      prevParams.client_id !== currentParams.client_id ||
      prevParams.supplier_id !== currentParams.supplier_id ||
      prevParams.dimension !== currentParams.dimension ||
      prevParams.as_of_date !== currentParams.as_of_date
    ) {
      console.log("📊 Параметры изменились, обновляем requestId");
      paramsRef.current = currentParams;
      setRequestId(prev => prev + 1);
    }
  }, [client_id, supplier_id, dimension, as_of_date]);
  
  const queryOptions = {
    fetchKey: requestId, 
    fetchPolicy: 'store-or-network' as FetchPolicy, 
    networkCacheConfig: { force: false } 
  };
  
  console.log("⚙️ Опции запроса:", queryOptions);
  
  try {
    console.log("🚀 Выполняем useLazyLoadQuery для DebtBalancesQuery");
    
    const data = useLazyLoadQuery<any>(
      DebtBalancesQuery,
      { client_id, supplier_id, dimension, as_of_date },
      queryOptions
    );
    
    console.log("✅ Результат запроса DebtBalancesQuery:", data);
    console.log("📋 Типы данных в результате:", typeof data, Array.isArray(data));
    
    if (data) {
      console.log("📋 Ключи в результате:", Object.keys(data));
      if (data.debt_balances) {
        console.log("📋 Данные debt_balances:", data.debt_balances);
        console.log("📋 Тип debt_balances:", typeof data.debt_balances, Array.isArray(data.debt_balances));
        if (Array.isArray(data.debt_balances) && data.debt_balances.length > 0) {
          console.log("📋 Первый элемент:", data.debt_balances[0]);
          console.log("📋 Ключи первого элемента:", Object.keys(data.debt_balances[0]));
        }
      } else {
        console.log("⚠️ debt_balances отсутствует в результате");
      }
    }
    
    // Преобразуем данные в формат, ожидаемый компонентом
    const adaptedBalances = (data?.debt_balances || []).map((balance: any) => {
      console.log("🔄 Преобразуем баланс:", balance);
      return {
        id: balance.id,
        client: balance.client,
        supplier: balance.supplier,
        amount: balance.balance,
        dimension: balance.dimension,
        asOfDate: balance.as_of_date
      };
    });
    
    console.log("🏁 Готовые данные для компонента:", adaptedBalances);
    
    return { debtBalances: adaptedBalances };
  } catch (error) {
    console.error("❌ Ошибка в useDebtBalances:", error);
    return { debtBalances: [] };
  }
}

export function useDebtTurnovers(
  start_date: string,
  end_date: string,
  client_id?: string,
  supplier_id?: string,
  dimension?: DebtDimension
) {
  console.log("🔍 useDebtTurnovers вызван с параметрами:", 
    { start_date, end_date, client_id, supplier_id, dimension });
  
  const paramsRef = useRef({
    client_id,
    supplier_id,
    dimension,
    start_date,
    end_date
  });
  const [requestId, setRequestId] = useState(1);

  useEffect(() => {
    console.log("🔄 useEffect в useDebtTurnovers");
    const prevParams = paramsRef.current;
    const currentParams = { client_id, supplier_id, dimension, start_date, end_date };

    console.log("📊 Предыдущие параметры:", prevParams);
    console.log("📊 Текущие параметры:", currentParams);
    
    if (
      prevParams.client_id !== currentParams.client_id ||
      prevParams.supplier_id !== currentParams.supplier_id ||
      prevParams.dimension !== currentParams.dimension ||
      prevParams.start_date !== currentParams.start_date ||
      prevParams.end_date !== currentParams.end_date
    ) {
      console.log("📊 Параметры изменились, обновляем requestId");
      paramsRef.current = currentParams;
      setRequestId(prev => prev + 1);
    }
  }, [client_id, supplier_id, dimension, start_date, end_date]);
  
  const queryOptions = {
    fetchKey: requestId, 
    fetchPolicy: 'store-or-network' as FetchPolicy, 
    networkCacheConfig: { force: false } 
  };
  
  console.log("⚙️ Опции запроса:", queryOptions);
  
  try {
    console.log("🚀 Выполняем useLazyLoadQuery для DebtTurnoversQuery");
    
    const data = useLazyLoadQuery<any>(
      DebtTurnoversQuery,
      { client_id, supplier_id, dimension, start_date, end_date },
      queryOptions
    );
    
    console.log("✅ Результат запроса DebtTurnoversQuery:", data);
    console.log("📋 Типы данных в результате:", typeof data, Array.isArray(data));
    
    if (data) {
      console.log("📋 Ключи в результате:", Object.keys(data));
      if (data.debt_turnovers) {
        console.log("📋 Данные debt_turnovers:", data.debt_turnovers);
        console.log("📋 Тип debt_turnovers:", typeof data.debt_turnovers, Array.isArray(data.debt_turnovers));
        if (Array.isArray(data.debt_turnovers) && data.debt_turnovers.length > 0) {
          console.log("📋 Первый элемент:", data.debt_turnovers[0]);
          console.log("📋 Ключи первого элемента:", Object.keys(data.debt_turnovers[0]));
        }
      } else {
        console.log("⚠️ debt_turnovers отсутствует в результате");
      }
    }
    
    // Преобразуем данные в формат, ожидаемый компонентом
    const transformedTurnovers = (data?.debt_turnovers || []).map((turnover: any) => {
      console.log("🔄 Преобразуем оборот:", turnover);
      return {
        client: turnover.client,
        supplier: turnover.supplier,
        debit: turnover.debit,
        credit: turnover.credit,
        dimension: turnover.dimension,
        startDate: turnover.start_date,
        endDate: turnover.end_date
      };
    });
    
    console.log("🏁 Готовые данные оборотов для компонента:", transformedTurnovers);
    
    return { debtTurnovers: transformedTurnovers };
  } catch (error) {
    console.error("❌ Ошибка в useDebtTurnovers:", error);
    return { debtTurnovers: [] };
  }
}

export function useDebtMovements(
  skip: number = 0,
  limit: number = 10,
  client_id?: string,
  supplier_id?: string,
  dimension?: DebtDimension,
  period_from?: string,
  period_to?: string
) {
  console.log("🔍 useDebtMovements вызван с параметрами:", 
    { skip, limit, client_id, supplier_id, dimension, period_from, period_to });
  
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