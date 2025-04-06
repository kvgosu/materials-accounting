'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFragment } from 'react-relay';
import { 
  Button, 
  DataList, 
  Column,
  Badge,
  DatePicker,
  Dialog,
  DialogContent,
  DialogHeader, 
  DialogTitle,
  useToast,
  Alert,
  AlertDescription,
  Input
} from '@materials-accounting/ui';
import { 
  TransactionType 
} from '@materials-accounting/types';
import { 
  useTransactions, 
  useRegisterClientPayment,
  useRegisterSupplierPayment,
  TransactionFragments_list
} from '@materials-accounting/graphql';
import { formatDate, formatCurrency } from '../../utils/format';
import { RefreshCw } from 'lucide-react';

const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export default function TransactionsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [isClientPaymentModalOpen, setIsClientPaymentModalOpen] = useState(false);
  const [isSupplierPaymentModalOpen, setIsSupplierPaymentModalOpen] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Состояния для списков клиентов и поставщиков
  const [clients, setClients] = useState<Array<{id: string, name: string}>>([]);
  const [suppliers, setSuppliers] = useState<Array<{id: string, name: string}>>([]);
  
  // Состояния для форм оплаты
  const [clientPaymentData, setClientPaymentData] = useState({
    clientId: '',
    amount: '',
    date: new Date(),
    description: ''
  });
  
  const [supplierPaymentData, setSupplierPaymentData] = useState({
    supplierId: '',
    amount: '',
    date: new Date(),
    description: ''
  });
  
  // Ошибки валидации форм
  const [clientFormErrors, setClientFormErrors] = useState<Record<string, string>>({});
  const [supplierFormErrors, setSupplierFormErrors] = useState<Record<string, string>>({});
  
  // Хуки для регистрации платежей
  const { 
    registerClientPayment, 
    loading: clientPaymentLoading, 
    error: clientPaymentError 
  } = useRegisterClientPayment();
  
  const { 
    registerSupplierPayment, 
    loading: supplierPaymentLoading, 
    error: supplierPaymentError 
  } = useRegisterSupplierPayment();
  
  // Загрузка списков клиентов и поставщиков
  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        // В реальном приложении здесь были бы запросы к API
        // Имитируем загрузку данных
        setTimeout(() => {
          setClients([
            { id: '1', name: 'ООО "Восток"' },
            { id: '2', name: 'ЗАО "Строитель"' },
            { id: '3', name: 'ИП Сидоров' },
            { id: '4', name: 'ООО "Юг"' }
          ]);
          
          setSuppliers([
            { id: '1', name: 'ООО "СтройМатериалы"' },
            { id: '2', name: 'ЗАО "МеталлПром"' },
            { id: '3', name: 'ИП Столяров' },
            { id: '4', name: 'ООО "АвтоЗапчасти"' }
          ]);
        }, 300);
      } catch (error) {
        console.error('Ошибка при загрузке справочных данных:', error);
      }
    };
    
    fetchReferenceData();
  }, []);

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
  const typeParam = typeFilter === 'all' ? undefined : typeFilter;

  // Использование хука для получения данных
  const transactionsResult = useTransactions(
    page * pageSize, 
    pageSize, 
    undefined, // client_id
    undefined, // supplier_id
    undefined, // invoice_id
    typeParam, 
    dateFromStr, 
    dateToStr
  );

  const fragmentData = useFragment(
    TransactionFragments_list,
    (transactionsResult as any)?.transactions
  );
  
  const transactions = Array.isArray(fragmentData) ? fragmentData : [];

  // Обработчик изменения фильтра типа
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(event.target.value as TransactionType | 'all');
    setPage(0); // Сбрасываем страницу при изменении фильтра
  };

  // Сброс всех фильтров
  const handleResetFilters = () => {
    setTypeFilter('all');
    setDateFrom(undefined);
    setDateTo(undefined);
    setPage(0);
  };

  const forceRefresh = () => {
    window.location.reload();
  };

  // Валидация формы клиента
  const validateClientForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!clientPaymentData.clientId) {
      errors.clientId = 'Выберите клиента';
    }
    
    if (!clientPaymentData.amount) {
      errors.amount = 'Введите сумму';
    } else if (isNaN(parseFloat(clientPaymentData.amount)) || parseFloat(clientPaymentData.amount) <= 0) {
      errors.amount = 'Сумма должна быть положительным числом';
    }
    
    if (!clientPaymentData.date) {
      errors.date = 'Выберите дату';
    }
    
    setClientFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Валидация формы поставщика
  const validateSupplierForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!supplierPaymentData.supplierId) {
      errors.supplierId = 'Выберите поставщика';
    }
    
    if (!supplierPaymentData.amount) {
      errors.amount = 'Введите сумму';
    } else if (isNaN(parseFloat(supplierPaymentData.amount)) || parseFloat(supplierPaymentData.amount) <= 0) {
      errors.amount = 'Сумма должна быть положительным числом';
    }
    
    if (!supplierPaymentData.date) {
      errors.date = 'Выберите дату';
    }
    
    setSupplierFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Обработчик отправки формы оплаты от клиента
  const handleSubmitClientPayment = async () => {
    if (!validateClientForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      const paymentData = {
        client_id: clientPaymentData.clientId,
        amount: parseFloat(clientPaymentData.amount),
        date: clientPaymentData.date.toISOString().split('T')[0], // формат YYYY-MM-DD
        description: clientPaymentData.description || undefined
      };
      
      await withRetry(() => registerClientPayment(paymentData));
      
      toast({
        title: 'Успешно',
        description: 'Оплата от клиента успешно зарегистрирована',
        variant: 'default',
      });
      
      // Сбрасываем форму
      setClientPaymentData({
        clientId: '',
        amount: '',
        date: new Date(),
        description: ''
      });
      setClientFormErrors({});
      
      setIsClientPaymentModalOpen(false);
      forceRefresh(); // Обновляем страницу для отображения новой транзакции
    } catch (err: any) {
      console.error('Ошибка при регистрации оплаты от клиента:', err);
      toast({
        title: 'Ошибка',
        description: 'Не удалось зарегистрировать оплату от клиента',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Обработчик отправки формы оплаты поставщику
  const handleSubmitSupplierPayment = async () => {
    if (!validateSupplierForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      const paymentData = {
        supplier_id: supplierPaymentData.supplierId,
        amount: parseFloat(supplierPaymentData.amount),
        date: supplierPaymentData.date.toISOString().split('T')[0], // формат YYYY-MM-DD
        description: supplierPaymentData.description || undefined
      };
      
      await withRetry(() => registerSupplierPayment(paymentData));
      
      toast({
        title: 'Успешно',
        description: 'Оплата поставщику успешно зарегистрирована',
        variant: 'default',
      });
      
      // Сбрасываем форму
      setSupplierPaymentData({
        supplierId: '',
        amount: '',
        date: new Date(),
        description: ''
      });
      setSupplierFormErrors({});
      
      setIsSupplierPaymentModalOpen(false);
      forceRefresh(); // Обновляем страницу для отображения новой транзакции
    } catch (err: any) {
      console.error('Ошибка при регистрации оплаты поставщику:', err);
      toast({
        title: 'Ошибка',
        description: 'Не удалось зарегистрировать оплату поставщику',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Определение колонок для таблицы
  const columns: Column<any>[] = [
    {
      id: 'date',
      header: 'Дата',
      sortable: true,
      cell: (transaction) => formatDate(transaction.date)
    },
    {
      id: 'type',
      header: 'Тип',
      accessorKey: 'type',
      sortable: true,
      cell: (transaction) => {
        let variant: 'default' | 'outline' | 'destructive' | 'success' = 'default';
        let text = 'Неизвестно';
        
        switch (transaction.type) {
          case 'CLIENT_DEBT':
            variant = 'destructive';
            text = 'Долг клиенту';
            break;
          case 'SUPPLIER_DEBT':
            variant = 'destructive';
            text = 'Долг поставщику';
            break;
          case 'CLIENT_PAYMENT':
            variant = 'success';
            text = 'Оплата от клиента';
            break;
          case 'SUPPLIER_PAYMENT':
            variant = 'outline';
            text = 'Оплата поставщику';
            break;
        }
        
        return <Badge variant={variant}>{text}</Badge>;
      }
    },
    {
      id: 'entity',
      header: 'Клиент/Поставщик',
      cell: (transaction) => {
        if (transaction.client) {
          return (
            <Link href={`/clients/${transaction.client.id}/detail`} className="text-blue-600 hover:text-blue-900">
              {transaction.client.name}
            </Link>
          );
        } else if (transaction.supplier) {
          return (
            <Link href={`/suppliers/${transaction.supplier.id}/detail`} className="text-blue-600 hover:text-blue-900">
              {transaction.supplier.name}
            </Link>
          );
        }
        return '-';
      }
    },
    {
      id: 'amount',
      header: 'Сумма',
      accessorKey: 'amount',
      sortable: true,
      cell: (transaction) => formatCurrency(transaction.amount),
      className: 'text-right'
    },
    {
      id: 'invoice',
      header: 'Накладная',
      cell: (transaction) => {
        if (transaction.invoice) {
          return (
            <Link href={`/invoices/${transaction.invoice.id}/detail`} className="text-blue-600 hover:text-blue-900">
              {transaction.invoice.number}
            </Link>
          );
        }
        return '-';
      }
    },
    {
      id: 'description',
      header: 'Описание',
      accessorKey: 'description'
    }
  ];

  const totalCount = Array.isArray(transactions) ? transactions.length : 0;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Транзакции</h1>
          <p className="text-muted-foreground">
            Управление транзакциями и платежами
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsClientPaymentModalOpen(true)}>
            Оплата от клиента
          </Button>
          <Button onClick={() => setIsSupplierPaymentModalOpen(true)}>
            Оплата поставщику
          </Button>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm font-medium mb-1">Тип транзакции:</div>
            <select 
              className="w-full p-2 border rounded"
              value={typeFilter}
              onChange={handleTypeChange}
            >
              <option value="all">Все типы</option>
              <option value="CLIENT_DEBT">Долг клиенту</option>
              <option value="SUPPLIER_DEBT">Долг поставщику</option>
              <option value="CLIENT_PAYMENT">Оплата от клиента</option>
              <option value="SUPPLIER_PAYMENT">Оплата поставщику</option>
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
        data={transactions}
        keyField="id"
        isLoading={isLoading}
        noDataMessage="Транзакции не найдены"
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
      />
      
      {/* Модальное окно для регистрации оплаты от клиента */}
      <Dialog open={isClientPaymentModalOpen} onOpenChange={setIsClientPaymentModalOpen}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Регистрация оплаты от клиента</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {clientPaymentError && (
              <Alert variant="destructive">
                <AlertDescription>{clientPaymentError}</AlertDescription>
              </Alert>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">Клиент*</label>
              <select
                className="w-full p-2 border rounded"
                value={clientPaymentData.clientId}
                onChange={(e) => setClientPaymentData({...clientPaymentData, clientId: e.target.value})}
                disabled={isLoading || clientPaymentLoading}
                required
              >
                <option value="">Выберите клиента</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
              {clientFormErrors.clientId && (
                <p className="text-sm text-red-500 mt-1">{clientFormErrors.clientId}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Сумма оплаты*</label>
              <Input
                type="number"
                step="0.01"
                value={clientPaymentData.amount}
                onChange={(e) => setClientPaymentData({...clientPaymentData, amount: e.target.value})}
                placeholder="Введите сумму"
                disabled={isLoading || clientPaymentLoading}
                required
              />
              {clientFormErrors.amount && (
                <p className="text-sm text-red-500 mt-1">{clientFormErrors.amount}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Дата оплаты*</label>
              <DatePicker
                date={clientPaymentData.date}
                setDate={(date) => setClientPaymentData({...clientPaymentData, date: date || new Date()})}
                placeholder="Выберите дату"
                disabled={isLoading || clientPaymentLoading}
              />
              {clientFormErrors.date && (
                <p className="text-sm text-red-500 mt-1">{clientFormErrors.date}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Описание</label>
              <textarea
                className="w-full p-2 border rounded resize-none h-24"
                value={clientPaymentData.description}
                onChange={(e) => setClientPaymentData({...clientPaymentData, description: e.target.value})}
                placeholder="Дополнительная информация о платеже"
                disabled={isLoading || clientPaymentLoading}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsClientPaymentModalOpen(false)}
                disabled={isLoading || clientPaymentLoading}
              >
                Отмена
              </Button>
              <Button 
                type="button"
                onClick={handleSubmitClientPayment}
                disabled={isLoading || clientPaymentLoading}
              >
                {isLoading || clientPaymentLoading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Модальное окно для регистрации оплаты поставщику */}
      <Dialog open={isSupplierPaymentModalOpen} onOpenChange={setIsSupplierPaymentModalOpen}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Регистрация оплаты поставщику</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {supplierPaymentError && (
              <Alert variant="destructive">
                <AlertDescription>{supplierPaymentError}</AlertDescription>
              </Alert>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">Поставщик*</label>
              <select
                className="w-full p-2 border rounded"
                value={supplierPaymentData.supplierId}
                onChange={(e) => setSupplierPaymentData({...supplierPaymentData, supplierId: e.target.value})}
                disabled={isLoading || supplierPaymentLoading}
                required
              >
                <option value="">Выберите поставщика</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
              {supplierFormErrors.supplierId && (
                <p className="text-sm text-red-500 mt-1">{supplierFormErrors.supplierId}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Сумма оплаты*</label>
              <Input
                type="number"
                step="0.01"
                value={supplierPaymentData.amount}
                onChange={(e) => setSupplierPaymentData({...supplierPaymentData, amount: e.target.value})}
                placeholder="Введите сумму"
                disabled={isLoading || supplierPaymentLoading}
                required
              />
              {supplierFormErrors.amount && (
                <p className="text-sm text-red-500 mt-1">{supplierFormErrors.amount}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Дата оплаты*</label>
              <DatePicker
                date={supplierPaymentData.date}
                setDate={(date) => setSupplierPaymentData({...supplierPaymentData, date: date || new Date()})}
                placeholder="Выберите дату"
                disabled={isLoading || supplierPaymentLoading}
              />
              {supplierFormErrors.date && (
                <p className="text-sm text-red-500 mt-1">{supplierFormErrors.date}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Описание</label>
              <textarea
                className="w-full p-2 border rounded resize-none h-24"
                value={supplierPaymentData.description}
                onChange={(e) => setSupplierPaymentData({...supplierPaymentData, description: e.target.value})}
                placeholder="Дополнительная информация о платеже"
                disabled={isLoading || supplierPaymentLoading}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsSupplierPaymentModalOpen(false)}
                disabled={isLoading || supplierPaymentLoading}
              >
                Отмена
              </Button>
              <Button 
                type="button"
                onClick={handleSubmitSupplierPayment}
                disabled={isLoading || supplierPaymentLoading}
              >
                {isLoading || supplierPaymentLoading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}