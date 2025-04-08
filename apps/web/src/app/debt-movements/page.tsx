"use client";

import React, { useState, useCallback } from 'react';
import { 
  DebtBalancesView, 
  DebtTurnoversView 
} from '@materials-accounting/ui';
import { 
  useDebtBalances, 
  useDebtTurnovers 
} from '@materials-accounting/graphql/hooks';
import { Suspense } from 'react';
import { useFragment, graphql } from 'react-relay';
import { DebtDimension } from '@materials-accounting/types';

// Импортируем нужные фрагменты
import { 
  DebtFragments_debtBalanceList, 
  DebtFragments_debtTurnoverList 
} from '@materials-accounting/graphql'; // Путь может отличаться в вашем проекте

// Компонент-заглушка для отображения во время загрузки
const LoadingFallback = () => (
  <div className="p-4 bg-gray-100 rounded-md animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>
);

function BalancesDataDisplay({ asOfDate, onDateChange }:{ asOfDate:any, onDateChange:any }) {
  console.log("=== BalancesDataDisplay ===");
  console.log("Запрашиваем данные на дату:", asOfDate.toISOString().split('T')[0]);
  
  // Получаем данные через хук
  const { debtBalances } = useDebtBalances(
    undefined, 
    undefined, 
    undefined, 
    asOfDate.toISOString().split('T')[0]
  );
  
  console.log("Получены ссылки на фрагменты:", debtBalances);
  
  // Используем фрагмент для извлечения данных
  const balancesData = useFragment(
    DebtFragments_debtBalanceList,
    debtBalances
  );
  
  console.log("Распакованные данные из фрагментов:", balancesData);
  
  // Адаптируем данные для компонента
  const adaptedBalances = (balancesData || []).map((balance:any) => {
    console.log("Обрабатываем распакованный баланс:", balance);
    return {
      id: balance.id,
      client: balance.client,
      supplier: balance.supplier,
      amount: balance.balance,
      dimension: balance.dimension,
      asOfDate: balance.as_of_date
    };
  });

  console.log("Итоговые адаптированные данные:", adaptedBalances);
  
  return (
    <DebtBalancesView
      balances={adaptedBalances}
      asOfDate={asOfDate}
      onDateChange={onDateChange}
      isLoading={false}
    />
  );
}

function TurnoversDataDisplay({ startDate, endDate, onStartDateChange, onEndDateChange }:
  { startDate:any, endDate:any, onStartDateChange:any, onEndDateChange:any }) {
  console.log("=== TurnoversDataDisplay ===");
  
  // Получаем данные через хук
  const { debtTurnovers } = useDebtTurnovers(
    startDate.toISOString().split('T')[0], 
    endDate.toISOString().split('T')[0],   
    undefined, 
    undefined, 
    undefined  
  );
  
  console.log("Получены ссылки на фрагменты оборотов:", debtTurnovers);
  
  // Используем фрагмент для извлечения данных
  const turnoversData = useFragment(
    DebtFragments_debtTurnoverList,
    debtTurnovers
  );
  
  console.log("Распакованные данные оборотов из фрагментов:", turnoversData);
  
  // Адаптируем данные для компонента
  const adaptedTurnovers = (turnoversData || []).map((turnover:any) => {
    console.log("Обрабатываем распакованный оборот:", turnover);
    return {
      client: turnover.client,
      supplier: turnover.supplier,
      debit: turnover.debit,
      credit: turnover.credit,
      dimension: turnover.dimension,
      startDate: turnover.start_date,
      endDate: turnover.end_date
    };
  });
  
  console.log("Итоговые адаптированные данные оборотов:", adaptedTurnovers);
  
  return (
    <DebtTurnoversView
      turnovers={adaptedTurnovers}
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      isLoading={false}
    />
  );
}

