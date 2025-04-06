'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFragment } from 'react-relay';
import {
  useInvoice,
  useCreateInvoice,
  useUpdateInvoice,
  useClients,
  useSuppliers,
  useMaterials,
  InvoiceFragments_invoiceDetails,
  InvoiceFragments_invoiceBasic,
  InvoiceFragments_invoiceItemList,
  ClientFragments_list,
  SupplierFragments_list,
  MaterialFragments_list,
  ClientFragments_clientDetails,
  SupplierFragments_supplierDetails,
  ContractFragments_contractDetails,
} from '@materials-accounting/graphql';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  InvoiceForm,
  Alert,
  AlertDescription,
  useToast,
  InvoiceFormData,
  Toaster
} from '@materials-accounting/ui';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { ArrowLeft } from 'lucide-react';

const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export default function InvoiceFormPage() {
  const params = useParams();
  const invoiceId = params.id as string;
  const isNew = invoiceId === 'new';

  return (
    <ErrorBoundary fallback={<div>Произошла ошибка при загрузке данных</div>}>
      <Toaster />
      {isNew ? (
        <NewInvoiceContent />
      ) : (
        <EditInvoiceContent invoiceId={invoiceId} />
      )}
    </ErrorBoundary>
  );
}

function NewInvoiceContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const clientsResult = useClients(0, 100);
  const suppliersResult = useSuppliers(0, 100);
  const materialsResult = useMaterials(0, 100);
  const clientsData = useFragment(
    ClientFragments_list,
    (clientsResult as any)?.clients || []
  );
  const suppliersData = useFragment(
    SupplierFragments_list,
    (suppliersResult as any)?.suppliers || []
  );
  const materialsData = useFragment(
    MaterialFragments_list,
    (materialsResult as any)?.materials || []
  );
  const { createInvoice, loading: createLoading, error: createError } = useCreateInvoice();
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

  useEffect(() => {
    const fetchReferenceData = async () => {
      setIsLoading(true);
      try {
        // Обрабатываем данные клиентов
        if (clientsData && clientsData.length > 0) {
          // Для каждого клиента добавляем его договоры
          const clientsWithContracts = clientsData.map((client: any) => ({
            id: client.id,
            name: client.name,
            contracts: client.contracts ? client.contracts.map((contract: any) => ({
              id: contract.id,
              number: contract.number,
              markupPercentage: contract.markup_percentage
            })) : []
          }));
          setClients(clientsWithContracts);
        }

        // Обрабатываем данные поставщиков
        if (suppliersData && suppliersData.length > 0) {
          const suppliersFormatted = suppliersData.map((supplier: any) => ({
            id: supplier.id,
            name: supplier.name
          }));
          setSuppliers(suppliersFormatted);
        }

        // Обрабатываем данные материалов
        if (materialsData && materialsData.length > 0) {
          const materialsFormatted = materialsData.map((material: any) => ({
            id: material.id,
            name: material.name,
            unit: material.unit
          }));
          setMaterials(materialsFormatted);
        }
      } catch (err: any) {
        console.error('Ошибка при загрузке справочных данных:', err);
        setError('Произошла ошибка при загрузке справочных данных');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferenceData();
  }, [clientsData, suppliersData, materialsData]);

  const handleSubmit = async (data: InvoiceFormData) => {
    try {
      setIsLoading(true);
      setError(undefined);

      // Преобразуем InvoiceFormData в формат, ожидаемый API
      const invoiceInput = {
        number: data.number,
        date: data.date.toISOString().split('T')[0], // формат YYYY-MM-DD
        client_id: data.clientId,
        supplier_id: data.supplierId,
        contract_id: data.contractId,
        items: data.items.map(item => ({
          material_id: item.materialId,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await withRetry(() => createInvoice(invoiceInput));

      toast({
        title: 'Успешно',
        description: 'Накладная успешно создана',
        variant: 'default',
      });

      router.push('/invoices');
    } catch (err: any) {
      console.error('Ошибка при создании накладной:', err);
      setError(err.message || 'Произошла ошибка при создании накладной');

      toast({
        title: 'Ошибка',
        description: 'Не удалось создать накладную',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    router.push('/invoices');
  };

  if ((clientsResult as any).loading || (suppliersResult as any).loading || (materialsResult as any).loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Создание новой накладной</h1>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
              <p>Загрузка данных...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  if ((clientsResult as any).error || (suppliersResult as any).error || (materialsResult as any).error) {
    const errorMessage = (clientsResult as any).error ||
      (suppliersResult as any).error ||
      (materialsResult as any).error;
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Создание новой накладной</h1>
        </div>
        <Alert variant="destructive">
          <AlertDescription>
            Ошибка при загрузке данных: {errorMessage}
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Создание новой накладной</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные новой накладной</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceForm
            clients={clients}
            suppliers={suppliers}
            materials={materials}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading || createLoading}
            error={error || createError || undefined}
            showHeader={false}
          />
        </CardContent>
      </Card>

      <div className="mt-4">
        <Link href="/invoices" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку накладных
        </Link>
      </div>
    </div>
  );
}

function EditInvoiceContent({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [clients, setClients] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const clientsResult = useClients(0, 100);
  const suppliersResult = useSuppliers(0, 100);
  const materialsResult = useMaterials(0, 100);
  const invoiceResult = useInvoice(invoiceId);
  const invoiceBase = useFragment(
    InvoiceFragments_invoiceDetails,
    (invoiceResult as any)?.invoice || null
  );
  const invoiceBasicData = useFragment(
    InvoiceFragments_invoiceBasic,
    invoiceBase || null
  );
  const invoice = invoiceBase ? {
    ...invoiceBase,
    ...invoiceBasicData
  } : null;
  const client = useFragment(
    ClientFragments_clientDetails,
    invoice?.client || null
  );
  const supplier = useFragment(
    SupplierFragments_supplierDetails,
    invoice?.supplier || null
  );
  const contract = useFragment(
    ContractFragments_contractDetails,
    invoice?.contract || null
  );
  const invoiceItems = useFragment(
    InvoiceFragments_invoiceItemList,
    (invoiceResult as any)?.invoice?.items || []
  );
  const clientsData = useFragment(
    ClientFragments_list,
    (clientsResult as any)?.clients || []
  );
  const suppliersData = useFragment(
    SupplierFragments_list,
    (suppliersResult as any)?.suppliers || []
  );
  const materialsData = useFragment(
    MaterialFragments_list,
    (materialsResult as any)?.materials || []
  );
  const { updateInvoice, loading: updateLoading, error: updateError } = useUpdateInvoice();
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

  useEffect(() => {
    if (!clientsData || clientsData.length === 0) return;
    try {
      const clientsWithContracts = clientsData.map((client: any) => ({
        id: client.id,
        name: client.name,
        contracts: client.contracts ? client.contracts.map((contract: any) => ({
          id: contract.id,
          number: contract.number,
          markupPercentage: contract.markup_percentage
        })) : []
      }));
      setClients(clientsWithContracts);
    } catch (err) {
      console.error('Ошибка при обработке данных клиентов:', err);
    }
  }, [clientsData]);

  useEffect(() => {
    if (!suppliersData || suppliersData.length === 0) return;

    try {
      const suppliersFormatted = suppliersData.map((supplier: any) => ({
        id: supplier.id,
        name: supplier.name
      }));
      setSuppliers(suppliersFormatted);
    } catch (err) {
      console.error('Ошибка при обработке данных поставщиков:', err);
    }
  }, [suppliersData]);

  useEffect(() => {
    if (!materialsData || materialsData.length === 0) {
      setMaterials([]);
      return;
    }
    try {
      const materialsFormatted = materialsData.map((material: any) => {
        const id = String(material.id || '');
        const name = String(material.name || 'Материал без названия');
        const unit = String(material.unit || '');
        return { id, name, unit };
      });
      setMaterials(materialsFormatted);
    } catch (err) {
      setMaterials([]);
    }
  }, [materialsData]);

  const initialFormData = useMemo(() => {
    if (!invoice || !invoice.id) {
      return {
        id: '',
        number: '',
        date: new Date(),
        clientId: '',
        supplierId: '',
        contractId: '',
        items: [],
        totalAmount: 0,
        totalWithMarkup: 0
      };
    }
    const invoiceDate = invoice?.date ? new Date(invoice.date) : new Date();
    const formattedItems = (invoiceItems || []).map((item: any, index: number) => {
      const materialId = item.material?.id || item.material?.__id || '';
      return {
        id: item.id,
        materialId: materialId,
        materialName: item.material?.name || 'Неизвестный материал',
        unit: item.material?.unit || '',
        quantity: Number(item.quantity) || 0,
        price: Number(item.price) || 0,
        amount: Number(item.amount) || 0,
        amountWithMarkup: Number(item.amount_with_markup) || 0
      };
    });
    return {
      id: invoice.id,
      number: invoice.number || "",
      date: invoiceDate,
      clientId: client?.id || "",
      supplierId: supplier?.id || "",
      contractId: contract?.id || "",
      items: formattedItems,
      totalAmount: Number(invoice.total_amount) || 0,
      totalWithMarkup: Number(invoice.total_with_markup) || 0
    };
  }, [invoice, client, supplier, contract, invoiceItems, materials]);
  const handleSubmit = useCallback(async (data: InvoiceFormData) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const invoiceInput = {
        id: invoiceId,
        number: data.number,
        date: data.date.toISOString().split('T')[0],
        client_id: data.clientId,
        supplier_id: data.supplierId,
        contract_id: data.contractId,
        items: data.items.map(item => ({
          id: item.id, 
          material_id: item.materialId,
          quantity: item.quantity,
          price: item.price
        }))
      };
      await withRetry(() => updateInvoice(invoiceInput));
      toast({
        title: 'Успешно',
        description: 'Накладная успешно обновлена',
        variant: 'default',
      });
      router.push(`/invoices/${invoiceId}/detail`);
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при обновлении накладной');
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить накладную',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [invoiceId, updateInvoice, router, toast, withRetry]);
  const handleCancel = useCallback(() => {
    router.push(`/invoices/${invoiceId}/detail`);
  }, [router, invoiceId]);

  if ((invoiceResult as any).loading || (clientsResult as any).loading ||
    (suppliersResult as any).loading || (materialsResult as any).loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.push('/invoices')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Редактирование накладной</h1>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
              <p>Загрузка данных...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  if ((invoiceResult as any).error) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.push('/invoices')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Редактирование накладной</h1>
        </div>
        <Alert variant="destructive">
          <AlertDescription>
            Ошибка при загрузке данных накладной: {(invoiceResult as any).error}
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }
  if (!invoice || !invoice.id) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.push('/invoices')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Редактирование накладной</h1>
        </div>
        <Alert variant="destructive">
          <AlertDescription>
            Накладная не найдена. Проверьте корректность ID: {invoiceId}
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link href="/invoices" className="text-blue-600 hover:text-blue-800">
            &larr; Вернуться к списку накладных
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <h1 className="text-2xl font-bold">Редактирование накладной: {invoice.number}</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Данные накладной</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceForm
            initialData={initialFormData}
            clients={clients}
            suppliers={suppliers}
            materials={materials}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading || updateLoading}
            error={error || updateError || undefined}
            showHeader={false}
          />
        </CardContent>
      </Card>

      <div className="mt-4">
        <Link href="/invoices" className="text-blue-600 hover:text-blue-800">
          &larr; Вернуться к списку накладных
        </Link>
      </div>
    </div>
  );
}