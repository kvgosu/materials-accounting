'use client';

import React, { useState } from 'react';
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
  ClientForm,
  useToast,
  Alert,
  AlertDescription
} from '@materials-accounting/ui';
import { Plus as PlusIcon, Search as SearchIcon, Pencil, Trash2, RefreshCw } from 'lucide-react';
import { 
  useClients, 
  useDeleteClient, 
  useCreateClient, 
  useUpdateClient, 
  ClientFragments_list
} from '@materials-accounting/graphql';
import { useFragment } from 'react-relay';
import { formatDate } from '../../utils/format';

const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export default function ClientsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
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
  const clientsResult = useClients(page * pageSize, pageSize, search || undefined);
  const fragmentData = useFragment(
    ClientFragments_list,
    (clientsResult as any)?.clients
  );
  const clients = Array.isArray(fragmentData) ? fragmentData : [];
  const { createClient, loading: createLoading, error: createError } = useCreateClient();
  const { updateClient, loading: updateLoading, error: updateError } = useUpdateClient();
  const { deleteClient, loading: deleteLoading, error: deleteError } = useDeleteClient();
  const { toast } = useToast();
  const forceRefresh = () => {
    window.location.reload();
  };
  const handleOpenCreateDialog = () => {
    setEditingClientId(null);
    setFormError(undefined);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (id: string) => {
    setEditingClientId(id);
    setFormError(undefined);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingClientId(null);
    setFormError(undefined);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setDeletingClientId(id);
  };

  const handleCloseDeleteDialog = () => {
    setDeletingClientId(null);
  };

  const handleSaveClient = async (data: any) => {
    try {
      setFormError(undefined);
      setIsLoading(true);
      if (editingClientId) {
        const clientInput = {
          id: editingClientId,
          name: data.name,
          contact_person: data.contactPerson || null,
          phone: data.phone || null,
          email: data.email || null,
          address: data.address || null,
        };
        await withRetry(() => updateClient(clientInput));
        toast({
          title: 'Успешно',
          description: 'Клиент успешно обновлен',
          variant: 'default',
        });
      } else {
        const clientInput = {
          name: data.name,
          contact_person: data.contactPerson || null,
          phone: data.phone || null,
          email: data.email || null,
          address: data.address || null,
        };
        await withRetry(() => createClient(clientInput));
        toast({
          title: 'Успешно',
          description: 'Клиент успешно создан',
          variant: 'default',
        });
      }
      handleCloseDialog();
      forceRefresh();
    } catch (error: any) {
      console.error('Error saving client:', error);
      setFormError(error.message || 'Произошла ошибка при сохранении клиента');
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить клиента',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async () => {
    if (!deletingClientId) return;
    
    try {
      setIsLoading(true);
      await withRetry(() => deleteClient(deletingClientId));
      toast({
        title: 'Успешно',
        description: 'Клиент успешно удален',
        variant: 'default',
      });
      setDeletingClientId(null);
      forceRefresh();
    } catch (error: any) {
      console.error('Error deleting client:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить клиента',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowClick = (client: any) => {
    router.push(`/clients/${client.id}/detail`);
  };

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
      cell: (client) => {
        try {
          return formatDate(client.created_at);
        } catch (error) {
          console.error('Ошибка при форматировании даты:', error);
          return '';
        }
      },
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: (client) => (
        <div className="flex space-x-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEditDialog(client.id);
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
              handleOpenDeleteDialog(client.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "w-[100px]"
    },
  ];
  const totalCount = Array.isArray(clients) ? clients.length : 0;
  const editingClient = editingClientId ? clients.find((client) => client.id === editingClientId) : undefined;
  const initialFormData = editingClient ? {
    id: editingClient.id,
    name: editingClient.name || '',
    contactPerson: editingClient.contact_person || '',
    phone: editingClient.phone || '',
    email: editingClient.email || '',
    address: editingClient.address || '',
  } : undefined;
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Клиенты</h1>
          <p className="text-muted-foreground">
            Управление списком клиентов и их договорами
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleOpenCreateDialog}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Добавить клиента
          </Button>
          {/* <Button variant="outline" onClick={forceRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button> */}
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
          placeholder="Поиск клиентов..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataList
        columns={columns}
        data={clients}
        keyField="id"
        isLoading={isLoading}
        noDataMessage="Клиенты не найдены"
        onRowClick={handleRowClick}
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
              {editingClientId ? 'Редактировать клиента' : 'Новый клиент'}
            </DialogTitle>
          </DialogHeader>
          {dialogOpen && (
            <ClientForm
              initialData={initialFormData}
              onSubmit={handleSaveClient}
              onCancel={handleCloseDialog}
              isLoading={createLoading || updateLoading || isLoading}
              error={formError}
              showHeader={false}
            />
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!deletingClientId} onOpenChange={() => setDeletingClientId(null)}>
        <AlertDialogContent className="bg-white border shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Клиент будет удален вместе со всеми связанными данными.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading || isLoading}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteClient}
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