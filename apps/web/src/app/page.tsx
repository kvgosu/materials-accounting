// apps/web/src/app/page.tsx
'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { DashboardSummary, TransactionsList, Card, CardHeader, CardTitle, CardContent, CardFooter, Button } from '@materials-accounting/ui';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useDashboard } from '../hooks/useDashboard';
import { formatCurrency, formatDate } from '../utils/format';
import { InvoiceStatus } from '@materials-accounting/types';

// Компонент-обертка для Suspense
export default function DashboardPage() {
  return (
    <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold mb-6">Панель управления</h1>
        
        <Suspense fallback={<div>Загрузка данных...</div>}>
          <DashboardContent />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

// Компонент с данными
function DashboardContent() {
  const { dashboard, loading } = useDashboard();
  
  return (
    <>
      {/* Сводка основных показателей */}
      <DashboardSummary 
        data={{
          clientsCount: dashboard?.clientsCount || 0,
          suppliersCount: dashboard?.suppliersCount || 0,
          activeContractsCount: dashboard?.activeContractsCount || 0,
          clientDebtsSum: dashboard?.clientDebtsSum || 0,
          supplierDebtsSum: dashboard?.supplierDebtsSum || 0
        }}
        isLoading={loading}
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Список последних накладных */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Последние накладные</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {dashboard?.recentInvoices?.map((invoice:any) => (
                  <Link 
                    key={invoice.id} 
                    href={`/invoices/${invoice.id}`}
                    className="block p-3 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">№{invoice.number}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(invoice.date)} • {invoice.client?.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(invoice.totalWithMarkup)}</div>
                        <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 inline-block">
                          {invoice.status === InvoiceStatus.CREATED
                            ? 'Создана'
                            : invoice.status === InvoiceStatus.PROCESSED
                            ? 'Обработана'
                            : 'Закрыта'}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/invoices">
                Все накладные
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Список последних транзакций */}
        <TransactionsList
          transactions={dashboard?.recentTransactions || []}
          isLoading={loading}
          onViewAll={() => window.location.href = '/transactions'}
          limit={4}
        />
      </div>
      
      {/* Дополнительный раздел с информацией */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild className="h-auto py-4 flex flex-col items-center justify-center">
              <Link href="/invoices/new">
                <span className="text-lg">Создать накладную</span>
                <span className="text-xs text-muted mt-1">Оформить документ</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Link href="/clients/new">
                <span className="text-lg">Добавить клиента</span>
                <span className="text-xs text-muted mt-1">Создать новую запись</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Link href="/suppliers/new">
                <span className="text-lg">Добавить поставщика</span>
                <span className="text-xs text-muted mt-1">Создать новую запись</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Link href="/debt-movements">
                <span className="text-lg">Смотреть долги</span>
                <span className="text-xs text-muted mt-1">Анализ финансов</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}