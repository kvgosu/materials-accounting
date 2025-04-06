import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { formatCurrency, formatPercent } from '../../utils';
import { Badge } from '../common/Badge';

// Статусы накладной
export enum InvoiceStatus {
  CREATED = 'CREATED',
  PROCESSED = 'PROCESSED',
  CLOSED = 'CLOSED',
}

// Интерфейс для сводной информации о накладной
export interface InvoiceSummaryProps {
  number: string;
  date: string | Date; // ISO формат даты или объект Date
  client: {
    id: string;
    name: string;
  };
  supplier: {
    id: string;
    name: string;
  };
  contract: {
    id: string;
    number: string;
    markupPercentage: number;
  };
  totalAmount: number;
  totalWithMarkup: number;
  status: InvoiceStatus | string;
}

/**
 * Компонент для отображения сводной информации о накладной
 */
export function InvoiceSummary({
  number,
  date,
  client,
  supplier,
  contract,
  totalAmount,
  totalWithMarkup,
  status,
}: InvoiceSummaryProps) {
  // Преобразуем дату в объект Date, если она передана в формате строки
  const invoiceDate = typeof date === 'string' ? new Date(date) : date;

  // Функция для получения текста и варианта бейджа статуса
  const getStatusBadge = () => {
    switch (status) {
      case InvoiceStatus.CREATED:
        return { text: 'Создана', variant: 'outline' as const };
      case InvoiceStatus.PROCESSED:
        return { text: 'Обработана', variant: 'default' as const };
      case InvoiceStatus.CLOSED:
        return { text: 'Закрыта', variant: 'success' as const };
      default:
        return { text: 'Неизвестно', variant: 'outline' as const };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Накладная #{number}</CardTitle>
        <Badge variant={statusBadge.variant}>{statusBadge.text}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Общая информация</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Дата:</dt>
                <dd>{format(invoiceDate, 'PPP', { locale: ru })}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Клиент:</dt>
                <dd>{client.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Поставщик:</dt>
                <dd>{supplier.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Договор:</dt>
                <dd>№{contract.number}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Наценка:</dt>
                <dd>{formatPercent(contract.markupPercentage)}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-medium mb-2">Финансовая информация</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Сумма без наценки:</dt>
                <dd>{formatCurrency(totalAmount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Размер наценки:</dt>
                <dd>{formatCurrency(totalWithMarkup - totalAmount)}</dd>
              </div>
              <div className="flex justify-between font-bold">
                <dt>Итоговая сумма:</dt>
                <dd>{formatCurrency(totalWithMarkup)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}