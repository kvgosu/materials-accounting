'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Input, 
  DataList, 
  Column,
  Alert,
  AlertDescription,
  Badge,
  Modal,
  Label,
  DatePicker,
  useToast,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@materials-accounting/ui';
import { 
  useSuppliers, 
  useUploadPriceList,
  useGenerateTemplate,
  useDeleteSupplier,
  SupplierFragments_list
} from '@materials-accounting/graphql';
import { Plus, Search, Pencil, FileSpreadsheet, Upload, RefreshCw, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/format';
import { format } from 'date-fns';
import { useFragment } from 'react-relay';

export default function SuppliersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingSupplierID, setDeletingSupplierID] = useState<string | null>(null);
  
  // Состояние для модального окна загрузки прайс-листа
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [currentSupplierId, setCurrentSupplierId] = useState<string | null>(null);
  const [uploadDate, setUploadDate] = useState<Date | undefined>(new Date());
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<{ processed: number; skipped: number } | null>(null);

  // Получение данных
  const suppliersResult = useSuppliers(page * pageSize, pageSize, search || undefined);
  
  // Используем useFragment для получения данных из фрагментов Relay
  const fragmentData = useFragment(
    SupplierFragments_list,
    (suppliersResult as any)?.suppliers
  );
  
  const suppliers = Array.isArray(fragmentData) ? fragmentData : [];
  
  // Хуки для работы с прайс-листами и другими операциями
  const { uploadPriceList } = useUploadPriceList();
  const { generateTemplate } = useGenerateTemplate();
  const { deleteSupplier, loading: deleteLoading } = useDeleteSupplier();

  // Обработчик детали поставщика
  const handleViewSupplierDetails = (id: string) => {
    router.push(`/suppliers/${id}/detail`);
  };

  // Обработчик удаления поставщика
  const handleDeleteSupplier = async () => {
    if (!deletingSupplierID) return;
    
    setIsLoading(true);
    try {
      await deleteSupplier(deletingSupplierID);
      toast({
        title: 'Успешно',
        description: 'Поставщик успешно удален',
      });
      setDeletingSupplierID(null);
      // Обновляем страницу, чтобы отразить изменения
      forceRefresh();
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось удалить поставщика',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик открытия модального окна загрузки прайс-листа
  const handleOpenUploadModal = (supplierId: string) => {
    setCurrentSupplierId(supplierId);
    setUploadDate(new Date());
    setUploadFile(null);
    setUploadError(null);
    setUploadSuccess(null);
    setUploadModalOpen(true);
  };

  // Обработчик закрытия модального окна
  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
    setCurrentSupplierId(null);
    setUploadDate(new Date());
    setUploadFile(null);
    setUploadError(null);
    setUploadSuccess(null);
  };

  // Обработчик загрузки файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  // Обработчик загрузки прайс-листа
  const handleUploadPriceList = async () => {
    if (!currentSupplierId) {
      setUploadError('Поставщик не выбран');
      return;
    }

    if (!uploadDate) {
      setUploadError('Выберите дату прайс-листа');
      return;
    }

    if (!uploadFile) {
      setUploadError('Выберите файл прайс-листа');
      return;
    }

    setUploadLoading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const formattedDate = format(uploadDate, 'yyyy-MM-dd');
      const result = await uploadPriceList({
        supplier_id: currentSupplierId,
        date: formattedDate,
        file: uploadFile
      });
      
      setUploadSuccess({
        processed: result.upload_price_list.processed_items,
        skipped: result.upload_price_list.skipped_items
      });
      
      toast({
        title: 'Прайс-лист загружен',
        description: `Обработано позиций: ${result.upload_price_list.processed_items}, пропущено: ${result.upload_price_list.skipped_items}`,
      });
      
    } catch (err: any) {
      setUploadError(err.message || 'Произошла ошибка при загрузке прайс-листа');
      toast({
        title: 'Ошибка',
        description: err.message || 'Произошла ошибка при загрузке прайс-листа',
        variant: 'destructive',
      });
    } finally {
      setUploadLoading(false);
    }
  };

  // Обработчик для генерации шаблона прайс-листа
  const handleGenerateTemplate = async () => {
    if (!currentSupplierId) {
      setUploadError('Поставщик не выбран');
      return;
    }

    setUploadLoading(true);
    setUploadError(null);

    try {
      const result = await generateTemplate(currentSupplierId);
      
      // Создаем ссылку для автоматического скачивания
      const link = document.createElement('a');
      link.href = result.generate_template.download_url;
      link.download = 'price-list-template.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Шаблон прайс-листа',
        description: 'Шаблон успешно сгенерирован и скачивается',
      });
    } catch (error: any) {
      setUploadError(error.message || 'Произошла ошибка при генерации шаблона');
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла ошибка при генерации шаблона',
        variant: 'destructive',
      });
    } finally {
      setUploadLoading(false);
    }
  };

  // Определение колонок для таблицы поставщиков
  const columns: Column<any>[] = [
    {
      id: 'name',
      header: 'Название',
      accessorKey: 'name',
      sortable: true
    },
    {
      id: 'contactPerson',
      header: 'Контактное лицо',
      accessorKey: 'contact_person',
    },
    {
      id: 'phone',
      header: 'Телефон',
      accessorKey: 'phone',
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'created',
      header: 'Создан',
      cell: (supplier) => {
        try {
          if (!supplier.created_at) {
            return '-';
          }
          return formatDate(supplier.created_at);
        } catch (error) {
          console.error('Ошибка при форматировании даты:', error);
          return '-';
        }
      },
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: (supplier) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenUploadModal(supplier.id);
            }}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost"
            size="icon" 
            onClick={(e) => {
              e.stopPropagation();
              handleViewSupplierDetails(supplier.id);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              setDeletingSupplierID(supplier.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "w-[200px]"
    },
  ];

  // Форсировать обновление данных
  const forceRefresh = () => {
    window.location.reload();
  };

  // Пагинация
  const paginationInfo = {
    pageIndex: page,
    pageSize: pageSize,
    totalCount: suppliers.length, // В реальности это должно быть общее количество
    totalPages: Math.ceil(suppliers.length / pageSize),
    hasNextPage: (page + 1) * pageSize < suppliers.length,
    hasPrevPage: page > 0
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Поставщики</h1>
          <p className="text-muted-foreground">
            Управление списком поставщиков и связанными данными
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push('/suppliers/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить поставщика
          </Button>
          <Button variant="outline" onClick={forceRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
        </div>
      </div>
      
      <div className="relative w-72">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск поставщиков..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <DataList
        columns={columns}
        data={suppliers}
        keyField="id"
        isLoading={isLoading}
        noDataMessage="Поставщики не найдены"
        onRowClick={(item) => handleViewSupplierDetails(item.id)}
        paginationInfo={paginationInfo}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      {/* Модальное окно загрузки прайс-листа */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={handleCloseUploadModal}
        title="Загрузка прайс-листа"
        footer={
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleGenerateTemplate}
              disabled={uploadLoading}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Скачать шаблон
            </Button>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={handleCloseUploadModal}
                disabled={uploadLoading}
              >
                Отмена
              </Button>
              <Button
                onClick={handleUploadPriceList}
                disabled={uploadLoading || !uploadFile || !uploadDate}
              >
                {uploadLoading ? 'Загрузка...' : 'Загрузить'}
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          {uploadError && (
            <Alert variant="destructive">
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}

          {uploadSuccess && (
            <Alert>
              <AlertDescription>
                Прайс-лист успешно загружен. Обработано позиций: {uploadSuccess.processed}, 
                пропущено: {uploadSuccess.skipped}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="date">Дата прайс-листа</Label>
            <DatePicker
              date={uploadDate}
              setDate={setUploadDate}
              disabled={uploadLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Файл прайс-листа</Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              disabled={uploadLoading}
            />
            <p className="text-sm text-gray-500">
              Поддерживаемые форматы: .xlsx, .xls
            </p>
          </div>
        </div>
      </Modal>
      
      {/* Диалог подтверждения удаления */}
      <AlertDialog open={!!deletingSupplierID} onOpenChange={(open) => !open && setDeletingSupplierID(null)}>
        <AlertDialogContent className="bg-white border shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Поставщик будет удален вместе со всеми связанными данными.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading || isLoading}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSupplier}
              disabled={deleteLoading || isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLoading || isLoading ? 'Удаление...' : 'Удалить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}