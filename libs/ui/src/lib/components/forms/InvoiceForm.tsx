// Обновленный и исправленный InvoiceForm.tsx
import { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Label } from '../common/Label';
import { DatePicker } from '../common/DatePicker';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../common/Card';
import { Alert, AlertDescription } from '../common/Alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../common/Select';
import { InvoiceItemTable, InvoiceItem } from '../invoice/InvoiceItemTable';
import { Switch } from '../common/Switch';
import { useClient } from '@materials-accounting/graphql';
import { useFragment } from 'react-relay';
import { ClientFragments_clientDetails, ContractFragments_list } from '@materials-accounting/graphql';

// Типы для пропсов формы
interface InvoiceFormProps {
  initialData?: InvoiceFormData;
  clients: InvoiceClientOption[];
  suppliers: InvoiceSupplierOption[];
  materials: InvoiceMaterialOption[];
  onSubmit: (data: InvoiceFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  onCancel?: () => void;
  showHeader?: boolean;
}

// Типы для данных формы
export interface InvoiceFormData {
  id?: string;
  number: string;
  date: Date;
  clientId: string;
  supplierId: string;
  contractId: string;
  items: InvoiceItem[];
  totalAmount: number;
  totalWithMarkup: number;
}

// Типы для опций в селектах - переименованы для избежания конфликтов
export interface InvoiceClientOption {
  id: string;
  name: string;
  contracts?: InvoiceContractOption[]; // Сделали опциональным
}

export interface InvoiceSupplierOption {
  id: string;
  name: string;
}

export interface InvoiceContractOption {
  id: string;
  number: string;
  markupPercentage: number;
}

export interface InvoiceMaterialOption {
  id: string;
  name: string;
  unit: string;
}

/**
 * Форма для создания/редактирования накладной
 */
export function InvoiceForm({
  initialData,
  clients,
  suppliers,
  materials,
  onSubmit,
  isLoading = false,
  error,
  onCancel,
  showHeader = true
}: InvoiceFormProps) {
  const [selectedClientContracts, setSelectedClientContracts] = useState<InvoiceContractOption[]>([]);
  const [markupPercentage, setMarkupPercentage] = useState<number>(0);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>(initialData?.items || []);
  const [useCurrentPrices, setUseCurrentPrices] = useState<boolean>(true);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [isLoadingClientDetails, setIsLoadingClientDetails] = useState<boolean>(false);
  const prevContractsRef = useRef<InvoiceContractOption[]>([]);
  const isInitialRender = useRef(true);
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    defaultValues: initialData || {
      number: '',
      date: new Date(),
      clientId: '',
      supplierId: '',
      contractId: '',
      items: [],
      totalAmount: 0,
      totalWithMarkup: 0,
    },
  });
  const watchClientId = watch('clientId');
  const watchContractId = watch('contractId');
  const watchSupplierId = watch('supplierId');
  const clientResult = useClient(watchClientId || '');
  const clientData = useFragment(
    ClientFragments_clientDetails,
    (clientResult?.client || null)
  );
  const contractsData = useFragment(
    ContractFragments_list,
    clientData?.contracts || null
  );
  const calculateAmountWithMarkup = (amount: number, percentage: number): number => {
    return amount * (1 + percentage / 100);
  };
  const handleItemsChange = (items: InvoiceItem[]) => {
    const updatedItems = items.map(item => ({
      ...item,
      amountWithMarkup: calculateAmountWithMarkup(item.amount, markupPercentage)
    }));
    setInvoiceItems(updatedItems);
  };
  const handleTableLoadingChange = (loading: boolean) => {
    setIsTableLoading(loading);
  };
  const onSubmitHandler = async (data: InvoiceFormData) => {
    const formData = {
      ...data,
      items: invoiceItems
    };
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting invoice form:', error);
    }
  };
  const haveContractsChanged = (newContracts: InvoiceContractOption[]): boolean => {
    if (newContracts.length !== prevContractsRef.current.length) return true;
    
    return newContracts.some((contract, index) => {
      const prevContract = prevContractsRef.current[index];
      return !prevContract || 
             contract.id !== prevContract.id || 
             contract.markupPercentage !== prevContract.markupPercentage;
    });
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; 
    }
    if (clientData) {
      setIsLoadingClientDetails(false);
      if (contractsData && Array.isArray(contractsData)) {
        const contractOptions = contractsData.map((contract: any) => ({
          id: contract.id,
          number: contract.number,
          markupPercentage: contract.markup_percentage || 0,
        }));
        if (haveContractsChanged(contractOptions)) {
          setSelectedClientContracts(contractOptions);
          prevContractsRef.current = contractOptions;
          if (contractOptions.length > 0) {
            const contractExists = contractOptions.some((c: any) => c.id === watchContractId);
            if (!contractExists) {
              setValue('contractId', contractOptions[0].id);
            }
          }
        }
      } else if (selectedClientContracts.length > 0) {
        setSelectedClientContracts([]);
        prevContractsRef.current = [];
        setValue('contractId', '');
        setMarkupPercentage(0);
      }
    }
  }, [clientData, contractsData, setValue, watchContractId]);

  useEffect(() => {
    if (watchClientId) {
      setIsLoadingClientDetails(true);
    } else {
      if (selectedClientContracts.length > 0) {
        setSelectedClientContracts([]);
        prevContractsRef.current = [];
        setValue('contractId', '');
        setMarkupPercentage(0);
      }
    }
  }, [watchClientId]);

  useEffect(() => {
    if (!watchContractId) {
      if (markupPercentage !== 0) {
        setMarkupPercentage(0);
      }
      return;
    }
    const selectedContract = selectedClientContracts.find(
      contract => contract.id === watchContractId
    );
    if (selectedContract && selectedContract.markupPercentage !== markupPercentage) {
      setMarkupPercentage(selectedContract.markupPercentage);
    }
  }, [watchContractId, selectedClientContracts]);

  useEffect(() => {
    if (invoiceItems.length > 0) {
      const updatedItems = invoiceItems.map(item => ({
        ...item,
        amountWithMarkup: calculateAmountWithMarkup(item.amount, markupPercentage)
      }));
      
      setInvoiceItems(updatedItems);
    }
  }, [markupPercentage]);

  const content = (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="number">Номер накладной *</Label>
            <Input
              id="number"
              {...register('number', { required: 'Номер накладной обязателен' })}
              error={errors.number?.message}
              disabled={isLoading}
            />
            {errors.number && (
              <p key="number-error" className="text-xs text-red-500 mt-1">{errors.number.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Дата накладной *</Label>
            <Controller
              name="date"
              control={control}
              rules={{ required: 'Дата накладной обязательна' }}
              render={({ field }) => (
                <DatePicker
                  date={field.value}
                  setDate={field.onChange}
                  error={errors.date?.message}
                  disabled={isLoading}
                />
              )}
            />
            {errors.date && (
              <p key="date-error" className="text-xs text-red-500 mt-1">{errors.date.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clientId">Клиент *</Label>
            <Controller
              name="clientId"
              control={control}
              rules={{ required: 'Клиент обязателен' }}
              render={({ field }) => (
                <Select
                  disabled={isLoading}
                  onValueChange={(value) => {
                    console.log('InvoiceForm: выбран новый клиент, clientId =', value);
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger
                    error={errors.clientId?.message}
                    id="clientId"
                  >
                    <SelectValue placeholder="Выберите клиента" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.clientId && (
              <p key="client-error" className="text-xs text-red-500 mt-1">{errors.clientId.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contractId">Договор * (наценка: {markupPercentage}%)</Label>
            <Controller
              name="contractId"
              control={control}
              rules={{ required: 'Договор обязателен' }}
              render={({ field }) => (
                <Select
                  disabled={isLoading || isLoadingClientDetails || selectedClientContracts.length === 0}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    error={errors.contractId?.message}
                    id="contractId"
                  >
                    <SelectValue placeholder={
                      isLoadingClientDetails
                        ? "Загрузка договоров..."
                        : selectedClientContracts.length > 0
                          ? "Выберите договор"
                          : watchClientId
                            ? "У клиента нет договоров"
                            : "Сначала выберите клиента"
                    } />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {selectedClientContracts.map((contract) => (
                      <SelectItem key={contract.id} value={contract.id}>
                        {`№${contract.number} (наценка ${contract.markupPercentage}%)`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.contractId && (
              <p key="contract-error" className="text-xs text-red-500 mt-1">{errors.contractId.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="supplierId">Поставщик *</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="current-prices"
                checked={useCurrentPrices}
                onCheckedChange={setUseCurrentPrices}
                disabled={!watchSupplierId}
              />
              <Label htmlFor="current-prices" className="cursor-pointer text-sm">
                Использовать актуальные цены
              </Label>
            </div>
          </div>
          <Controller
            name="supplierId"
            control={control}
            rules={{ required: 'Поставщик обязателен' }}
            render={({ field }) => (
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger
                  error={errors.supplierId?.message}
                  id="supplierId"
                >
                  <SelectValue placeholder="Выберите поставщика" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.supplierId && (
            <p key="supplier-error" className="text-xs text-red-500 mt-1">{errors.supplierId.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Позиции накладной</h3>
        <div className={isTableLoading ? "relative" : ""}>
          {isTableLoading && (
            <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                <p className="text-sm text-muted-foreground">Загрузка данных...</p>
              </div>
            </div>
          )}
          <InvoiceItemTable
            items={invoiceItems}
            materials={materials}
            markupPercentage={markupPercentage}
            supplierId={useCurrentPrices ? watchSupplierId : undefined}
            onChange={handleItemsChange}
            onLoadingChange={handleTableLoadingChange}
            readOnly={isLoading}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        {onCancel && (
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={onCancel}
          >
            Отмена
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading || invoiceItems.length === 0}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </>
  );

  if (!showHeader) {
    return (
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {content}
      </form>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData?.id ? 'Редактирование накладной' : 'Новая накладная'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <CardContent>
          {content}
        </CardContent>
        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={onCancel}
            >
              Отмена
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading || invoiceItems.length === 0}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}