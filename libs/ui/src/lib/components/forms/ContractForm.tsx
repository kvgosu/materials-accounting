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

// Типы для пропсов формы
interface ContractFormProps {
  initialData?: ContractFormData;
  clients: ContractClientOption[]; // Переименовано для избежания конфликта
  onSubmit: (data: ContractFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  onCancel?: () => void;
  showHeader?: boolean;
}

// Типы для данных формы
export interface ContractFormData {
  id?: string;
  clientId: string;
  number: string;
  date: Date;
  markupPercentage: number;
  status: 'ACTIVE' | 'INACTIVE';
  expirationDate?: Date | null;
}

// Тип для опции клиента в селекте - переименовано, чтобы избежать конфликта
export interface ContractClientOption {
  id: string;
  name: string;
}

/**
 * Форма для создания/редактирования договора
 */
export function ContractForm({
  initialData,
  clients,
  onSubmit,
  isLoading = false,
  error,
  onCancel,
  showHeader = true
}: ContractFormProps) {
  // Настройка React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContractFormData>({
    defaultValues: initialData || {
      clientId: '',
      number: '',
      date: new Date(),
      markupPercentage: 15,
      status: 'ACTIVE',
      expirationDate: null,
    },
  });

  // Обработчик отправки формы
  const onSubmitHandler = async (data: ContractFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting contract form:', error);
    }
  };

  const content = (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientId">Клиент *</Label>
          <Controller
            name="clientId"
            control={control}
            rules={{ required: 'Клиент обязателен' }}
            render={({ field }) => (
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
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
            <p className="text-xs text-red-500 mt-1">{errors.clientId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="number">Номер договора *</Label>
          <Input
            id="number"
            {...register('number', { required: 'Номер договора обязателен' })}
            error={errors.number?.message}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Дата заключения *</Label>
          <Controller
            name="date"
            control={control}
            rules={{ required: 'Дата заключения обязательна' }}
            render={({ field }) => (
              <DatePicker
                date={field.value}
                setDate={field.onChange}
                error={errors.date?.message}
                disabled={isLoading}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="markupPercentage">Процент наценки *</Label>
          <Input
            id="markupPercentage"
            type="number"
            step="0.01"
            min="0"
            {...register('markupPercentage', { 
              required: 'Процент наценки обязателен',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Процент наценки не может быть отрицательным'
              }
            })}
            error={errors.markupPercentage?.message}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Статус *</Label>
          <Controller
            name="status"
            control={control}
            rules={{ required: 'Статус обязателен' }}
            render={({ field }) => (
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Активный</SelectItem>
                  <SelectItem value="INACTIVE">Неактивный</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expirationDate">Дата окончания действия</Label>
          <Controller
            name="expirationDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                date={field.value || undefined}
                setDate={field.onChange}
                disabled={isLoading}
                placeholder="Выберите дату (необязательно)"
              />
            )}
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </>
  );

  // Если не требуется обертка в Card
  if (!showHeader) {
    return (
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {content}
      </form>
    );
  }

  // Версия с оберткой в Card
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData?.id ? 'Редактирование договора' : 'Новый договор'}</CardTitle>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}