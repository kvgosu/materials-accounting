'use client';

import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFragment } from 'react-relay';
import { 
  useSupplier, 
  useCreateSupplier, 
  useUpdateSupplier, 
  SupplierFragments_supplierDetails 
} from '@materials-accounting/graphql';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  SupplierForm,
  Alert,
  AlertDescription
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { ArrowLeft } from 'lucide-react';

export default function SupplierEditPage() {
  const params = useParams();
  const supplierId = params.id as string;
  const isNew = supplierId === 'new';

  return (
    <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
      {isNew ? (
        <NewSupplierContent />
      ) : (
        <Suspense fallback={<div>Загрузка данных поставщика...</div>}>
          <EditSupplierContent supplierId={supplierId} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
}

function NewSupplierContent() {
  const router = useRouter();
  const { createSupplier, loading: createLoading, error: createError } = useCreateSupplier();
  const handleSubmit = async (data: any) => {
    try {
      const supplierInput = {
        name: data.name,
        contact_person: data.contactPerson || null,
        phone: data.phone || null,
        email: data.email || null,
        address: data.address || null,
      };
      await createSupplier(supplierInput);
      router.push('/suppliers');
    } catch (err: any) {
      console.error('Error creating supplier:', err);
    }
  };
  const handleCancel = () => {
    router.push('/suppliers');
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Создание нового поставщика</h1>
      </div>

      {createError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{createError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные нового поставщика</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplierForm
            onSubmit={handleSubmit}
            isLoading={createLoading}
            error={createError || undefined}
            onCancel={handleCancel}
            showHeader={false}
          />
        </CardContent>
      </Card>

      <div className="mt-4">
        <Link href="/suppliers" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку поставщиков
        </Link>
      </div>
    </div>
  );
}

function EditSupplierContent({ supplierId }: { supplierId: string }) {
  const router = useRouter();
  const supplierResult = useSupplier(supplierId);
  const supplier = useFragment(
    SupplierFragments_supplierDetails,
    (supplierResult as any)?.supplier || {}
  );
  const { updateSupplier, loading: updateLoading, error: updateError } = useUpdateSupplier();
  const handleSubmit = async (data: any) => {
    try {
      const supplierInput = {
        id: supplierId,
        name: data.name,
        contact_person: data.contactPerson || null,
        phone: data.phone || null,
        email: data.email || null,
        address: data.address || null,
      };
      await updateSupplier(supplierInput);
      router.push(`/suppliers/${supplierId}/detail`);
    } catch (err: any) {
      console.error('Error updating supplier:', err);
    }
  };
  const handleCancel = () => {
    router.push(`/suppliers/${supplierId}/detail`);
  };
  if (!supplier || !supplier.id) {
    return <div>Поставщик не найден</div>;
  }
  const initialData = {
    id: supplier.id,
    name: supplier.name || '',
    contactPerson: supplier.contact_person || '',
    phone: supplier.phone || '',
    email: supplier.email || '',
    address: supplier.address || '',
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Редактирование поставщика: {supplier.name}</h1>
      </div>

      {updateError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{updateError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные поставщика</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplierForm
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
        <Link href="/suppliers" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку поставщиков
        </Link>
      </div>
    </div>
  );
}