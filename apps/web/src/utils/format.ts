// apps/web/src/utils/format.ts

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatMoney(value: number | string, options: { currency?: string; minimumFractionDigits?: number } = {}) {
  const { currency = 'RUB', minimumFractionDigits = 2 } = options;
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return '0,00 ₽';
  }
  
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits,
  }).format(numValue);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function formatDate(dateString: string): string {
  try {
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) {
      return dateString; 
    }
    const date = new Date(timestamp);
    return format(date, 'dd.MM.yyyy', { locale: ru });
  } catch (e) {
    console.error('Ошибка при форматировании даты:', e);
    return dateString;
  }
}

export function formatDateTime(dateTimeString: string): string {
  try {
    const date = new Date(dateTimeString);
    return format(date, 'dd.MM.yyyy HH:mm', { locale: ru });
  } catch (e) {
    console.error('Ошибка при форматировании даты и времени:', e);
    return dateTimeString;
  }
}

export function truncateText(text: string, maxLength = 50): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function formatNumber(value: number | string, options: { minimumFractionDigits?: number } = {}) {
  const { minimumFractionDigits = 0 } = options;
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return '0';
  }
  
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits,
  }).format(numValue);
}

export function formatContractStatus(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'Активный';
    case 'INACTIVE':
      return 'Неактивный';
    default:
      return status || 'Неизвестно';
  }
}

export function formatInvoiceStatus(status: string): string {
  switch (status) {
    case 'CREATED':
      return 'Создана';
    case 'PROCESSED':
      return 'Обработана';
    case 'CLOSED':
      return 'Закрыта';
    default:
      return status || 'Неизвестно';
  }
}

export function formatTransactionType(type: string): string {
  switch (type) {
    case 'CLIENT_DEBT':
      return 'Долг клиенту';
    case 'SUPPLIER_DEBT':
      return 'Долг поставщику';
    case 'CLIENT_PAYMENT':
      return 'Оплата от клиента';
    case 'SUPPLIER_PAYMENT':
      return 'Оплата поставщику';
    default:
      return type || 'Неизвестно';
  }
}