// apps/web/src/app/debt-movements/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  DebtBalancesView, 
  DebtTurnoversView 
} from '@materials-accounting/ui';
import { 
  DebtBalance, 
  DebtTurnover, 
  DebtDimension,
  DebtBalanceFilterInput,
  DebtTurnoverFilterInput
} from '@materials-accounting/types';

export default function DebtMovementsPage() {
  // Состояние для балансов
  const [balances, setBalances] = useState<DebtBalance[]>([]);
  const [balancesLoading, setBalancesLoading] = useState(true);
  const [balanceFilter, setBalanceFilter] = useState<DebtBalanceFilterInput>({
    asOfDate: new Date().toISOString()
  });
  
  // Состояние для оборотов
  const [turnovers, setTurnovers] = useState<DebtTurnover[]>([]);
  const [turnoversLoading, setTurnoversLoading] = useState(true);
  const [turnoverFilter, setTurnoverFilter] = useState<DebtTurnoverFilterInput>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(), // Начало текущего месяца
    endDate: new Date().toISOString() // Текущая дата
  });
  
  // Эффект для загрузки балансов
  useEffect(() => {
    const fetchBalances = async () => {
      setBalancesLoading(true);
      try {
        // В реальном приложении здесь был бы GraphQL запрос
        // const { data } = await client.query({
        //   query: GET_DEBT_BALANCES,
        //   variables: balanceFilter
        // });
        
        // Имитация запроса для примера
        setTimeout(() => {
          // Имитация данных с сервера
          const mockBalances: DebtBalance[] = [
            { 
              id: '1',
              client: { id: '1', name: 'ООО "Восток"' },
              clientId: '1',
              dimension: DebtDimension.CLIENT_DEBT,
              balance: 50150,
              asOfDate: balanceFilter.asOfDate || new Date().toISOString()
            },
            { 
              id: '2',
              client: { id: '2', name: 'ЗАО "Строитель"' },
              clientId: '2',
              dimension: DebtDimension.CLIENT_DEBT,
              balance: 0,
              asOfDate: balanceFilter.asOfDate || new Date().toISOString()
            },
            { 
              id: '3',
              supplier: { id: '1', name: 'ООО "СтройМатериалы"' },
              supplierId: '1',
              dimension: DebtDimension.SUPPLIER_DEBT,
              balance: 42500,
              asOfDate: balanceFilter.asOfDate || new Date().toISOString()
            },
            { 
              id: '4',
              supplier: { id: '2', name: 'ЗАО "МеталлПром"' },
              supplierId: '2',
              dimension: DebtDimension.SUPPLIER_DEBT,
              balance: 0,
              asOfDate: balanceFilter.asOfDate || new Date().toISOString()
            }
          ];
          
          setBalances(mockBalances);
          setBalancesLoading(false);
        }, 500);
      } catch (error) {
        console.error('Ошибка при загрузке балансов:', error);
        setBalancesLoading(false);
      }
    };

    fetchBalances();
  }, [balanceFilter]);
  
  // Эффект для загрузки оборотов
  useEffect(() => {
    const fetchTurnovers = async () => {
      setTurnoversLoading(true);
      try {
        // В реальном приложении здесь был бы GraphQL запрос
        // const { data } = await client.query({
        //   query: GET_DEBT_TURNOVERS,
        //   variables: turnoverFilter
        // });
        
        // Имитация запроса для примера
        setTimeout(() => {
          // Имитация данных с сервера
          const mockTurnovers: DebtTurnover[] = [
            { 
              id: '1',
              client: { id: '1', name: 'ООО "Восток"' },
              clientId: '1',
              dimension: DebtDimension.CLIENT_DEBT,
              debit: 90400, // Приход (увеличение долга)
              credit: 40250, // Расход (уменьшение долга)
              balance: 50150, // Сальдо
              startDate: turnoverFilter.startDate,
              endDate: turnoverFilter.endDate
            },
            { 
              id: '2',
              client: { id: '2', name: 'ЗАО "Строитель"' },
              clientId: '2',
              dimension: DebtDimension.CLIENT_DEBT,
              debit: 31360,
              credit: 31360,
              balance: 0,
              startDate: turnoverFilter.startDate,
              endDate: turnoverFilter.endDate
            },
            { 
              id: '3',
              supplier: { id: '1', name: 'ООО "СтройМатериалы"' },
              supplierId: '1',
              dimension: DebtDimension.SUPPLIER_DEBT,
              debit: 77500, // Приход (увеличение долга)
              credit: 35000, // Расход (уменьшение долга)
              balance: 42500, // Сальдо
              startDate: turnoverFilter.startDate,
              endDate: turnoverFilter.endDate
            },
            { 
              id: '4',
              supplier: { id: '2', name: 'ЗАО "МеталлПром"' },
              supplierId: '2',
              dimension: DebtDimension.SUPPLIER_DEBT,
              debit: 28000,
              credit: 28000,
              balance: 0,
              startDate: turnoverFilter.startDate,
              endDate: turnoverFilter.endDate
            }
          ];
          
          setTurnovers(mockTurnovers);
          setTurnoversLoading(false);
        }, 500);
      } catch (error) {
        console.error('Ошибка при загрузке оборотов:', error);
        setTurnoversLoading(false);
      }
    };

    fetchTurnovers();
  }, [turnoverFilter]);
  
  // Обработчики изменения фильтров
  const handleBalanceDateChange = (date: Date) => {
    setBalanceFilter((prev:any) => ({
      ...prev,
      asOfDate: date.toISOString()
    }));
  };
  
  const handleTurnoverStartDateChange = (date: Date) => {
    setTurnoverFilter((prev:any) => ({
      ...prev,
      startDate: date.toISOString()
    }));
  };
  
  const handleTurnoverEndDateChange = (date: Date) => {
    setTurnoverFilter((prev:any) => ({
      ...prev,
      endDate: date.toISOString()
    }));
  };

  const adaptedBalances = balances.map(balance => ({
    ...balance,
    amount: balance.balance, 
    id: balance.id || `balance-${Math.random()}`
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Регистр долгов</h1>
      
      {/* Компонент отображения остатков по долгам */}
      <DebtBalancesView
        balances={adaptedBalances}
        asOfDate={new Date(balanceFilter.asOfDate || new Date())}
        onDateChange={handleBalanceDateChange}
        isLoading={balancesLoading}
      />
      
      {/* Компонент отображения оборотов по долгам */}
      <DebtTurnoversView
        turnovers={turnovers}
        startDate={new Date(turnoverFilter.startDate)}
        endDate={new Date(turnoverFilter.endDate)}
        onStartDateChange={handleTurnoverStartDateChange}
        onEndDateChange={handleTurnoverEndDateChange}
        isLoading={turnoversLoading}
      />
    </div>
  );
}