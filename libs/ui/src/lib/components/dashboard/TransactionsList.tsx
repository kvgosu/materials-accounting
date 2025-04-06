"use client";

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  CircleDollarSign, 
  CircleX,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/common/Card';
import { formatCurrency } from '../../utils';
import { Badge } from '../../components/common/Badge';

// Типы транзакций
export enum TransactionType {
  CLIENT_DEBT = 'CLIENT_DEBT',
  SUPPLIER_DEBT = 'SUPPLIER_DEBT',
  CLIENT_PAYMENT = 'CLIENT_PAYMENT',
  SUPPLIER_PAYMENT = 'SUPPLIER_PAYMENT',
}

// Интерфейс для транзакции
export interface Transaction {
  id: string;
  type: TransactionType | string;
  amount: number;
  date: string; // ISO format
  client?: {
    id: string;
    name: string;
  };
  supplier?: {
    id: string;
    name: string;
  };
  description?: string;
}

export interface TransactionsListProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onViewAll?: () => void;
  limit?: number;
}

/**
 * Компонент для отображения списка транзакций
 */
export function TransactionsList({ 
  transactions,
  isLoading = false,
  onViewAll,
  limit = 5 
}: TransactionsListProps) {
  // Ограничиваем количество отображаемых транзакций
  const limitedTransactions = transactions.slice(0, limit);

  // Функция для получения иконки транзакции в зависимости от типа
  const getTransactionIcon = (type: TransactionType | string) => {
    switch (type) {
      case TransactionType.CLIENT_DEBT:
        return <ArrowUpCircle className="h-5 w-5 text-red-500" />;
      case TransactionType.SUPPLIER_DEBT:
        return <ArrowDownCircle className="h-5 w-5 text-blue-500" />;
      case TransactionType.CLIENT_PAYMENT:
        return <CircleDollarSign className="h-5 w-5 text-green-500" />;
      case TransactionType.SUPPLIER_PAYMENT:
        return <CircleX className="h-5 w-5 text-yellow-500" />;
      default:
        return <CircleDollarSign className="h-5 w-5" />;
    }
  };

  // Функция для получения текста в зависимости от типа транзакции
  const getTransactionText = (transaction: Transaction) => {
    switch (transaction.type) {
      case TransactionType.CLIENT_DEBT:
        return `Долг клиенту: ${transaction.client?.name}`;
      case TransactionType.SUPPLIER_DEBT:
        return `Долг поставщику: ${transaction.supplier?.name}`;
      case TransactionType.CLIENT_PAYMENT:
        return `Оплата от клиента: ${transaction.client?.name}`;
      case TransactionType.SUPPLIER_PAYMENT:
        return `Оплата поставщику: ${transaction.supplier?.name}`;
      default:
        return 'Транзакция';
    }
  };
  
  // Если данные загружаются, показываем скелетон
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Последние транзакции</CardTitle>
          <CardDescription>Последние финансовые операции</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="flex items-center animate-pulse">
                <div className="bg-muted h-8 w-8 rounded-full"></div>
                <div className="ml-4 space-y-2 flex-1">
                  <div className="bg-muted h-4 w-2/3 rounded"></div>
                  <div className="bg-muted h-3 w-1/3 rounded"></div>
                </div>
                <div className="bg-muted h-5 w-20 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" disabled className="w-full">
            Загрузка данных...
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Последние транзакции</CardTitle>
        <CardDescription>Последние финансовые операции</CardDescription>
      </CardHeader>
      <CardContent>
        {limitedTransactions.length === 0 ? (
          <p className="text-center py-6 text-muted-foreground">
            Транзакций не найдено
          </p>
        ) : (
          <div className="space-y-4">
            {limitedTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium">
                    {getTransactionText(transaction)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(transaction.date), 'PPP', { locale: ru })}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-medium">
                    {formatCurrency(transaction.amount)}
                  </p>
                  <Badge variant={
                    transaction.type === TransactionType.CLIENT_DEBT || 
                    transaction.type === TransactionType.SUPPLIER_PAYMENT ? 
                    'destructive' : 'default'
                  } className="text-xs">
                    {transaction.type === TransactionType.CLIENT_DEBT || 
                     transaction.type === TransactionType.SUPPLIER_PAYMENT ? 
                     'Расход' : 'Приход'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {onViewAll && (
        <CardFooter>
          <Button variant="ghost" className="w-full" onClick={onViewAll}>
            Посмотреть все транзакции
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}