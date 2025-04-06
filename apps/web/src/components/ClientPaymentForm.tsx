// apps/web/src/components/ClientPaymentForm.tsx
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
import { ClientPaymentFormValues } from '@materials-accounting/types';

interface ClientPaymentFormProps {
  onSubmit: (data: ClientPaymentFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

interface ClientOption {
  id: string;
  name: string;
  debtBalance?: number;
}

export function ClientPaymentForm({
  onSubmit,
  onCancel,
  isLoading = false
}: ClientPaymentFormProps) {
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [clientsLoading, setClientsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<ClientPaymentFormValues>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      amount: 0
    }
  });

  const selectedClientId = watch('clientId');
  const selectedClient = clients.find(client => client.id === selectedClientId);

  // Загрузка списка клиентов
  useEffect(() => {
    const fetchClients = async () => {
      setClientsLoading(true);

      // В реальном приложении здесь был бы запрос GraphQL
      // В примере используем моковые данные
      setTimeout(() => {
        // Мок-данные с долгами клиентов
        const mockClients: ClientOption[] = [
          { id: '1', name: 'ООО "Восток"', debtBalance: 50150 },
          { id: '2', name: 'ЗАО "Строитель"', debtBalance: 0 },
          { id: '3', name: 'ИП Сидоров', debtBalance: 16500 },
          { id: '4', name: 'ООО "Юг"', debtBalance: 21275 }
        ];

        setClients(mockClients);
        setClientsLoading(false);
      }, 300);
    };

    fetchClients();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="clientId">Клиент *</Label>
        <Controller
          name="clientId"
          control={control}
          rules={{ required: 'Необходимо выбрать клиента' }}
          render={({ field }) => (
            <Select
              disabled={isLoading || clientsLoading}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger id="clientId" error={errors.clientId?.message}>
                <SelectValue placeholder="Выберите клиента" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} {client.debtBalance ? `(долг: ${client.debtBalance.toLocaleString()} ₸)` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.clientId && <p className="text-sm text-red-500">{errors.clientId.message}</p>}
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
                if (selectedClient?.debtBalance && value > selectedClient.debtBalance) {
                  return `Сумма не может превышать долг клиента (${selectedClient.debtBalance.toLocaleString()} ₸)`;
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
          disabled={isLoading || !selectedClientId || selectedClient?.debtBalance === 0}
        >
          {isLoading ? 'Сохранение...' : 'Зарегистрировать оплату'}
        </Button>
      </div>
    </form>
  );
}