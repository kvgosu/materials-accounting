'use client';

import React, { Suspense } from 'react';
import { useFragment } from 'react-relay';
import Link from 'next/link';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Button,
    Badge,
    Alert,
    AlertDescription
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../../components/ErrorBoundary';
import {
    ContractFragments_contractDetails,
    useContract
} from '@materials-accounting/graphql';
import { formatDate, formatCurrency } from '../../../../utils/format';
import { useParams, useRouter } from 'next/navigation';
import {
    Calendar,
    FileText,
    Percent,
    RefreshCw,
    CreditCard,
    CheckCircle,
    XCircle,
    TrendingUp
} from 'lucide-react';

export default function ContractDetailPage() {
    const params = useParams();
    const contractId = params.id as string;

    return (
        <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
            <Suspense fallback={<div>Загрузка данных договора...</div>}>
                <ContractDetailContent contractId={contractId} />
            </Suspense>
        </ErrorBoundary>
    );
}

function ContractDetailContent({ contractId }: { contractId: string }) {
    const router = useRouter();

    // Использование хука для загрузки данных договора
    const contractResult = useContract(contractId);

    // Правильная обработка фрагмента с проверкой наличия данных
    const contract = useFragment(
        ContractFragments_contractDetails,
        (contractResult && (contractResult as any)?.contract) ? (contractResult as any).contract : null
    );

    // Проверка на наличие данных договора
    if (!contractResult || !(contractResult as any)?.contract) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertDescription>
                        Данные договора не найдены.
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-2"
                            onClick={() => window.location.reload()}
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Обновить
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => router.push('/contracts')}
                        >
                            Вернуться к списку
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // Проверка на наличие id договора после получения фрагмента
    if (!contract || !contract.id) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertDescription>
                        Договор не найден в базе данных.
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => router.push('/contracts')}
                        >
                            Вернуться к списку
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // Безопасное получение связанных данных
    const contractData = contract as any;

    // Безопасное извлечение списка накладных
    const invoicesArray = Array.isArray(contractData.invoices) ? contractData.invoices : [];

    // Подсчет общего количества накладных
    const invoicesCount = invoicesArray.length;

    // Проверка активности договора
    const isActive = contractData.status === 'ACTIVE';

    // Проверка срока действия
    const hasExpired = contractData.expiration_date
        ? new Date(contractData.expiration_date) < new Date()
        : false;

    // Вычисление даты окончания договора
    const expirationInfo = contractData.expiration_date
        ? `до ${formatDate(contractData.expiration_date)}`
        : 'Бессрочный';

    // Вычисление общей суммы по накладным
    const totalInvoicesAmount = invoicesArray.reduce((sum: number, invoice: any) => {
        return sum + (typeof invoice.total_amount === 'number' ? invoice.total_amount : 0);
    }, 0);

    // Вычисление общей суммы с наценкой
    const totalWithMarkup = invoicesArray.reduce((sum: number, invoice: any) => {
        return sum + (typeof invoice.total_with_markup === 'number' ? invoice.total_with_markup : 0);
    }, 0);

    // Вычисление суммы наценки
    const markupAmount = totalWithMarkup - totalInvoicesAmount;

    // Расчет средней наценки в процентах (для отображения)
    const avgMarkupPercent = totalInvoicesAmount > 0
        ? ((totalWithMarkup / totalInvoicesAmount) - 1) * 100
        : contractData.markup_percentage || 0;

    // Получение последней накладной
    const latestInvoice = invoicesArray.length > 0
        ? [...invoicesArray].sort((a, b) => {
            if (!a.date || !b.date) return 0;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })[0]
        : null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Договор {contractData.number || 'Без номера'}</h1>
                    {contractData.client && (
                        <p className="text-muted-foreground">
                            Клиент: <Link href={`/clients/${contractData.client.id}/detail`} className="hover:underline">
                                {contractData.client.name || 'Без названия'}
                            </Link>
                        </p>
                    )}
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Обновить
                    </Button>
                    <Link href={`/contracts/${contractId}`}>
                        <Button variant="outline">Редактировать</Button>
                    </Link>
                </div>
            </div>

            {/* Статус договора */}
            <div className="flex items-center space-x-2">
                <Badge
                    variant={isActive ? (hasExpired ? 'outline' : 'success') : 'outline'}
                    className="px-3 py-1 text-base"
                >
                    {isActive
                        ? (hasExpired ? 'Активен (срок истек)' : 'Активен')
                        : 'Неактивен'}
                </Badge>
                {hasExpired && (
                    <p className="text-destructive">
                        Срок действия договора истек!
                    </p>
                )}
            </div>

            {/* KPI панель */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Наценка договора */}
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Наценка по договору</p>
                            <h3 className="text-2xl font-bold mt-1">
                                {contractData.markup_percentage}%
                            </h3>
                        </div>
                        <div className="rounded-full p-2 bg-blue-100">
                            <Percent className="h-5 w-5 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                {/* Количество накладных */}
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Накладные</p>
                            <h3 className="text-2xl font-bold mt-1">
                                {invoicesCount}
                            </h3>
                        </div>
                        <div className="rounded-full p-2 bg-green-100">
                            <FileText className="h-5 w-5 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                {/* Срок действия */}
                <Card className={hasExpired ? 'border-red-300' : ''}>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Срок действия</p>
                            <h3 className="text-xl font-bold mt-1">
                                {expirationInfo}
                            </h3>
                        </div>
                        <div className="rounded-full p-2 bg-purple-100">
                            <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>

                {/* Общая сумма по накладным */}
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Общая сумма</p>
                            <h3 className="text-lg font-bold mt-1">
                                {formatCurrency(totalWithMarkup)}
                            </h3>
                        </div>
                        <div className="rounded-full p-2 bg-amber-100">
                            <CreditCard className="h-5 w-5 text-amber-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Карточка информации о договоре */}
                <Card>
                    <CardHeader>
                        <CardTitle>Основная информация</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <span className="text-muted-foreground">Номер договора:</span>
                                <p className="font-medium">{contractData.number || 'Не указан'}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Дата заключения:</span>
                                <p>{contractData.date ? formatDate(contractData.date) : 'Не указана'}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Клиент:</span>
                                {contractData.client ? (
                                    <p>
                                        <Link href={`/clients/${contractData.client.id}/detail`} className="text-blue-600 hover:text-blue-900">
                                            {contractData.client.name}
                                        </Link>
                                    </p>
                                ) : (
                                    <p>Не указан</p>
                                )}
                            </div>
                            <div>
                                <span className="text-muted-foreground">Срок действия:</span>
                                <p>{expirationInfo}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Статус:</span>

                                <Badge
                                    variant={isActive ? 'success' : 'outline'}
                                >
                                    <p className="flex items-center mt-1">
                                        {isActive ? 'Активен' : 'Неактивен'}
                                    </p>
                                </Badge>

                            </div>
                            <div>
                                <span className="text-muted-foreground">Дата создания:</span>
                                <p>{contractData.created_at ? formatDate(contractData.created_at) : 'Не указана'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Карточка финансовых показателей */}
                <Card>
                    <CardHeader>
                        <CardTitle>Финансовые показатели</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <span className="text-muted-foreground">Процент наценки:</span>
                                <p className="font-bold">{contractData.markup_percentage}%</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Общая сумма закупки:</span>
                                <p>{formatCurrency(totalInvoicesAmount)}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Общая сумма с наценкой:</span>
                                <p className="font-bold">{formatCurrency(totalWithMarkup)}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Сумма наценки:</span>
                                <p className="text-success font-semibold">+{formatCurrency(markupAmount)}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Средняя наценка по факту:</span>
                                <p>{avgMarkupPercent.toFixed(2)}%</p>
                            </div>
                            {latestInvoice && (
                                <div>
                                    <span className="text-muted-foreground">Последняя накладная:</span>
                                    <p>
                                        <Link
                                            href={`/invoices/${latestInvoice.id}`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            {latestInvoice.number || 'Без номера'}
                                        </Link>{' '}
                                        от {formatDate(latestInvoice.date)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Вкладка с накладными */}
            <Tabs defaultValue="invoices">
                <TabsList>
                    <TabsTrigger value="invoices">Накладные</TabsTrigger>
                </TabsList>

                <TabsContent value="invoices" className="mt-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Накладные по договору</CardTitle>
                            <Button variant="outline" size="sm">
                                <Link href={`/invoices/new?contractId=${contractId}`}>
                                    Добавить накладную
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {invoicesArray.length > 0 ? (
                                <div className="space-y-4">
                                    {invoicesArray.map((invoice: any) => (
                                        <div
                                            key={invoice.id || Math.random().toString()}
                                            className="border rounded-md p-4 flex justify-between items-center"
                                        >
                                            <div>
                                                <Link
                                                    href={`/invoices/${invoice.id}`}
                                                    className="text-blue-600 hover:text-blue-900 font-medium"
                                                >
                                                    {invoice.number || "Без номера"}
                                                </Link>
                                                <div className="text-sm text-muted-foreground">
                                                    {invoice.date ? formatDate(invoice.date) : "Без даты"} |
                                                    Сумма: {typeof invoice.total_with_markup === 'number' ? formatCurrency(invoice.total_with_markup) : "Не указана"}
                                                </div>
                                                {invoice.supplier && (
                                                    <div className="text-sm text-muted-foreground">
                                                        Поставщик: <Link href={`/suppliers/${invoice.supplier.id}/detail`} className="hover:underline">
                                                            {invoice.supplier.name || "Без названия"}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                            <Badge variant={
                                                invoice.status === 'CREATED' ? 'outline' :
                                                    invoice.status === 'PROCESSED' ? 'default' :
                                                        'success'
                                            }>
                                                {invoice.status === 'CREATED' ? 'Создана' :
                                                    invoice.status === 'PROCESSED' ? 'Обработана' :
                                                        'Закрыта'}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">По договору нет накладных</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Секция динамики суммы накладных по договору */}
            {invoicesArray.length > 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Динамика по договору</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">Суммарные показатели</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                    <div className="border rounded-md p-3">
                                        <p className="text-sm text-muted-foreground">Закупка</p>
                                        <p className="text-lg font-bold">{formatCurrency(totalInvoicesAmount)}</p>
                                    </div>
                                    <div className="border rounded-md p-3">
                                        <p className="text-sm text-muted-foreground">С наценкой</p>
                                        <p className="text-lg font-bold">{formatCurrency(totalWithMarkup)}</p>
                                    </div>
                                    <div className="border rounded-md p-3">
                                        <p className="text-sm text-muted-foreground">Наценка</p>
                                        <p className="text-lg font-bold text-success">+{formatCurrency(markupAmount)}</p>
                                    </div>
                                    <div className="border rounded-md p-3">
                                        <p className="text-sm text-muted-foreground">Средняя наценка</p>
                                        <p className="text-lg font-bold">{avgMarkupPercent.toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-2">Накладные по месяцам</h3>
                                <div className="border rounded-md p-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2">Период</th>
                                                <th className="text-right py-2">Количество</th>
                                                <th className="text-right py-2">Закупка</th>
                                                <th className="text-right py-2">С наценкой</th>
                                                <th className="text-right py-2">Сумма наценки</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Группировка накладных по месяцам */}
                                            {(() => {
                                                // Группируем накладные по месяцам
                                                const months: Record<string, {
                                                    count: number,
                                                    amount: number,
                                                    amountWithMarkup: number,
                                                    markup: number
                                                }> = {};

                                                // Для каждой накладной
                                                invoicesArray.forEach((invoice: any) => {
                                                    if (!invoice.date) return;

                                                    // Получаем месяц и год
                                                    const date = new Date(invoice.date);
                                                    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                                                    const amount = typeof invoice.total_amount === 'number' ? invoice.total_amount : 0;
                                                    const amountWithMarkup = typeof invoice.total_with_markup === 'number' ? invoice.total_with_markup : 0;

                                                    // Добавляем или обновляем запись в группе
                                                    if (!months[monthKey]) {
                                                        months[monthKey] = {
                                                            count: 0,
                                                            amount: 0,
                                                            amountWithMarkup: 0,
                                                            markup: 0
                                                        };
                                                    }

                                                    months[monthKey].count += 1;
                                                    months[monthKey].amount += amount;
                                                    months[monthKey].amountWithMarkup += amountWithMarkup;
                                                    months[monthKey].markup += (amountWithMarkup - amount);
                                                });

                                                // Сортируем месяцы в обратном хронологическом порядке
                                                const sortedMonths = Object.entries(months).sort((a, b) =>
                                                    b[0].localeCompare(a[0])
                                                );

                                                // Выводим строки таблицы
                                                return sortedMonths.map(([monthKey, data]) => {
                                                    const [year, month] = monthKey.split('-');
                                                    const monthNames = [
                                                        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                                                        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                                                    ];
                                                    const monthName = monthNames[parseInt(month) - 1];

                                                    return (
                                                        <tr key={monthKey} className="border-b hover:bg-gray-50">
                                                            <td className="py-2">{monthName} {year}</td>
                                                            <td className="text-right py-2">{data.count}</td>
                                                            <td className="text-right py-2">{formatCurrency(data.amount)}</td>
                                                            <td className="text-right py-2">{formatCurrency(data.amountWithMarkup)}</td>
                                                            <td className="text-right py-2 text-success">+{formatCurrency(data.markup)}</td>
                                                        </tr>
                                                    );
                                                });
                                            })()}
                                        </tbody>
                                        <tfoot>
                                            <tr className="font-bold bg-gray-50">
                                                <td className="py-2">Итого</td>
                                                <td className="text-right py-2">{invoicesCount}</td>
                                                <td className="text-right py-2">{formatCurrency(totalInvoicesAmount)}</td>
                                                <td className="text-right py-2">{formatCurrency(totalWithMarkup)}</td>
                                                <td className="text-right py-2 text-success">+{formatCurrency(markupAmount)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}