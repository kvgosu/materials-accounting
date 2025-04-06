// libs/graphql/src/hooks/dashboard.ts
import { useMemo } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { DashboardQueryResponse } from '@materials-accounting/types'; // Замените на правильный путь к вашим типам

/**
 * Хук для получения данных дашборда
 */
export function useDashboard() {
  const data = useLazyLoadQuery<any>(
    graphql`
      query useDashboardQuery {
        dashboard {
          clients_count
          suppliers_count
          active_contracts_count
          client_debts_sum
          supplier_debts_sum
          recent_invoices {
            ...InvoiceFragments_list
          }
          recent_transactions {
            ...TransactionFragments_list
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'store-or-network' }
  );

  return useMemo(() => ({
    dashboard: data.dashboard,
    clientsCount: data.dashboard?.clients_count || 0,
    suppliersCount: data.dashboard?.suppliers_count || 0,
    activeContractsCount: data.dashboard?.active_contracts_count || 0,
    clientDebtsSum: data.dashboard?.client_debts_sum || 0,
    supplierDebtsSum: data.dashboard?.supplier_debts_sum || 0,
    recentInvoices: data.dashboard?.recent_invoices || [],
    recentTransactions: data.dashboard?.recent_transactions || [],
  }), [data]);
}