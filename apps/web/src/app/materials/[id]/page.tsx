'use client';

import { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFragment } from 'react-relay';
import { 
  useMaterial, 
  useCreateMaterial, 
  useUpdateMaterial, 
  MaterialFragments_materialDetails 
} from '@materials-accounting/graphql';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  MaterialForm,
  Alert,
  AlertDescription
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { ArrowLeft } from 'lucide-react';

export default function MaterialEditPage() {
  const params = useParams();
  const materialId = params.id as string;
  const isNew = materialId === 'new';

  return (
    <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
      {isNew ? (
        <NewMaterialContent />
      ) : (
        <Suspense fallback={<div>Загрузка данных материала...</div>}>
          <EditMaterialContent materialId={materialId} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
}

function NewMaterialContent() {
  const router = useRouter();
  const { createMaterial, loading: createLoading, error: createError } = useCreateMaterial();
  const handleSubmit = async (data: any) => {
    try {
      const materialInput = {
        name: data.name,
        unit: data.unit,
        description: data.description || null,
      };
      await createMaterial(materialInput);
      router.push('/materials');
    } catch (err: any) {
      console.error('Error creating material:', err);
    }
  };
  const handleCancel = () => {
    router.push('/materials');
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Создание нового материала</h1>
      </div>

      {createError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{createError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные нового материала</CardTitle>
        </CardHeader>
        <CardContent>
          <MaterialForm
            onSubmit={handleSubmit}
            isLoading={createLoading}
            error={createError || undefined}
            onCancel={handleCancel}
            showHeader={false}
          />
        </CardContent>
      </Card>

      <div className="mt-4">
        <Link href="/materials" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку материалов
        </Link>
      </div>
    </div>
  );
}

function EditMaterialContent({ materialId }: { materialId: string }) {
  const router = useRouter();
  const materialResult = useMaterial(materialId);
  const material = useFragment(
    MaterialFragments_materialDetails,
    (materialResult as any)?.material || {}
  );
  const { updateMaterial, loading: updateLoading, error: updateError } = useUpdateMaterial();
  const handleSubmit = async (data: any) => {
    try {
      const materialInput = {
        id: materialId,
        name: data.name,
        unit: data.unit,
        description: data.description || null,
      };
      await updateMaterial(materialInput);
      router.push('/materials');
    } catch (err: any) {
      console.error('Error updating material:', err);
    }
  };
  const handleCancel = () => {
    router.push('/materials');
  };
  if (!material || !material.id) {
    return <div>Материал не найден</div>;
  }
  const initialData = {
    id: material.id,
    name: material.name || '',
    unit: material.unit || '',
    description: material.description || '',
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Редактирование материала: {material.name}</h1>
      </div>

      {updateError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{updateError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные материала</CardTitle>
        </CardHeader>
        <CardContent>
          <MaterialForm
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
        <Link href="/materials" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку материалов
        </Link>
      </div>
    </div>
  );
}