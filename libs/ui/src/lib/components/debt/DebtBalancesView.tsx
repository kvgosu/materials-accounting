import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/common/Tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/common/Table';
import { formatCurrency } from '../../utils';
import { DatePicker } from '../../components/common/DatePicker';
import { DebtDimension } from '../../types/debt'; // Импорт из общего места

// Интерфейс для остатка долга
export interface DebtBalance {
  id: string;
  client?: {
    id: string;
    name: string;
  };
  supplier?: {
    id: string;
    name: string;
  };
  amount: number;
  dimension: DebtDimension | string;
  asOfDate: string; // ISO format
}

export interface DebtBalancesViewProps {
  balances: DebtBalance[];
  asOfDate: Date;
  onDateChange: (date: Date) => void;
  isLoading?: boolean;
}

/**
 * Компонент для отображения остатков по долгам
 */
export function DebtBalancesView({
  balances,
  asOfDate,
  onDateChange,
  isLoading = false,
}: DebtBalancesViewProps) {
  // Фильтруем остатки по измерению
  const clientBalances = balances.filter(
    (balance) => balance.dimension === DebtDimension.CLIENT_DEBT && balance.client
  );
  const supplierBalances = balances.filter(
    (balance) => balance.dimension === DebtDimension.SUPPLIER_DEBT && balance.supplier
  );

  // Суммы остатков
  const totalClientDebt = clientBalances.reduce((sum, balance) => sum + balance.amount, 0);
  const totalSupplierDebt = supplierBalances.reduce((sum, balance) => sum + balance.amount, 0);

  // Если данные загружаются, показываем скелетон
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl animate-pulse bg-muted h-8 w-40 rounded"></CardTitle>
            <div className="animate-pulse bg-muted h-10 w-40 rounded"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse bg-muted h-10 w-full mb-4 rounded"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-muted h-12 w-full rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Функция для отображения остатков долгов клиентов
  const renderClientBalances = () => {
    if (clientBalances.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
            Долгов клиентам не обнаружено
          </TableCell>
        </TableRow>
      );
    }

    return clientBalances.map((balance) => (
      <TableRow key={balance.id}>
        <TableCell>{balance.client?.name}</TableCell>
        <TableCell className="text-right">{formatCurrency(balance.amount)}</TableCell>
        <TableCell className="text-right">
          {format(new Date(balance.asOfDate), 'dd.MM.yyyy', { locale: ru })}
        </TableCell>
      </TableRow>
    ));
  };

  // Функция для отображения остатков долгов поставщикам
  const renderSupplierBalances = () => {
    if (supplierBalances.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
            Долгов поставщикам не обнаружено
          </TableCell>
        </TableRow>
      );
    }

    return supplierBalances.map((balance) => (
      <TableRow key={balance.id}>
        <TableCell>{balance.supplier?.name}</TableCell>
        <TableCell className="text-right">{formatCurrency(balance.amount)}</TableCell>
        <TableCell className="text-right">
          {format(new Date(balance.asOfDate), 'dd.MM.yyyy', { locale: ru })}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Остатки по долгам</CardTitle>
          <DatePicker
            date={asOfDate}
            setDate={(date:any) => date && onDateChange(date)}
            placeholder="Выберите дату"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="clients">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="clients">
              Долги клиентам ({clientBalances.length})
            </TabsTrigger>
            <TabsTrigger value="suppliers">
              Долги поставщикам ({supplierBalances.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Клиент</TableHead>
                      <TableHead className="text-right">Сумма</TableHead>
                      <TableHead className="text-right">Дата</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {renderClientBalances()}
                  </TableBody>
                </Table>
                <div className="p-4 border-t">
                  <div className="flex justify-between items-center font-bold">
                    <span>Общая сумма долгов клиентам:</span>
                    <span>{formatCurrency(totalClientDebt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suppliers">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Поставщик</TableHead>
                      <TableHead className="text-right">Сумма</TableHead>
                      <TableHead className="text-right">Дата</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {renderSupplierBalances()}
                  </TableBody>
                </Table>
                <div className="p-4 border-t">
                  <div className="flex justify-between items-center font-bold">
                    <span>Общая сумма долгов поставщикам:</span>
                    <span>{formatCurrency(totalSupplierDebt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}