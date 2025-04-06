'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Input, 
  DataList, 
  type Column,
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle,
  Badge,
  useToast,
  Alert,
  AlertDescription,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@materials-accounting/ui';
import { Plus as PlusIcon, Search as SearchIcon, Pencil, Trash2 } from 'lucide-react';
import { 
  useContracts, 
  useDeleteContract,
  ContractFragments_list, 
  ClientFragments_client
} from '@materials-accounting/graphql';
import { useFragment } from 'react-relay';
import { formatDate } from '../../utils/format';
import { ContractStatus } from '@materials-accounting/types';

const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export default function ContractsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [clientId] = useState<string | undefined>(undefined);
  const [deletingContractId, setDeletingContractId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataError] = useState<string | null>(null);
  const { toast } = useToast();
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
  const status = statusFilter === 'all' ? undefined : 
                 statusFilter === 'ACTIVE' ? ContractStatus.ACTIVE : 
                 statusFilter === 'INACTIVE' ? ContractStatus.INACTIVE : 
                 undefined;
  const contractsResult = useContracts(
    page * pageSize, 
    pageSize, 
    clientId, 
    status
  );
  const fragmentData = useFragment(
    ContractFragments_list,
    (contractsResult as any)?.contracts
  );
  const contracts = Array.isArray(fragmentData) ? fragmentData : [];
  const { deleteContract, loading: deleteLoading } = useDeleteContract();
  const forceRefresh = () => {
    window.location.reload();
  };
  const handleOpenDeleteDialog = (id: string) => {
    setDeletingContractId(id);
  };
  const handleDeleteContract = async () => {
    if (!deletingContractId) return;
    
    try {
      setIsLoading(true);
      await withRetry(() => deleteContract(deletingContractId));
      toast({
        title: 'Успешно',
        description: 'Договор успешно удален',
        variant: 'default',
      });
      setDeletingContractId(null);
      forceRefresh();
    } catch (error: any) {
      console.error('Error deleting contract:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить договор',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleRowClick = (contract: any) => {
    router.push(`/contracts/${contract.id}/detail`);
  };
  function ClientCell({ client }: { client: any }) {
    const clientData = useFragment(
      ClientFragments_client,
      client || null
    );
    if (!clientData) return null;
    return (
      <Link 
        href={`/clients/${clientData.id}/detail`} 
        className="text-blue-600 hover:text-blue-900"
        onClick={(e) => e.stopPropagation()}
      >
        {clientData.name}
      </Link>
    );
  }
  const columns: Column<any>[] = [
    {
      id: 'number',
      header: 'Номер',
      accessorKey: 'number',
      sortable: true
    },
    {
      id: 'date',
      header: 'Дата',
      cell: (contract) => {
        try {
          return formatDate(contract.date);
        } catch (error) {
          console.error('Ошибка при форматировании даты:', error);
          return '';
        }
      },
      sortable: true
    },
    {
      id: 'client',
      header: 'Клиент',
      cell: (contract) => {
        if (!contract.client) return '';

        return <ClientCell client={contract.client} />;
      }
    },
    {
      id: 'markup',
      header: 'Наценка',
      cell: (contract) => `${contract.markup_percentage}%`,
      sortable: true
    },
    {
      id: 'status',
      header: 'Статус',
      cell: (contract) => (
        <Badge
          variant={contract.status === 'ACTIVE' ? 'success' : 'outline'}
        >
          {contract.status === 'ACTIVE' ? 'Активен' : 'Неактивен'}
        </Badge>
      ),
      sortable: true
    },
    {
      id: 'expiration',
      header: 'Срок действия',
      cell: (contract) => {
        if (!contract.expiration_date) return 'Бессрочный';
        try {
          return `до ${formatDate(contract.expiration_date)}`;
        } catch (error) {
          console.error('Ошибка при форматировании даты:', error);
          return '';
        }
      }
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: (contract) => (
        <div className="flex space-x-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/contracts/${contract.id}`);
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
              handleOpenDeleteDialog(contract.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "w-[100px]"
    },
  ];
  const totalCount = Array.isArray(contracts) ? contracts.length : 0;
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Договоры</h1>
          <p className="text-muted-foreground">
            Управление договорами с клиентами
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/contracts/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Добавить договор
            </Button>
          </Link>
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
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow md:max-w-xs">
          <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск договоров..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select 
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Все статусы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="ACTIVE">Активные</SelectItem>
              <SelectItem value="INACTIVE">Неактивные</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DataList
        columns={columns}
        data={contracts}
        keyField="id"
        isLoading={isLoading}
        noDataMessage="Договоры не найдены"
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
      
      <AlertDialog open={!!deletingContractId} onOpenChange={() => setDeletingContractId(null)}>
        <AlertDialogContent className="bg-white border shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Договор будет удален вместе со всеми связанными данными.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading || isLoading}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteContract}
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