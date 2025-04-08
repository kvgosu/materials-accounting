'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFragment } from 'react-relay';
import { 
  Button, 
  DataList, 
  Column,
  Badge,
  DatePicker,
  Input,
  Select,
  useToast,
  Alert,
  AlertDescription
} from '@materials-accounting/ui';
import { 
  InvoiceStatus
} from '@materials-accounting/types';
import { 
  useInvoices, 
  InvoiceFragments_list,
  ClientFragments_client,
  SupplierFragments_supplier
} from '@materials-accounting/graphql';
import { formatDate, formatCurrency } from '../../utils/format';
import { Search as SearchIcon, Plus as PlusIcon, RefreshCw } from 'lucide-react';

const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export default function InvoicesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const { toast } = useToast();

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
          description: `Повторная попытка через ${RETRY_DELAY/1000} сек. Осталось попыток: ${retries}`,
          variant: 'default',
        });
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return withRetry(operation, retries - 1);
      }
      throw error;
    }
  };

  // Преобразование параметров фильтрации для GraphQL запроса
  const dateFromStr = dateFrom ? dateFrom.toISOString().split('T')[0] : undefined;
  const dateToStr = dateTo ? dateTo.toISOString().split('T')[0] : undefined;
  const statusParam = statusFilter === 'all' ? undefined : statusFilter;

  // Использование хука для получения данных
  const invoicesResult = useInvoices(
    page * pageSize, 
    pageSize, 
    undefined, // client_id
    undefined, // supplier_id
    undefined, // contract_id
    statusParam, 
    dateFromStr, 
    dateToStr
  );

  const fragmentData = useFragment(
    InvoiceFragments_list,
    (invoicesResult as any)?.invoices
  );
  
  const invoices = Array.isArray(fragmentData) ? fragmentData : [];

  // Обработчик поиска
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0); // Сбрасываем страницу при новом поиске
  };

  // Обработчик изменения фильтра статуса
  const handleStatusChange = (value: string) => {
    setStatusFilter(value as InvoiceStatus | 'all');
    setPage(0); // Сбрасываем страницу при изменении фильтра
  };

  // Сброс всех фильтров
  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setDateFrom(undefined);
    setDateTo(undefined);
    setPage(0);
  };

  const forceRefresh = () => {
    window.location.reload();
  };

  // Компоненты для ячеек с клиентом и поставщиком
  const ClientCell = ({ invoice }: { invoice: any }) => {
    const clientData = useFragment(
      ClientFragments_client,
      invoice.client || null
    );
    
    if (!clientData) return <span>-</span>;
    
    return (
      <Link href={`/clients/${clientData.id}/detail`} className="text-blue-600 hover:text-blue-900">
        {clientData.name}
      </Link>
    );
  };

  const SupplierCell = ({ invoice }: { invoice: any }) => {
    const supplierData = useFragment(
      SupplierFragments_supplier,
      invoice.supplier || null
    );
    
    if (!supplierData) return <span>-</span>;
    
    return (
      <Link href={`/suppliers/${supplierData.id}/detail`} className="text-blue-600 hover:text-blue-900">
        {supplierData.name}
      </Link>
    );
  };

  // Определение колонок для таблицы
  const columns: Column<any>[] = [
    {
      id: 'number',
      header: 'Номер',
      accessorKey: 'number',
      sortable: true
    },
    {
      id: 'date',
      header: 'Дата',
      sortable: true,
      cell: (invoice) => formatDate(invoice.date)
    },
    {
      id: 'client',
      header: 'Клиент',
      sortable: true,
      cell: (invoice) => <ClientCell invoice={invoice} />
    },
    {
      id: 'supplier',
      header: 'Поставщик',
      sortable: true,
      cell: (invoice) => <SupplierCell invoice={invoice} />
    },
    {
      id: 'total_amount',
      header: 'Сумма',
      accessorKey: 'total_amount',
      sortable: true,
      cell: (invoice) => formatCurrency(invoice.total_amount),
      className: 'text-right'
    },
    {
      id: 'total_with_markup',
      header: 'С наценкой',
      accessorKey: 'total_with_markup',
      sortable: true,
      cell: (invoice) => formatCurrency(invoice.total_with_markup),
      className: 'text-right'
    },
    {
      id: 'status',
      header: 'Статус',
      accessorKey: 'status',
      sortable: true,
      cell: (invoice) => {
        let variant: 'default' | 'outline' | 'success' = 'outline';
        let text = 'Неизвестно';
        
        switch (invoice.status) {
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
      },
      className: 'text-center'
    }
  ];

  const totalCount = Array.isArray(invoices) ? invoices.length : 0;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Накладные</h1>
          <p className="text-muted-foreground">
            Управление накладными, клиентами и поставщиками
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/invoices/new" passHref>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Создать накладную
            </Button>
          </Link>
        </div>
      </div>
      
      {dataError && (
        <Alert variant="destructive">
          <AlertDescription>
            {dataError}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4" 
              onClick={forceRefresh}
            >
              Повторить
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="bg-white p-4 rounded-md border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative">
            <div className="text-sm font-medium mb-1">Поиск:</div>
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск накладных..."
                className="pl-8"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Статус:</div>
            <select 
              className="w-full p-2 border rounded"
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="all">Все статусы</option>
              <option value="CREATED">Созданные</option>
              <option value="PROCESSED">Обработанные</option>
              <option value="CLOSED">Закрытые</option>
            </select>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Дата с:</div>
            <DatePicker
              date={dateFrom}
              setDate={setDateFrom}
              placeholder="Выберите дату"
            />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Дата по:</div>
            <DatePicker
              date={dateTo}
              setDate={setDateTo}
              placeholder="Выберите дату"
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Сбросить фильтры
          </Button>
        </div>
      </div>
      
      <DataList
        columns={columns}
        data={invoices}
        keyField="id"
        isLoading={isLoading}
        noDataMessage="Накладные не найдены"
        paginationInfo={{
          pageIndex: page,
          pageSize: pageSize,
          totalCount: totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          hasNextPage: (page + 1) * pageSize < totalCount,
          hasPrevPage: page > 0
        }}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onRowClick={(invoice) => router.push(`/invoices/${invoice.id}/detail`)}
      />
    </div>
  );
}