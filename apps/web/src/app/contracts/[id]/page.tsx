'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useFragment } from 'react-relay';
import {
  useContract,
  useCreateContract,
  useUpdateContract,
  useClients,
  ClientFragments_list,
  ContractFragments_contractDetails} from '@materials-accounting/graphql';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ContractForm,
  Alert,
  AlertDescription,
  useToast
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { ArrowLeft } from 'lucide-react';
import { ContractStatus } from '@materials-accounting/types';


export default function ContractEditPage() {
  const params = useParams();
  const contractId = params.id as string;
  const isNew = contractId === 'new';

  return (
    <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
      {isNew ? (
        <NewContractContent />
      ) : (
        <Suspense fallback={<div>Загрузка данных договора...</div>}>
          <EditContractContent contractId={contractId} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
}

function NewContractContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const clientIdParam = searchParams.get('clientId');
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { createContract, loading: createLoading, error: createError } = useCreateContract();
  const clientsResult = useClients(0, 1000);
  const clientsData = useFragment(
    ClientFragments_list,
    (clientsResult as any)?.clients
  );

  useEffect(() => {
    if (Array.isArray(clientsData) && clientsData.length > 0) {
      const formattedClients = clientsData.map((client: any) => ({
        id: client.id,
        name: client.name || 'Без названия'
      }));
      setClients(formattedClients);
    }
  }, [clientsData]);

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      
      console.log('Received form data:', data);

      // Валидация обязательных полей - проверяем оба возможных имени поля
      const clientId = data.client_id || data.clientId;
      if (!clientId) {
        throw new Error('Выберите клиента');
      }
      
      // Проверяем оба возможных имени поля
      const markupPercentage = data.markup_percentage !== undefined ? 
        data.markup_percentage : data.markupPercentage;
      if ((markupPercentage === null || markupPercentage === undefined) && markupPercentage !== 0) {
        throw new Error('Укажите процент наценки');
      }

      const contractInput = {
        client_id: clientId,
        number: data.number,
        date: data.date.toISOString().split('T')[0],
        markup_percentage: parseFloat(markupPercentage || 0), // Гарантируем число
        status: data.status,
        expiration_date: data.expiration_date
          ? data.expiration_date.toISOString().split('T')[0]
          : null
      };

      console.log('Sending contract data:', contractInput);
      await createContract(contractInput);

      toast({
        title: 'Успешно',
        description: 'Договор успешно создан',
        variant: 'default',
      });

      router.push('/contracts');
    } catch (err: any) {
      console.error('Error creating contract:', err);
      toast({
        title: 'Ошибка',
        description: err.message || 'Не удалось создать договор',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/contracts');
  };

  const initialData = clientIdParam ? {
    client_id: clientIdParam,
    date: new Date(),
    markup_percentage: 0, // Добавляем значение по умолчанию
    status: ContractStatus.ACTIVE
  } : undefined;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Создание нового договора</h1>
      </div>

      {createError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{createError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные нового договора</CardTitle>
        </CardHeader>
        <CardContent>
          <ContractForm
            initialData={initialData as any}
            clients={clients}
            onSubmit={handleSubmit}
            isLoading={isLoading || createLoading}
            error={createError || undefined}
            onCancel={handleCancel}
            showHeader={false}
          />
        </CardContent>
      </Card>

      <div className="mt-4">
        <Link href="/contracts" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку договоров
        </Link>
      </div>
    </div>
  );
}

function EditContractContent({ contractId }: { contractId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const contractResult = useContract(contractId);
  const { updateContract, loading: updateLoading, error: updateError } = useUpdateContract();
  const clientsResult = useClients(0, 1000);
  const contract = useFragment(
    ContractFragments_contractDetails,
    (contractResult as any).contract || {}
  );
  const clientsData = useFragment(
    ClientFragments_list,
    (clientsResult as any)?.clients
  );
  useEffect(() => {
    if (Array.isArray(clientsData) && clientsData.length > 0) {
      const formattedClients = clientsData.map((client: any) => ({
        id: client.id,
        name: client.name || 'Без названия'
      }));
      setClients(formattedClients);
    }
  }, [clientsData]);


  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      
      // Валидация обязательных полей
      if (!data.clientId) {
        throw new Error('Выберите клиента');
      }
      
      if (!data.markupPercentage && data.markupPercentage !== 0) {
        throw new Error('Укажите процент наценки');
      }
      
      const contractInput = {
        id: contractId,
        client_id: data.clientId, 
        number: data.number,
        date: data.date instanceof Date 
          ? data.date.toISOString().split('T')[0] 
          : data.date,
        markup_percentage: parseFloat(data.markupPercentage || 0), // Гарантируем число
        status: data.status,
        expiration_date: data.expirationDate 
          ? (data.expirationDate instanceof Date 
            ? data.expirationDate.toISOString().split('T')[0] 
            : data.expirationDate)
          : null
      };
      
      console.log('Updating contract with data:', contractInput);
      await updateContract(contractInput);
      toast({
        title: 'Успешно',
        description: 'Договор успешно обновлен',
        variant: 'default',
      });
      router.push(`/contracts/${contractId}/detail`);
    } catch (err: any) {
      console.error('Error updating contract:', err);
      toast({
        title: 'Ошибка',
        description: err.message || 'Не удалось обновить договор',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/contracts/${contractId}/detail`);
  };

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

  const contractData = contract as any;

  const initialData = {
    id: contractData.id,
    clientId: contractData?.client?.id || contractData.client?.__id || '',
    number: contractData.number || '',
    date: contractData.date ? new Date(contractData.date) : new Date(),
    markupPercentage: contractData.markup_percentage !== null ? contractData.markup_percentage : 0,
    status: contractData.status || ContractStatus.ACTIVE,
    expirationDate: contractData.expiration_date
      ? new Date(contractData.expiration_date)
      : null
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Редактирование договора: {contractData.number}</h1>
      </div>

      {updateError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{updateError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные договора</CardTitle>
        </CardHeader>
        <CardContent>
          <ContractForm
            initialData={initialData as any}
            clients={clients}
            onSubmit={handleSubmit}
            isLoading={isLoading || updateLoading}
            error={updateError || undefined}
            onCancel={handleCancel}
            showHeader={false}
          />
        </CardContent>
      </Card>

      <div className="mt-4">
        <Link href="/contracts" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку договоров
        </Link>
      </div>
    </div>
  );
}