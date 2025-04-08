// apps/web/src/app/clients/[id]/detail/page.tsx
'use client';

import React, { Suspense } from 'react';
import { useFragment } from 'react-relay';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
  Badge
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../../components/ErrorBoundary';
import { ClientFragments_clientDetails, ContractFragments_list, InvoiceFragments_listWithoutStatus } from '@materials-accounting/graphql';
import { useClient } from '@materials-accounting/graphql';
import { formatDate, formatCurrency } from '../../../../utils/format';
import { useParams } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  FileText,
  CreditCard
} from 'lucide-react';

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.id as string;

  return (
    <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
      <Suspense fallback={<div>Загрузка данных клиента...</div>}>
        <ClientDetailContent clientId={clientId} />
      </Suspense>
    </ErrorBoundary>
  );
}

function ClientDetailContent({ clientId }: { clientId: string }) {
  const clientResult = useClient(clientId);
  const client = useFragment(
    ClientFragments_clientDetails,
    (clientResult as any)?.client || null
  );
  console.log(client);
  const invoicesArray = useFragment(
    InvoiceFragments_listWithoutStatus,
    (client as any).invoices || []
  );

  const contractsArray = useFragment(
    ContractFragments_list,
    (client as any).contracts || []
  );

  if (!client) {
    return <div>Клиент не найден</div>;
  }

  const invoicesCount = invoicesArray.length;
  const contractsCount = contractsArray.length;
  const debtAmount = typeof client.debt_balance === 'number' ? client.debt_balance : 0;
  const lastInvoiceDate = invoicesArray.length > 0
    ? invoicesArray.reduce((latest: any, invoice: any) => {
      if (!invoice.date) return latest;
      const invoiceDate = new Date(invoice.date);
      return !latest || invoiceDate > new Date(latest) ? invoice.date : latest;
    }, null)
    : null;

  const lastPaymentDate = '2024-03-15';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{client.name || "Без названия"}</h1>
        <div className="flex space-x-2">
          <Link href={`/clients/${clientId}`}>
            <Button variant="outline">Редактировать</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`${debtAmount > 0 ? 'border-red-300' : 'border-green-300'}`}>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Задолженность</p>
              <h3 className={`text-2xl font-bold mt-1 ${debtAmount > 0 ? 'text-destructive' : 'text-success'}`}>
                {formatCurrency(debtAmount)}
              </h3>
            </div>
            <div className={`rounded-full p-2 ${debtAmount > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
              {debtAmount > 0 ?
                <TrendingUp className="h-5 w-5 text-destructive" /> :
                <TrendingDown className="h-5 w-5 text-success" />
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Накладные</p>
              <h3 className="text-2xl font-bold mt-1">
                {invoicesCount}
              </h3>
            </div>
            <div className="rounded-full p-2 bg-blue-100">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Договоры</p>
              <h3 className="text-2xl font-bold mt-1">
                {contractsCount}
              </h3>
            </div>
            <div className="rounded-full p-2 bg-purple-100">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Последняя оплата</p>
              <h3 className="text-xl font-bold mt-1">
                {lastPaymentDate ? formatDate(lastPaymentDate) : 'Нет данных'}
              </h3>
            </div>
            <div className="rounded-full p-2 bg-amber-100">
              <CreditCard className="h-5 w-5 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground">Контактное лицо:</span>
                <p>{client.contact_person || 'Не указано'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Телефон:</span>
                <p>{client.phone || 'Не указан'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p>{client.email || 'Не указан'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Адрес:</span>
                <p>{client.address || 'Не указан'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Дата создания:</span>
                <p>{client.created_at ? formatDate(client.created_at) : 'Не указана'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Финансовые показатели</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground">Общая сумма долга:</span>
                <p className={`font-bold ${debtAmount > 0 ? 'text-destructive' : 'text-success'}`}>
                  {formatCurrency(debtAmount)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Последняя накладная:</span>
                <p>{lastInvoiceDate ? formatDate(lastInvoiceDate) : 'Нет накладных'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Последняя оплата:</span>
                <p>{lastPaymentDate ? formatDate(lastPaymentDate) : 'Нет данных'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="contracts">
        <TabsList>
          <TabsTrigger value="contracts">Договоры</TabsTrigger>
          <TabsTrigger value="invoices">Накладные</TabsTrigger>
        </TabsList>
        <TabsContent value="contracts" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Договоры клиента</CardTitle>
              <Button variant="outline" size="sm">
                <Link href={`/contracts/new?clientId=${clientId}`}>
                  Добавить договор
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {contractsArray.length > 0 ? (
                <div className="space-y-4">
                  {contractsArray.map((contract: any) => (
                    <div
                      key={contract.id || Math.random().toString()}
                      className="border rounded-md p-4 flex justify-between items-center"
                    >
                      <div>
                        <Link
                          href={`/contracts/${contract.id}`}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          {contract.number || "Без номера"}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {contract.date ? formatDate(contract.date) : "Без даты"} |
                          Наценка: {typeof contract.markup_percentage === 'number' ? `${contract.markup_percentage}%` : "Не указана"}
                        </div>
                      </div>
                      <Badge variant={contract.status === 'ACTIVE' ? 'success' : 'outline'}>
                        {contract.status === 'ACTIVE' ? 'Активный' : 'Неактивный'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">У клиента нет договоров</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Накладные клиента</CardTitle>
              <Button variant="outline" size="sm">
                <Link href={`/invoices/new?clientId=${clientId}`}>
                  Добавить накладную
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {invoicesArray.length > 0 ? (
                <div className="space-y-4">
                  {invoicesArray.map((invoice: any) => (
                    <div
                      key={invoice.id || Math.random().toString()}
                      className="border rounded-md p-4 flex justify-between items-center"
                    >
                      <div>
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          {invoice.number || "Без номера"}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {invoice.date ? formatDate(invoice.date) : "Без даты"} |
                          Сумма: {typeof invoice.total_with_markup === 'number' ? formatCurrency(invoice.total_with_markup) : "Не указана"}
                        </div>
                      </div>
                      <Badge variant={
                        invoice.status === 'CREATED' ? 'outline' :
                          invoice.status === 'PROCESSED' ? 'default' :
                            'success'
                      }>
                        {invoice.status === 'CREATED' ? 'Создана' :
                          invoice.status === 'PROCESSED' ? 'Обработана' :
                            'Закрыта'}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">У клиента нет накладных</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}