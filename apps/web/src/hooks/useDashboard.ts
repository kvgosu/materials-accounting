// apps/web/src/hooks/useDashboard.ts
import { useLazyLoadQuery } from 'react-relay';
import { DashboardQuery } from '@materials-accounting/graphql';
import { DashboardQueryType } from '@materials-accounting/types';

export function useDashboard() {
  const data = useLazyLoadQuery<DashboardQueryType>(
    DashboardQuery,
    {},
    { fetchPolicy: 'network-only' }
  );
  
  return {
    dashboard: data.dashboard,
    loading: !data
  };
}