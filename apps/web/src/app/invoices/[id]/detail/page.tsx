'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFragment } from 'react-relay';
import {
  useInvoice,
  useDeleteInvoice,
  useProcessInvoice,
  useCloseInvoice,
  InvoiceFragments_invoiceDetails,
  InvoiceFragments_invoiceItemList,
  InvoiceFragments_invoiceBasic,
  ContractFragments_contractDetails,
  ClientFragments_clientDetails,
  SupplierFragments_supplierDetails
} from '@materials-accounting/graphql';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  useToast
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../../components/ErrorBoundary';
import { formatDate, formatCurrency } from '../../../../utils/format';
import {
  ArrowLeft,
  Edit,
  Trash2,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export default function InvoiceDetailsPage() {
  const params = useParams();
  const invoiceId = params.id as string;

  return (
    <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
      <InvoiceDetailContent invoiceId={invoiceId} />
    </ErrorBoundary>
  );
}

function InvoiceDetailContent({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showProcessConfirm, setShowProcessConfirm] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const invoiceResult = useInvoice(invoiceId);
  const invoiceBase = useFragment(
    InvoiceFragments_invoiceDetails,
    (invoiceResult as any)?.invoice || {}
  );
  const invoice = {
    ...invoiceBase, ...useFragment(
      InvoiceFragments_invoiceBasic,
      (invoiceBase as any) || {}
    )
  };
  const contract = useFragment(
    ContractFragments_contractDetails,
    invoice?.contract || {}
  );
  const client = useFragment(
    ClientFragments_clientDetails,
    invoice?.client || {}
  );
  const supplier = useFragment(
    SupplierFragments_supplierDetails,
    invoice?.supplier || {}
  );
  const invoiceItems = useFragment(
    InvoiceFragments_invoiceItemList,
    (invoiceResult as any)?.invoice?.items || []
  );
  const transactions = Array.isArray((invoiceResult as any)?.invoice?.transactions)
    ? (invoiceResult as any).invoice.transactions
    : [];
  const debtMovements = Array.isArray((invoiceResult as any)?.invoice?.debt_movements)
    ? (invoiceResult as any).invoice.debt_movements
    : [];
  const { deleteInvoice, loading: deleteLoading, error: deleteError } = useDeleteInvoice();
  const { processInvoice, loading: processLoading, error: processError } = useProcessInvoice();
  const { closeInvoice, loading: closeLoading, error: closeError } = useCloseInvoice();

  const withRetry = async (operation: () => Promise<any>, retries = MAX_RETRIES): Promise<any> => {
    try {
      return await operation();
    } catch (error: any) {
      const isConnectionPoolError = error.message &&
        (error.message.includes('QueuePool limit') ||
          error.message.includes('connection timed out'));
      if (isConnectionPoolError && retries > 0) {
        toast({
          title: 'Ошибка соединения',
          description: `Повторная попытка через ${RETRY_DELAY / 1000} сек. Осталось попыток: ${retries}`,
          variant: 'default',
        });
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return withRetry(operation, retries - 1);
      }
      throw error;
    }
  };
  const handleProcessInvoice = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      await withRetry(() => processInvoice(invoiceId));
      toast({
        title: 'Успешно',
        description: 'Накладная успешно обработана',
        variant: 'default',
      });
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при обработке накладной');
      toast({
        title: 'Ошибка',
        description: 'Не удалось обработать накладную',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setShowProcessConfirm(false);
    }
  };
  const handleCloseInvoice = async () => {
    try {
      setIsClosing(true);
      setError(null);
      await withRetry(() => closeInvoice(invoiceId));
      toast({
        title: 'Успешно',
        description: 'Накладная успешно закрыта',
        variant: 'default',
      });
      window.location.reload(); 
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при закрытии накладной');
      toast({
        title: 'Ошибка',
        description: 'Не удалось закрыть накладную',
        variant: 'destructive',
      });
    } finally {
      setIsClosing(false);
      setShowCloseConfirm(false);
    }
  };
  const handleDeleteInvoice = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      await withRetry(() => deleteInvoice(invoiceId));
      toast({
        title: 'Успешно',
        description: 'Накладная успешно удалена',
        variant: 'default',
      });
      router.push('/invoices');
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при удалении накладной');
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить накладную',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!invoice || !invoice.id) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Накладная не найдена
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={() => router.push('/invoices')}
            >
              Вернуться к списку
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const canProcess = invoice.status === 'CREATED';
  const canClose = invoice.status === 'PROCESSED';
  const canDelete = invoice.status === 'CREATED';
  const canEdit = invoice.status === 'CREATED';
  const getStatusBadge = (status: string) => {
    let variant: 'default' | 'outline' | 'success' = 'outline';
    let text = 'Неизвестно';
    switch (status) {
      case 'CREATED':
        variant = 'outline';
        text = 'Создана';
        break;
      case 'PROCESSED':
        variant = 'default';
        text = 'Обработана';
        break;
      case 'CLOSED':
        variant = 'success';
        text = 'Закрыта';
        break;
    }
    return <Badge variant={variant}>{text}</Badge>;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.push('/invoices')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Накладная #{invoice.number}</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-muted-foreground">Статус:</div>
          {getStatusBadge(invoice.status)}
        </div>
        <div className="flex space-x-2">
          {canEdit && (
            <Button variant="outline" onClick={() => router.push(`/invoices/${invoiceId}`)}>
              <Edit className="h-4 w-4 mr-2" />
              Редактировать
            </Button>
          )}

          {canProcess && (
            <Button
              onClick={() => setShowProcessConfirm(true)}
              disabled={isProcessing}
            >
              <FileCheck className="h-4 w-4 mr-2" />
              {isProcessing ? 'Обработка...' : 'Обработать'}
            </Button>
          )}

          {canClose && (
            <Button
              onClick={() => setShowCloseConfirm(true)}
              disabled={isClosing}
              variant="default"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {isClosing ? 'Закрытие...' : 'Закрыть'}
            </Button>
          )}

          {canDelete && (
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? 'Удаление...' : 'Удалить'}
            </Button>
          )}
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-muted-foreground">Номер накладной:</div>
                <div className="font-medium">{invoice.number}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Дата:</div>
                <div className="font-medium">{formatDate(invoice.date)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Клиент:</div>
                <div className="font-medium">
                  <Link href={`/clients/${client?.id}/detail`} className="text-blue-600 hover:text-blue-900">
                    {client?.name}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Поставщик:</div>
                <div className="font-medium">
                  <Link href={`/suppliers/${supplier?.id}/detail`} className="text-blue-600 hover:text-blue-900">
                    {supplier?.name}
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-muted-foreground">Договор:</div>
                <div className="font-medium">{contract?.number}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Наценка по договору:</div>
                <div className="font-medium">{contract?.markup_percentage}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Сумма без наценки:</div>
                <div className="font-medium">{formatCurrency(invoice.total_amount)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Сумма с наценкой:</div>
                <div className="font-medium">{formatCurrency(invoice.total_with_markup)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Позиции</TabsTrigger>
          <TabsTrigger value="transactions">Транзакции</TabsTrigger>
          <TabsTrigger value="debt-movements">Движения долга</TabsTrigger>
        </TabsList>
        <TabsContent value="items" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Позиции накладной</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Материал</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ед. изм.</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Количество</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Цена</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Сумма</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">С наценкой</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoiceItems.map((item: any) => {
                      return (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.material?.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{item.material?.unit}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">{item.quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">{formatCurrency(item.price)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">{formatCurrency(item.amount)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">{formatCurrency(item.amount_with_markup)}</div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={4} className="px-6 py-3 text-right font-medium">Итого:</td>
                      <td className="px-6 py-3 text-right font-medium">{formatCurrency(invoice.total_amount)}</td>
                      <td className="px-6 py-3 text-right font-medium">{formatCurrency(invoice.total_with_markup)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Транзакции по накладной</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Тип</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент/Поставщик</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Сумма</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Описание</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction: any) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={
                              transaction.type === 'CLIENT_DEBT' ||
                                transaction.type === 'SUPPLIER_DEBT' ?
                                'destructive' : 'success'
                            }>
                              {transaction.type === 'CLIENT_DEBT' ? 'Долг клиенту' :
                                transaction.type === 'SUPPLIER_DEBT' ? 'Долг поставщику' :
                                  transaction.type === 'CLIENT_PAYMENT' ? 'Оплата от клиента' :
                                    'Оплата поставщику'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.client ? transaction.client.name :
                                transaction.supplier ? transaction.supplier.name : '-'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">{formatCurrency(transaction.amount)}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">{transaction.description}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {invoice.status === 'CREATED' ?
                    'Транзакции будут созданы после обработки накладной' :
                    'Нет транзакций по этой накладной'}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="debt-movements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Движения долга по накладной</CardTitle>
            </CardHeader>
            <CardContent>
              {debtMovements.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Период</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Измерение</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Направление</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент/Поставщик</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Сумма</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {debtMovements.map((movement: any) => (
                        <tr key={movement.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(movement.period)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {movement.dimension === 'CLIENT_DEBT' ? 'Долг клиенту' : 'Долг поставщику'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={movement.direction === 'DEBIT' ? 'destructive' : 'success'}>
                              {movement.direction === 'DEBIT' ? 'Приход (увеличение)' : 'Расход (уменьшение)'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {movement.client ? movement.client.name :
                                movement.supplier ? movement.supplier.name : '-'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900">{formatCurrency(movement.amount)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {invoice.status === 'CREATED' ?
                    'Движения долга будут созданы после обработки накладной' :
                    'Нет движений долга по этой накладной'}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <AlertDialog open={showProcessConfirm} onOpenChange={setShowProcessConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Обработка накладной</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите обработать накладную #{invoice.number}?
              <div className="mt-2">
                При обработке будут созданы следующие транзакции:
              </div>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Долг клиенту {invoice.client?.name} на сумму {formatCurrency(invoice.total_with_markup)}</li>
                <li>Долг поставщику {invoice.supplier?.name} на сумму {formatCurrency(invoice.total_amount)}</li>
              </ul>
              <div className="mt-2 font-medium">
                Это действие нельзя отменить.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleProcessInvoice}
              disabled={isProcessing}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isProcessing ? 'Обработка...' : 'Подтвердить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Закрытие накладной</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите закрыть накладную #{invoice.number}?
              <div className="mt-2">
                Закрытие накладной означает, что все связанные с ней операции завершены.
              </div>
              <div className="mt-2 font-medium">
                Это действие нельзя отменить.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isClosing}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCloseInvoice}
              disabled={isClosing}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isClosing ? 'Закрытие...' : 'Подтвердить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удаление накладной</AlertDialogTitle>
            <AlertDialogDescription className="mt-2 font-medium">
              Вы уверены, что хотите удалить накладную #{invoice.number}?
                Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteInvoice}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Удаление...' : 'Подтвердить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="mt-4">
        <Link href="/invoices" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку накладных
        </Link>
      </div>
    </div>
  );
}