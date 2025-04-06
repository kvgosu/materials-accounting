'use client';

import React, { Suspense, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Button,
    Badge,
    Alert,
    AlertDescription,
    Input,
    DataList,
    Column,
    useToast
} from '@materials-accounting/ui';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../../../components/ErrorBoundary';
import {
    usePriceList,
    usePriceListItems,
    useMaterials,
    useLinkItemToMaterial,
    useDeactivatePriceList,
    PriceListFragments_priceListDetails,
    PriceListFragments_priceListItemList,
    SupplierFragments_supplier,
    PriceListFragments_priceList,
    MaterialFragments_list,
    MaterialFragments_material
} from '@materials-accounting/graphql';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { RefreshCw, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useFragment } from 'react-relay';

const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export default function PriceListDetailPage() {
    const params = useParams();
    const supplierId = params.id as string;
    const priceListId = params.priceListId as string;

    return (
        <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
            <Suspense fallback={<div>Загрузка данных прайс-листа...</div>}>
                <PriceListDetailContent supplierId={supplierId} priceListId={priceListId} />
            </Suspense>
        </ErrorBoundary>
    );
}

function PriceListDetailContent({ supplierId, priceListId }: { supplierId: string; priceListId: string }) {
    const router = useRouter();
    const { toast } = useToast();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [linkingItem, setLinkingItem] = useState<string | null>(null);
    const [selectedMaterial, setSelectedMaterial] = useState<string>('');
    const [linkingLoading, setLinkingLoading] = useState(false);

    // Функция для повторных попыток выполнения операций
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
                    description: `Повторная попытка через ${RETRY_DELAY / 1000} сек. Осталось попыток: ${retries}`,
                    variant: 'default',
                });
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                return withRetry(operation, retries - 1);
            }
            throw error;
        }
    };

    // Загрузка данных
    const priceListResult = usePriceList(priceListId);
    const priceListItemsResult = usePriceListItems(
        priceListId,
        page * pageSize,
        pageSize,
        search || undefined
    );

    // Используем useFragment для извлечения данных прайс-листа
    const priceListData = useFragment(
        PriceListFragments_priceListDetails,
        (priceListResult as any)?.price_list || null
    );

    const priceListBasicData = useFragment(
        PriceListFragments_priceList,
        priceListData
    );

    const supplierData = useFragment(
        SupplierFragments_supplier,
        (priceListData as any)?.supplier
    );

    // Используем useFragment для извлечения данных позиций прайс-листа
    const priceListItemsData = useFragment(
        PriceListFragments_priceListItemList,
        (priceListItemsResult as any)?.price_list_items || null
    );

    // Преобразуем в обычные массивы
    const priceList = priceListData;
    const priceListItems = Array.isArray(priceListItemsData) ? priceListItemsData : [];

    const materialsResult = useMaterials(0, 1000); // Загружаем все материалы для связывания
    const materialsData = useFragment(
        MaterialFragments_list,
        (materialsResult as any)?.materials || null
    );

    const { linkItemToMaterial } = useLinkItemToMaterial();
    const { deactivatePriceList } = useDeactivatePriceList();

    // Получение списка материалов
    const materials = Array.isArray(materialsData) ? materialsData : [];

    function MaterialDisplay({ materialRef }: { materialRef: any }) {
        // Используем useFragment для извлечения данных материала
        const materialData = useFragment(
            MaterialFragments_material,
            materialRef
        );

        // Если материал не связан, показываем соответствующее сообщение
        if (!materialData) return <>Не связан</>;

        // Если материал связан, отображаем его название и единицу измерения
        return <>{materialData.name} ({materialData.unit})</>;
    }

    // Обработчик поиска
    const handleSearch = () => {
        // Сбрасываем страницу при поиске
        setPage(0);
        // Перезагружаем данные с новым поисковым запросом
        router.refresh();
    };

    // Обработчик связывания позиции с материалом
    const handleLinkToMaterial = async (itemId: string) => {
        if (!selectedMaterial) return;

        setLinkingLoading(true);
        try {
            await withRetry(() => linkItemToMaterial(itemId, selectedMaterial));

            toast({
                title: 'Успешно',
                description: 'Позиция успешно связана с материалом',
            });

            setLinkingItem(null);
            setSelectedMaterial('');

            // Обновляем данные
            router.refresh();
        } catch (error: any) {
            toast({
                title: 'Ошибка',
                description: error.message || 'Произошла ошибка при связывании с материалом',
                variant: 'destructive',
            });
        } finally {
            setLinkingLoading(false);
        }
    };

    // Обработчик деактивации прайс-листа
    const handleDeactivatePriceList = async () => {
        try {
            await withRetry(() => deactivatePriceList(priceListId));

            toast({
                title: 'Прайс-лист деактивирован',
                description: 'Прайс-лист успешно деактивирован',
            });

            // Возвращаемся на страницу поставщика
            router.push(`/suppliers/${supplierId}/detail`);
        } catch (error: any) {
            toast({
                title: 'Ошибка',
                description: error.message || 'Произошла ошибка при деактивации прайс-листа',
                variant: 'destructive',
            });
        }
    };

    // Проверка наличия данных прайс-листа
    if (!priceList) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertDescription>
                        Данные прайс-листа не найдены.
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
                            onClick={() => router.push(`/suppliers/${supplierId}/detail`)}
                        >
                            Вернуться к поставщику
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // Определение колонок для таблицы позиций
    const columns: Column<any>[] = [
        {
            id: 'supplier_code',
            header: 'Код',
            accessorKey: 'supplier_code',
            cell: (item) => item.supplier_code || 'Н/Д',
            sortable: true
        },
        {
            id: 'name',
            header: 'Наименование',
            accessorKey: 'name',
            sortable: true
        },
        {
            id: 'article',
            header: 'Артикул',
            accessorKey: 'article',
            cell: (item) => item.article || 'Н/Д',
            sortable: true
        },
        {
            id: 'price',
            header: 'Цена',
            accessorKey: 'price',
            cell: (item) => item.price ? item.price.toFixed(2) : 'Н/Д',
            sortable: true
        },
        {
            id: 'vat_rate',
            header: 'НДС (%)',
            accessorKey: 'vat_rate',
            cell: (item) => `${item.vat_rate}%`,
            sortable: true
        },
        {
            id: 'availability',
            header: 'Наличие',
            accessorKey: 'availability',
            sortable: true
        },
        {
            id: 'material',
            header: 'Материал',
            cell: (item) => {
                if (linkingItem === item.id) {
                    return (
                        <div className="flex space-x-2">
                            <div className="w-64">
                                <Select
                                    value={selectedMaterial || undefined}
                                    onValueChange={setSelectedMaterial}
                                >
                                    <SelectTrigger disabled={linkingLoading}>
                                        <SelectValue placeholder="Выберите материал" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white'>
                                        {materials.map((material: any) => (
                                            <SelectItem key={material.id} value={material.id}>
                                                {material.name} ({material.unit})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleLinkToMaterial(item.id);
                                }}
                                disabled={linkingLoading || !selectedMaterial}
                            >
                                {linkingLoading ? '...' : 'ОК'}
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLinkingItem(null);
                                    setSelectedMaterial('');
                                }}
                                disabled={linkingLoading}
                            >
                                Отмена
                            </Button>
                        </div>
                    );
                } else {
                    // Используем компонент для отображения материала
                    return <MaterialDisplay materialRef={item.material} />;
                }
            },
            sortable: false
        },
        {
            id: 'actions',
            header: 'Действия',
            cell: (item) => {
                if (!item.material && linkingItem !== item.id) {
                    return (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLinkingItem(item.id);
                            }}
                        >
                            Связать с материалом
                        </Button>
                    );
                }
                return null;
            },
            sortable: false
        }
    ];

    // Пагинация для позиций прайс-листа
    const paginationInfo = {
        pageIndex: page,
        pageSize: pageSize,
        totalCount: priceListItems.length, // В реальности это должно быть общее количество
        totalPages: Math.ceil(priceListItems.length / pageSize),
        hasNextPage: (page + 1) * pageSize < priceListItems.length,
        hasPrevPage: page > 0
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/suppliers/${supplierId}/detail`)}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Назад к поставщику
                    </Button>
                    <h1 className="text-3xl font-bold">Прайс-лист</h1>
                    {priceList.is_active ? (
                        <Badge variant="default">Активный</Badge>
                    ) : (
                        <Badge variant="secondary">Неактивный</Badge>
                    )}
                </div>
                <div className="flex space-x-2">
                    {priceList.is_active && (
                        <Button
                            variant="outline"
                            onClick={handleDeactivatePriceList}
                        >
                            Деактивировать прайс-лист
                        </Button>
                    )}
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Обновить
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Информация о прайс-листе</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium">Поставщик:</p>
                            <p>
                                <Link
                                    href={`/suppliers/${supplierId}/detail`}
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    {supplierData?.name || 'Не указан'}
                                </Link>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Дата прайс-листа:</p>
                            <p>
                                {priceListBasicData?.date
                                    ? format(parseISO(priceListBasicData.date), 'dd MMMM yyyy', { locale: ru })
                                    : 'Н/Д'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Файл:</p>
                            <p>{priceListBasicData?.file_name || 'Без имени'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Статус:</p>
                            <Badge variant={priceListBasicData?.is_active ? 'default' : 'secondary'}>
                                {priceListBasicData?.is_active ? 'Активный' : 'Неактивный'}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Создан:</p>
                            <p>
                                {priceListBasicData?.created_at
                                    ? format(parseISO(priceListBasicData.created_at), 'dd.MM.yyyy HH:mm')
                                    : 'Н/Д'}
                            </p>
                        </div>
                        {priceList.updated_at && (
                            <div>
                                <p className="text-sm font-medium">Обновлен:</p>
                                <p>{format(parseISO(priceListBasicData.updated_at), 'dd.MM.yyyy HH:mm')}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Позиции прайс-листа</h3>
                <div className="flex space-x-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Поиск по наименованию..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleSearch}>Поиск</Button>
                </div>
            </div>

            <DataList
                columns={columns}
                data={priceListItems}
                keyField="id"
                isLoading={false}
                noDataMessage="Позиции прайс-листа не найдены"
                paginationInfo={paginationInfo}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
}