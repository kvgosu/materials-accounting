'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Input,
  DataList, 
  type Column,
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle,
  MaterialForm,
  useToast,
  Alert,
  AlertDescription
} from '@materials-accounting/ui';
import { Plus as PlusIcon, Search as SearchIcon, Pencil, Trash2, RefreshCw } from 'lucide-react';
import { 
  useMaterials, 
  useDeleteMaterial, 
  useCreateMaterial, 
  useUpdateMaterial, 
  MaterialFragments_list 
} from '@materials-accounting/graphql';
import { useFragment } from 'react-relay';
import { formatDate } from '../../utils/format';

const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export default function MaterialsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [deletingMaterialId, setDeletingMaterialId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  
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
          description: `Повторная попытка через ${RETRY_DELAY/1000} сек. Осталось попыток: ${retries}`,
          variant: 'default',
        });
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return withRetry(operation, retries - 1);
      }
      throw error;
    }
  };
  
  const materialsResult = useMaterials(page * pageSize, pageSize, search || undefined);
  const fragmentData = useFragment(
    MaterialFragments_list,
    (materialsResult as any)?.materials
  );
  const materials = Array.isArray(fragmentData) ? fragmentData : [];
  
  const { createMaterial, loading: createLoading, error: createError } = useCreateMaterial();
  const { updateMaterial, loading: updateLoading, error: updateError } = useUpdateMaterial();
  const { deleteMaterial, loading: deleteLoading, error: deleteError } = useDeleteMaterial();
  const { toast } = useToast();
  
  const forceRefresh = () => {
    window.location.reload();
  };
  
  const handleOpenCreateDialog = () => {
    setEditingMaterialId(null);
    setFormError(undefined);
    setDialogOpen(true);
  };
  
  const handleOpenEditDialog = (id: string) => {
    setEditingMaterialId(id);
    setFormError(undefined);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingMaterialId(null);
    setFormError(undefined);
  };
  
  const handleOpenDeleteDialog = (id: string) => {
    setDeletingMaterialId(id);
  };
  
  const handleSaveMaterial = async (data: any) => {
    try {
      setFormError(undefined);
      setIsLoading(true);
      if (editingMaterialId) {
        const materialInput = {
          id: editingMaterialId,
          name: data.name,
          unit: data.unit,
          description: data.description || null,
        };
        await withRetry(() => updateMaterial(materialInput));
        toast({
          title: 'Успешно',
          description: 'Материал успешно обновлен',
          variant: 'default',
        });
      } else {
        const materialInput = {
          name: data.name,
          unit: data.unit,
          description: data.description || null,
        };
        await withRetry(() => createMaterial(materialInput));
        toast({
          title: 'Успешно',
          description: 'Материал успешно создан',
          variant: 'default',
        });
      }
      handleCloseDialog();
      forceRefresh();
    } catch (error: any) {
      console.error('Error saving material:', error);
      setFormError(error.message || 'Произошла ошибка при сохранении материала');
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить материал',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteMaterial = async () => {
    if (!deletingMaterialId) return;
    try {
      setIsLoading(true);
      await withRetry(() => deleteMaterial(deletingMaterialId));
      toast({
        title: 'Успешно',
        description: 'Материал успешно удален',
        variant: 'default',
      });
      setDeletingMaterialId(null);
      forceRefresh();
    } catch (error: any) {
      console.error('Error deleting material:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить материал',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const columns: Column<any>[] = [
    {
      id: 'name',
      header: 'Название',
      accessorKey: 'name',
      sortable: true
    },
    {
      id: 'unit',
      header: 'Единица измерения',
      accessorKey: 'unit',
      sortable: true
    },
    {
      id: 'description',
      header: 'Описание',
      accessorKey: 'description',
    },
    {
      id: 'created',
      header: 'Создан',
      cell: (material) => {
        try {
          return formatDate(material.created_at);
        } catch (error) {
          console.error('Ошибка при форматировании даты:', error);
          return '';
        }
      },
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: (material) => (
        <div className="flex space-x-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEditDialog(material.id);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDeleteDialog(material.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "w-[100px]"
    },
  ];
  
  const totalCount = Array.isArray(materials) ? materials.length : 0;
  const editingMaterial = editingMaterialId ? materials.find((material) => material.id === editingMaterialId) : undefined;
  const initialFormData = editingMaterial ? {
    id: editingMaterial.id,
    name: editingMaterial.name || '',
    unit: editingMaterial.unit || '',
    description: editingMaterial.description || '',
  } : undefined;
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Материалы</h1>
          <p className="text-muted-foreground">
            Управление списком материалов
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleOpenCreateDialog}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Добавить материал
          </Button>
        </div>
      </div>
      
      {dataError && (
        <Alert variant="destructive">
          <AlertDescription>
            {dataError}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4" 
              onClick={forceRefresh}
            >
              Повторить
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="relative w-72">
        <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск материалов..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <DataList
        columns={columns}
        data={materials}
        keyField="id"
        isLoading={isLoading}
        noDataMessage="Материалы не найдены"
        paginationInfo={{
          pageIndex: page,
          pageSize: pageSize,
          totalCount: totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          hasNextPage: (page + 1) * pageSize < totalCount,
          hasPrevPage: page > 0
        }}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white border shadow-lg">
          <DialogHeader>
            <DialogTitle>
              {editingMaterialId ? 'Редактировать материал' : 'Новый материал'}
            </DialogTitle>
          </DialogHeader>
          {dialogOpen && (
            <MaterialForm
              initialData={initialFormData}
              onSubmit={handleSaveMaterial}
              onCancel={handleCloseDialog}
              isLoading={createLoading || updateLoading || isLoading}
              error={formError}
              showHeader={false}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!deletingMaterialId} onOpenChange={() => setDeletingMaterialId(null)}>
        <AlertDialogContent className="bg-white border shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Материал будет удален вместе со всеми связанными данными.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading || isLoading}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMaterial}
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