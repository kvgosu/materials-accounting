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

// Интерфейс для оборотов по долгам
export interface DebtTurnover {
  client?: {
    id: string;
    name: string;
  };
  supplier?: {
    id: string;
    name: string;
  };
  debit: number; // Приход
  credit: number; // Расход
  dimension: DebtDimension | string;
  startDate: string; // ISO format
  endDate: string; // ISO format
}

export interface DebtTurnoversViewProps {
  turnovers: DebtTurnover[];
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  isLoading?: boolean;
}

/**
 * Компонент для отображения оборотов по долгам
 */
export function DebtTurnoversView({
  turnovers,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  isLoading = false,
}: DebtTurnoversViewProps) {
  // Фильтруем обороты по измерению
  const clientTurnovers = turnovers.filter(
    (turnover) => turnover.dimension === DebtDimension.CLIENT_DEBT && turnover.client
  );
  const supplierTurnovers = turnovers.filter(
    (turnover) => turnover.dimension === DebtDimension.SUPPLIER_DEBT && turnover.supplier
  );

  // Суммы оборотов
  const totalClientDebit = clientTurnovers.reduce((sum, turnover) => sum + turnover.debit, 0);
  const totalClientCredit = clientTurnovers.reduce((sum, turnover) => sum + turnover.credit, 0);
  const totalClientBalance = totalClientDebit - totalClientCredit;

  const totalSupplierDebit = supplierTurnovers.reduce((sum, turnover) => sum + turnover.debit, 0);
  const totalSupplierCredit = supplierTurnovers.reduce((sum, turnover) => sum + turnover.credit, 0);
  const totalSupplierBalance = totalSupplierDebit - totalSupplierCredit;

  // Если данные загружаются, показываем скелетон
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl animate-pulse bg-muted h-8 w-40 rounded"></CardTitle>
            <div className="flex gap-2 animate-pulse">
              <div className="bg-muted h-10 w-32 rounded"></div>
              <div className="bg-muted h-10 w-32 rounded"></div>
            </div>
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

  // Функция для отображения оборотов по долгам клиентов
  const renderClientTurnovers = () => {
    if (clientTurnovers.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
            Оборотов по долгам клиентам не обнаружено
          </TableCell>
        </TableRow>
      );
    }

    return clientTurnovers.map((turnover, index) => (
      <TableRow key={index}>
        <TableCell>{turnover.client?.name}</TableCell>
        <TableCell className="text-right">{formatCurrency(turnover.debit)}</TableCell>
        <TableCell className="text-right">{formatCurrency(turnover.credit)}</TableCell>
        <TableCell className="text-right font-medium">
          {formatCurrency(turnover.debit - turnover.credit)}
        </TableCell>
      </TableRow>
    ));
  };

  // Функция для отображения оборотов по долгам поставщикам
  const renderSupplierTurnovers = () => {
    if (supplierTurnovers.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
            Оборотов по долгам поставщикам не обнаружено
          </TableCell>
        </TableRow>
      );
    }

    return supplierTurnovers.map((turnover, index) => (
      <TableRow key={index}>
        <TableCell>{turnover.supplier?.name}</TableCell>
        <TableCell className="text-right">{formatCurrency(turnover.debit)}</TableCell>
        <TableCell className="text-right">{formatCurrency(turnover.credit)}</TableCell>
        <TableCell className="text-right font-medium">
          {formatCurrency(turnover.debit - turnover.credit)}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-xl">Обороты по долгам</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <DatePicker
              date={startDate}
              setDate={(date:any) => date && onStartDateChange(date)}
              placeholder="Начальная дата"
            />
            <DatePicker
              date={endDate}
              setDate={(date:any) => date && onEndDateChange(date)}
              placeholder="Конечная дата"
            />
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Период: {format(startDate, 'PPP', { locale: ru })} — {format(endDate, 'PPP', { locale: ru })}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="clients">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="clients">
              Долги клиентам ({clientTurnovers.length})
            </TabsTrigger>
            <TabsTrigger value="suppliers">
              Долги поставщикам ({supplierTurnovers.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Клиент</TableHead>
                      <TableHead className="text-right">Приход</TableHead>
                      <TableHead className="text-right">Расход</TableHead>
                      <TableHead className="text-right">Сальдо</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {renderClientTurnovers()}
                  </TableBody>
                </Table>
                <div className="p-4 border-t">
                  <div className="grid grid-cols-3 gap-4 font-medium">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Приход</div>
                      <div>{formatCurrency(totalClientDebit)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Расход</div>
                      <div>{formatCurrency(totalClientCredit)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Сальдо</div>
                      <div className="font-bold">{formatCurrency(totalClientBalance)}</div>
                    </div>
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
                      <TableHead className="text-right">Приход</TableHead>
                      <TableHead className="text-right">Расход</TableHead>
                      <TableHead className="text-right">Сальдо</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {renderSupplierTurnovers()}
                  </TableBody>
                </Table>
                <div className="p-4 border-t">
                  <div className="grid grid-cols-3 gap-4 font-medium">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Приход</div>
                      <div>{formatCurrency(totalSupplierDebit)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Расход</div>
                      <div>{formatCurrency(totalSupplierCredit)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Сальдо</div>
                      <div className="font-bold">{formatCurrency(totalSupplierBalance)}</div>
                    </div>
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