function BalancesContainer({ asOfDate, onDateChange, isKey }:
  { asOfDate:any, onDateChange:any, isKey:any }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="mt-4" key={isKey}>
        <BalancesDataDisplay
          asOfDate={asOfDate}
          onDateChange={onDateChange}
        />
      </div>
    </Suspense>
  );
}

function TurnoversContainer({ startDate, endDate, onStartDateChange, onEndDateChange, isKey }:
  { startDate:any, endDate:any, onStartDateChange:any, onEndDateChange:any, isKey:any }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="mt-4" key={isKey}>
        <TurnoversDataDisplay
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
      </div>
    </Suspense>
  );
}

export default function DebtMovementsPage() {
  const [asOfDate, setAsOfDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [loadBalances, setLoadBalances] = useState(false);
  const [loadTurnovers, setLoadTurnovers] = useState(false);
  const [balancesKey, setBalancesKey] = useState(1);
  const [turnoversKey, setTurnoversKey] = useState(1);
  
  const handleBalanceDateChange = useCallback((date: Date) => {
    setAsOfDate(date);
    setLoadBalances(false);
    setBalancesKey(prev => prev + 1);
  }, []);
  
  const handleTurnoverStartDateChange = useCallback((date: Date) => {
    setStartDate(date);
    setLoadTurnovers(false);
    setTurnoversKey(prev => prev + 1);
  }, []);
  
  const handleTurnoverEndDateChange = useCallback((date: Date) => {
    setEndDate(date);
    setLoadTurnovers(false);
    setTurnoversKey(prev => prev + 1);
  }, []);
  
  const handleLoadBalances = useCallback(() => {
    setLoadBalances(true);
  }, []);
  
  const handleLoadTurnovers = useCallback(() => {
    setLoadTurnovers(true);
  }, []);
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Регистр долгов</h1>
      <div className="p-4 border rounded-md">
        <h2 className="text-lg font-semibold mb-4">Остатки по долгам</h2>
        <div className="flex items-center gap-4 mb-4">
          <input 
            type="date" 
            value={asOfDate.toISOString().split('T')[0]} 
            onChange={(e) => {
              if (e.target.value) {
                handleBalanceDateChange(new Date(e.target.value));
              }
            }}
            className="border p-2 rounded"
          />
          <button 
            onClick={handleLoadBalances}
            disabled={loadBalances}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Загрузить данные
          </button>
        </div>
        
        {loadBalances ? (
          <BalancesContainer
            asOfDate={asOfDate}
            onDateChange={handleBalanceDateChange}
            isKey={`balances-${balancesKey}`}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            {`Выберите дату и нажмите "Загрузить данные" для просмотра остатков`}
          </div>
        )}
      </div>
      <div className="p-4 border rounded-md">
        <h2 className="text-lg font-semibold mb-4">Обороты по долгам</h2>
        <div className="flex items-center gap-4 mb-4">
          <div>
            <label className="block text-sm">Начало периода</label>
            <input 
              type="date" 
              value={startDate.toISOString().split('T')[0]} 
              onChange={(e) => {
                if (e.target.value) {
                  handleTurnoverStartDateChange(new Date(e.target.value));
                }
              }}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Конец периода</label>
            <input 
              type="date" 
              value={endDate.toISOString().split('T')[0]} 
              onChange={(e) => {
                if (e.target.value) {
                  handleTurnoverEndDateChange(new Date(e.target.value));
                }
              }}
              className="border p-2 rounded"
            />
          </div>
          <button 
            onClick={handleLoadTurnovers}
            disabled={loadTurnovers}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 mt-auto"
          >
            Загрузить данные
          </button>
        </div>
        
        {loadTurnovers ? (
          <TurnoversContainer
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleTurnoverStartDateChange}
            onEndDateChange={handleTurnoverEndDateChange}
            isKey={`turnovers-${turnoversKey}`}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            {`Выберите период и нажмите "Загрузить данные" для просмотра оборотов`}
          </div>
        )}
      </div>
    </div>
  );
}