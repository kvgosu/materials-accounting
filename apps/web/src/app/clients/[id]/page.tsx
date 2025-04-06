'use client';

import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFragment } from 'react-relay';
import { 
  useClient, 
  useCreateClient, 
  useUpdateClient, 
  ClientFragments_clientDetails 
} from '@materials-accounting/graphql';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  ClientForm,
  Alert,
  AlertDescription
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { ArrowLeft } from 'lucide-react';

export default function ClientEditPage() {
  const params = useParams();
  const clientId = params.id as string;
  const isNew = clientId === 'new';

  return (
    <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
      {isNew ? (
        <NewClientContent />
      ) : (
        <Suspense fallback={<div>Загрузка данных клиента...</div>}>
          <EditClientContent clientId={clientId} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
}

function NewClientContent() {
  const router = useRouter();
  const { createClient, loading: createLoading, error: createError } = useCreateClient();
  const handleSubmit = async (data: any) => {
    try {
      const clientInput = {
        name: data.name,
        contact_person: data.contactPerson || null,
        phone: data.phone || null,
        email: data.email || null,
        address: data.address || null,
      };
      
      await createClient(clientInput);
      
      router.push('/clients');
    } catch (err: any) {
      console.error('Error creating client:', err);
    }
  };

  const handleCancel = () => {
    router.push('/clients');
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Создание нового клиента</h1>
      </div>

      {createError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{createError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные нового клиента</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm
            onSubmit={handleSubmit}
            isLoading={createLoading}
            error={createError || undefined}
            onCancel={handleCancel}
            showHeader={false}
          />
        </CardContent>
      </Card>

      <div className="mt-4">
        <Link href="/clients" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку клиентов
        </Link>
      </div>
    </div>
  );
}

function EditClientContent({ clientId }: { clientId: string }) {
  const router = useRouter();
  const clientResult = useClient(clientId);
  const client = useFragment(
    ClientFragments_clientDetails,
    (clientResult as any)?.client || {}
  );

  const { updateClient, loading: updateLoading, error: updateError } = useUpdateClient();
  const handleSubmit = async (data: any) => {
    try {
      const clientInput = {
        id: clientId,
        name: data.name,
        contact_person: data.contactPerson || null,
        phone: data.phone || null,
        email: data.email || null,
        address: data.address || null,
      };
      await updateClient(clientInput);
      router.push(`/clients/${clientId}/detail`);
    } catch (err: any) {
      console.error('Error updating client:', err);
    }
  };

  const handleCancel = () => {
    router.push(`/clients/${clientId}/detail`);
  };

  if (!client || !client.id) {
    return <div>Клиент не найден</div>;
  }

  const initialData = {
    id: client.id,
    name: client.name || '',
    contactPerson: client.contact_person || '',
    phone: client.phone || '',
    email: client.email || '',
    address: client.address || '',
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Редактирование клиента: {client.name}</h1>
      </div>

      {updateError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{updateError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные клиента</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={updateLoading}
            error={updateError || undefined}
            onCancel={handleCancel}
            showHeader={false}
          />
        </CardContent>
      </Card>

      <div className="mt-4">
        <Link href="/clients" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку клиентов
        </Link>
      </div>
    </div>
  );
}