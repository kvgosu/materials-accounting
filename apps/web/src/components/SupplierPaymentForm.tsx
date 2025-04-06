// apps/web/src/components/SupplierPaymentForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Input,
  Label,
  DatePicker,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@materials-accounting/ui';
import { SupplierPaymentFormValues } from '@materials-accounting/types';

interface SupplierPaymentFormProps {
  onSubmit: (data: SupplierPaymentFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

interface SupplierOption {
  id: string;
  name: string;
  debtBalance?: number;
}

export function SupplierPaymentForm({
  onSubmit,
  onCancel,
  isLoading = false
}: SupplierPaymentFormProps) {
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [suppliersLoading, setSuppliersLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<SupplierPaymentFormValues>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      amount: 0
    }
  });

  const selectedSupplierId = watch('supplierId');
  const selectedSupplier = suppliers.find(supplier => supplier.id === selectedSupplierId);

  // Загрузка списка поставщиков
  useEffect(() => {
    const fetchSuppliers = async () => {
      setSuppliersLoading(true);

      // В реальном приложении здесь был бы запрос GraphQL
      // В примере используем моковые данные
      setTimeout(() => {
        // Мок-данные с долгами поставщиков
        const mockSuppliers: SupplierOption[] = [
          { id: '1', name: 'ООО "СтройМатериалы"', debtBalance: 42500 },
          { id: '2', name: 'ЗАО "МеталлПром"', debtBalance: 0 },
          { id: '3', name: 'ИП Столяров', debtBalance: 15000 },
          { id: '4', name: 'ООО "АвтоЗапчасти"', debtBalance: 18500 }
        ];

        setSuppliers(mockSuppliers);
        setSuppliersLoading(false);
      }, 300);
    };

    fetchSuppliers();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="supplierId">Поставщик *</Label>
        <Controller
          name="supplierId"
          control={control}
          rules={{ required: 'Необходимо выбрать поставщика' }}
          render={({ field }) => (
            <Select
              disabled={isLoading || suppliersLoading}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger id="supplierId" error={errors.supplierId?.message}>
                <SelectValue placeholder="Выберите поставщика" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name} {supplier.debtBalance ? `(долг: ${supplier.debtBalance.toLocaleString()} ₸)` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.supplierId && <p className="text-sm text-red-500">{errors.supplierId.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Сумма оплаты *</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          {...register('amount', {
            required: 'Необходимо указать сумму',
            valueAsNumber: true,
            min: {
              value: 0.01,
              message: 'Сумма должна быть больше нуля'
            },
            validate: {
              notOverDebt: value => {
                // Проверяем, что сумма не превышает долг, если долг существует
                if (selectedSupplier?.debtBalance && value > selectedSupplier.debtBalance) {
                  return `Сумма не может превышать долг поставщику (${selectedSupplier.debtBalance.toLocaleString()} ₸)`;
                }
                return true;
              }
            }
          })}
          error={errors.amount?.message}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Дата оплаты *</Label>
        <Controller
          name="date"
          control={control}
          rules={{ required: 'Необходимо указать дату' }}
          render={({ field }) => (
            <DatePicker
              date={field.value ? new Date(field.value) : undefined}
              setDate={(date) => date && field.onChange(date.toISOString().split('T')[0])}
              error={errors.date?.message}
              disabled={isLoading}
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Комментарий</Label>
        <Input
          id="description"
          {...register('description')}
          disabled={isLoading}
          placeholder="Номер платежного поручения, примечания и т.д."
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !selectedSupplierId || selectedSupplier?.debtBalance === 0}
        >
          {isLoading ? 'Сохранение...' : 'Зарегистрировать оплату'}
        </Button>
      </div>
    </form>
  );
}