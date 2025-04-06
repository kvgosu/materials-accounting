'use client';

import React, { Suspense, useState } from 'react';
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
  Badge,
  Alert,
  AlertDescription,
  DataList,
  Column,
  Modal,
  Input,
  DatePicker,
  Label,
  useToast
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../../components/ErrorBoundary';
import {
  SupplierFragments_supplierDetails,
  useSupplier,
  usePriceLists,
  useUploadPriceList,
  useGenerateTemplate,
  useDeactivatePriceList,
  PriceListFragments_list,
  useActivatePriceList
} from '@materials-accounting/graphql';
import { formatDate, formatCurrency } from '../../../../utils/format';
import { useParams, useRouter } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  FileText,
  CreditCard,
  Truck,
  RefreshCw,
  DollarSign,
  FileSpreadsheet,
  Upload,
  FileX
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export default function SupplierDetailPage() {
  const params = useParams();
  const supplierId = params.id as string;
  return (
    <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
      <Suspense fallback={<div>Загрузка данных поставщика...</div>}>
        <SupplierDetailContent supplierId={supplierId} />
      </Suspense>
    </ErrorBoundary>
  );
}

function SupplierDetailContent({ supplierId }: { supplierId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [priceListsPage, setPriceListsPage] = useState(0);
  const [priceListsPageSize, setPriceListsPageSize] = useState(10);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadDate, setUploadDate] = useState<Date | undefined>(new Date());
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<{ processed: number; skipped: number } | null>(null);
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
  const supplierResult = useSupplier(supplierId);
  const priceListsResult = usePriceLists(
    priceListsPage * priceListsPageSize,
    priceListsPageSize,
    supplierId,
    undefined,
    undefined,
    undefined
  );
  const { uploadPriceList } = useUploadPriceList();
  const { generateTemplate } = useGenerateTemplate();
  const { deactivatePriceList } = useDeactivatePriceList();
  const { activatePriceList } = useActivatePriceList();
  const supplier = useFragment(
    SupplierFragments_supplierDetails,
    (supplierResult && (supplierResult as any)?.supplier) ? (supplierResult as any).supplier : null
  );
  const priceListsData = useFragment(
    PriceListFragments_list,  // Фрагмент для списка
    (priceListsResult as any)?.price_lists || null
  );
  const priceLists = Array.isArray(priceListsData) ? priceListsData : [];
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!uploadDate) {
      setUploadError('Выберите дату прайс-листа');
      return;
    }

    if (!uploadFile) {
      setUploadError('Выберите файл прайс-листа');
      return;
    }

    setUploadLoading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const formattedDate = format(uploadDate, 'yyyy-MM-dd');
      const result = await withRetry(() => uploadPriceList({
        supplier_id: supplierId,
        date: formattedDate,
        file: uploadFile
      }));

      setUploadSuccess({
        processed: result.upload_price_list.processed_items,
        skipped: result.upload_price_list.skipped_items
      });

      toast({
        title: 'Прайс-лист загружен',
        description: `Обработано позиций: ${result.upload_price_list.processed_items}, пропущено: ${result.upload_price_list.skipped_items}`,
      });

      // Перезагрузка данных после загрузки прайс-листа
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (err: any) {
      setUploadError(err.message || 'Произошла ошибка при загрузке прайс-листа');
      toast({
        title: 'Ошибка',
        description: err.message || 'Произошла ошибка при загрузке прайс-листа',
        variant: 'destructive',
      });
    } finally {
      setUploadLoading(false);
    }
  };
  const handleGenerateTemplate = async () => {
    try {
      const result = await withRetry(() => generateTemplate(supplierId));

      // Создаем ссылку для автоматического скачивания
      const link = document.createElement('a');
      link.href = result.generate_template.download_url;
      link.download = 'price-list-template.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Шаблон прайс-листа',
        description: 'Шаблон успешно сгенерирован и скачивается',
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла ошибка при генерации шаблона',
        variant: 'destructive',
      });
    }
  };
  const handleDeactivatePriceList = async (priceListId: string) => {
    try {
      await withRetry(() => deactivatePriceList(priceListId));

      toast({
        title: 'Прайс-лист деактивирован',
        description: 'Прайс-лист успешно деактивирован',
      });

      // Перезагрузка данных после деактивации прайс-листа
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла ошибка при деактивации прайс-листа',
        variant: 'destructive',
      });
    }
  };
  const handleActivatePriceList = async (priceListId: string) => {
    try {
      await withRetry(() => activatePriceList(priceListId));
      toast({
        title: 'Прайс-лист активирован',
        description: 'Прайс-лист успешно активирован',
      });
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла ошибка при активации прайс-листа',
        variant: 'destructive',
      });
    }
  };
  const handleViewPriceListDetails = (priceListItem: any) => {
    const priceListId = priceListItem.id || priceListItem.__id;
    if (!priceListId) {
      console.error("ID прайс-листа не найден:", priceListItem);
      toast({
        title: "Ошибка",
        description: "Не удалось определить ID прайс-листа",
        variant: "destructive",
      });
      return;
    }
    router.push(`/suppliers/${supplierId}/price-list/${priceListId}`);
  };

  if (!supplierResult || !(supplierResult as any)?.supplier) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Данные поставщика не найдены.
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Обновить
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={() => router.push('/suppliers')}
            >
              Вернуться к списку
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  if (!supplier || !supplier.id) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Поставщик не найден в базе данных.
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={() => router.push('/suppliers')}
            >
              Вернуться к списку
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const supplierData = supplier as any;
  const invoicesArray = Array.isArray(supplierData.invoices) ? supplierData.invoices : [];
  const transactionsArray = Array.isArray(supplierData.transactions) ? supplierData.transactions : [];
  const invoicesCount = invoicesArray.length;
  const debtAmount = typeof supplierData.debt_balance === 'number' ? supplierData.debt_balance : 0;
  const lastInvoiceDate = invoicesArray.length > 0
    ? invoicesArray.reduce((latest: any, invoice: any) => {
      if (!invoice.date) return latest;
      const invoiceDate = new Date(invoice.date);
      return !latest || invoiceDate > new Date(latest) ? invoice.date : latest;
    }, null)
    : null;
  const lastPaymentTransaction = transactionsArray.length > 0
    ? transactionsArray
      .filter((tx: any) => tx.type === 'SUPPLIER_PAYMENT')
      .sort((a: any, b: any) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })[0]
    : null;
  const lastPaymentDate = lastPaymentTransaction?.date || null;
  const totalInvoicesAmount = invoicesArray.reduce((sum: number, invoice: any) => {
    return sum + (typeof invoice.total_amount === 'number' ? invoice.total_amount : 0);
  }, 0);
  const priceListColumns: Column<any>[] = [
    {
      id: 'date',
      header: 'Дата',
      cell: (item) => item.date
        ? format(parseISO(item.date), 'd MMMM yyyy', { locale: ru })
        : 'Н/Д',
      sortable: true
    },
    {
      id: 'file_name',
      header: 'Файл',
      accessorKey: 'file_name',
      cell: (item) => item.file_name || 'Без имени',
      sortable: true
    },
    {
      id: 'status',
      header: 'Статус',
      cell: (item) => (
        <Badge variant={item.is_active ? 'default' : 'secondary'}>
          {item.is_active ? 'Активный' : 'Неактивный'}
        </Badge>
      ),
      sortable: false
    },
    {
      id: 'created_at',
      header: 'Создан',
      cell: (item) => item.created_at
        ? format(parseISO(item.created_at), 'dd.MM.yyyy HH:mm')
        : 'Н/Д',
      sortable: true
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: (item) => (
        <div className="flex space-x-2">
          <div
            className="rounded-full p-2 bg-blue-100 hover:bg-blue-200 cursor-pointer transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleViewPriceListDetails(item);
            }}
            title="Просмотр"
          >
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          {item.is_active ? (
            <div
              className="rounded-full p-2 bg-amber-100 hover:bg-amber-200 cursor-pointer transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleDeactivatePriceList(item.id || item.__id);
              }}
              title="Деактивировать"
            >
              <FileX className="h-4 w-4 text-amber-600" />
            </div>
          ) : (
            <div
              className="rounded-full p-2 bg-green-100 hover:bg-green-200 cursor-pointer transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleActivatePriceList(item.id || item.__id);
              }}
              title="Активировать"
            >
              <RefreshCw className="h-4 w-4 text-green-600" />
            </div>
          )}
        </div>
      ),
      sortable: false
    }
  ];
  const priceListsPaginationInfo = {
    pageIndex: priceListsPage,
    pageSize: priceListsPageSize,
    totalCount: priceLists.length,
    totalPages: Math.ceil(priceLists.length / priceListsPageSize),
    hasNextPage: (priceListsPage + 1) * priceListsPageSize < priceLists.length,
    hasPrevPage: priceListsPage > 0
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{supplierData.name || "Без названия"}</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Загрузить прайс-лист
          </Button>
          <Button
            variant="outline"
            onClick={handleGenerateTemplate}
          >
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Скачать шаблон
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
          <Link href={`/suppliers/${supplierId}`}>
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
              <p className="text-sm font-medium text-muted-foreground">Последняя поставка</p>
              <h3 className="text-xl font-bold mt-1">
                {lastInvoiceDate ? formatDate(lastInvoiceDate) : 'Нет данных'}
              </h3>
            </div>
            <div className="rounded-full p-2 bg-purple-100">
              <Truck className="h-5 w-5 text-purple-600" />
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
                <p>{supplierData.contact_person || 'Не указано'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Телефон:</span>
                <p>{supplierData.phone || 'Не указан'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p>{supplierData.email || 'Не указан'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Адрес:</span>
                <p>{supplierData.address || 'Не указан'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Дата создания:</span>
                <p>{supplierData.created_at ? formatDate(supplierData.created_at) : 'Не указана'}</p>
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
                <span className="text-muted-foreground">Общая сумма по накладным:</span>
                <p className="font-bold">{formatCurrency(totalInvoicesAmount)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Последняя накладная:</span>
                <p>{lastInvoiceDate ? formatDate(lastInvoiceDate) : 'Нет накладных'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Последняя оплата:</span>
                <p>{lastPaymentDate ? formatDate(lastPaymentDate) : 'Нет данных об оплатах'}</p>
              </div>
              {lastPaymentTransaction && (
                <div>
                  <span className="text-muted-foreground">Сумма последней оплаты:</span>
                  <p className="font-bold">{formatCurrency(lastPaymentTransaction.amount || 0)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">Накладные</TabsTrigger>
          <TabsTrigger value="transactions">Транзакции</TabsTrigger>
          <TabsTrigger value="price-lists">Прайс-листы</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Накладные поставщика</CardTitle>
              <Button variant="outline" size="sm">
                <Link href={`/invoices/new?supplierId=${supplierId}`}>
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
                          Сумма: {typeof invoice.total_amount === 'number' ? formatCurrency(invoice.total_amount) : "Не указана"}
                        </div>
                        {invoice.client && (
                          <div className="text-sm text-muted-foreground">
                            Клиент: <Link href={`/clients/${invoice.client.id}/detail`} className="hover:underline">
                              {invoice.client.name || "Без названия"}
                            </Link>
                          </div>
                        )}
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
                <p className="text-muted-foreground">У поставщика нет накладных</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Транзакции поставщика</CardTitle>
              <Button variant="outline" size="sm">
                <Link href={`/transactions/register-supplier-payment?supplierId=${supplierId}`}>
                  Зарегистрировать оплату
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {transactionsArray.length > 0 ? (
                <div className="space-y-4">
                  {transactionsArray.map((transaction: any) => (
                    <div
                      key={transaction.id || Math.random().toString()}
                      className="border rounded-md p-4 flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">
                          {transaction.type === 'SUPPLIER_DEBT' ? 'Долг поставщику' :
                            transaction.type === 'SUPPLIER_PAYMENT' ? 'Оплата поставщику' :
                              transaction.type}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.date ? formatDate(transaction.date) : "Без даты"} |
                          Сумма: {typeof transaction.amount === 'number' ? formatCurrency(transaction.amount) : "Не указана"}
                        </div>
                        {transaction.description && (
                          <div className="text-sm text-muted-foreground">
                            Описание: {transaction.description}
                          </div>
                        )}
                      </div>
                      <Badge variant={
                        transaction.type === 'SUPPLIER_DEBT' ? 'destructive' :
                          transaction.type === 'SUPPLIER_PAYMENT' ? 'success' :
                            'outline'
                      }>
                        {transaction.type === 'SUPPLIER_DEBT' ? <TrendingUp className="h-4 w-4" /> :
                          transaction.type === 'SUPPLIER_PAYMENT' ? <TrendingDown className="h-4 w-4" /> :
                            <DollarSign className="h-4 w-4" />}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">У поставщика нет транзакций</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="price-lists" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Прайс-листы поставщика</CardTitle>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateTemplate}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Скачать шаблон
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUploadModalOpen(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Загрузить прайс-лист
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataList
                columns={priceListColumns}
                data={priceLists}
                keyField="id"
                isLoading={false}
                noDataMessage="Прайс-листы не найдены"
                onRowClick={(item) => handleViewPriceListDetails(item)}
                paginationInfo={priceListsPaginationInfo}
                onPageChange={setPriceListsPage}
                onPageSizeChange={setPriceListsPageSize}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {Array.isArray(supplierData.debt_movements) && supplierData.debt_movements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>История движения долгов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplierData.debt_movements.map((movement: any) => (
                <div
                  key={movement.id || Math.random().toString()}
                  className="border rounded-md p-3 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">
                      {movement.direction === 'DEBIT' ? 'Увеличение долга' : 'Уменьшение долга'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {movement.period ? formatDate(movement.period) : "Без даты"} |
                      Сумма: {typeof movement.amount === 'number' ? formatCurrency(movement.amount) : "Не указана"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Документ: {movement.document_type === 'invoice' ? 'Накладная' :
                        movement.document_type === 'transaction' ? 'Транзакция' :
                          movement.document_type || 'Неизвестный тип'}
                    </div>
                  </div>
                  <Badge variant={movement.direction === 'DEBIT' ? 'destructive' : 'success'}>
                    {movement.direction === 'DEBIT' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Modal
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          setUploadDate(new Date());
          setUploadFile(null);
          setUploadError(null);
          setUploadSuccess(null);
        }}
        title="Загрузка прайс-листа"
        footer={
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleGenerateTemplate}
              disabled={uploadLoading}
            >
              Скачать шаблон
            </Button>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setUploadModalOpen(false);
                  setUploadDate(new Date());
                  setUploadFile(null);
                  setUploadError(null);
                  setUploadSuccess(null);
                }}
                disabled={uploadLoading}
              >
                Отмена
              </Button>
              <Button
                onClick={handleUpload}
                disabled={uploadLoading || !uploadFile || !uploadDate}
              >
                {uploadLoading ? 'Загрузка...' : 'Загрузить'}
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          {uploadError && (
            <Alert variant="destructive">
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}

          {uploadSuccess && (
            <Alert>
              <AlertDescription>
                Прайс-лист успешно загружен. Обработано позиций: {uploadSuccess.processed},
                пропущено: {uploadSuccess.skipped}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="date">Дата прайс-листа</Label>
            <DatePicker
              date={uploadDate}
              setDate={setUploadDate}
              disabled={uploadLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Файл прайс-листа</Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              disabled={uploadLoading}
            />
            <p className="text-sm text-gray-500">
              Поддерживаемые форматы: .xlsx, .xls
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}