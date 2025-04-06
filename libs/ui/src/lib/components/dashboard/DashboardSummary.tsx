"use client";

import { Users, Truck, ScrollText, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { formatCurrency } from '../../utils';

export interface DashboardSummaryData {
  clientsCount: number;
  suppliersCount: number;
  activeContractsCount: number;
  clientDebtsSum: number;
  supplierDebtsSum: number;
}

interface DashboardSummaryProps {
  data: DashboardSummaryData;
  isLoading?: boolean;
}

/**
 * Компонент сводной информации для главной страницы
 */
export function DashboardSummary({ data, isLoading = false }: DashboardSummaryProps) {
  // Если данные загружаются, показываем скелетон
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-muted h-4 w-24 rounded" />
              <div className="h-8 w-8 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-muted h-6 w-20 rounded mt-2" />
              <p className="text-xs text-muted-foreground bg-muted h-3 w-32 rounded mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Карточки с информацией
  const summaryCards = [
    {
      title: 'Клиенты',
      value: data.clientsCount,
      description: 'Всего в базе',
      icon: Users,
      iconColor: 'text-blue-500',
    },
    {
      title: 'Поставщики',
      value: data.suppliersCount,
      description: 'Всего в базе',
      icon: Truck,
      iconColor: 'text-green-500',
    },
    {
      title: 'Договоры',
      value: data.activeContractsCount,
      description: 'Активные договоры',
      icon: ScrollText,
      iconColor: 'text-yellow-500',
    },
    {
      title: 'Долги клиентам',
      value: formatCurrency(data.clientDebtsSum),
      description: 'Общая сумма долгов',
      icon: TrendingUp,
      iconColor: 'text-red-500',
    },
    {
      title: 'Долги поставщикам',
      value: formatCurrency(data.supplierDebtsSum),
      description: 'Общая сумма долгов',
      icon: TrendingDown,
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {summaryCards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}