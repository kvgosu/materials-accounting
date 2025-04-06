import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Label } from '../common/Label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../common/Card';
import { Alert, AlertDescription } from '../common/Alert';

// Типы для пропсов формы
interface SupplierFormProps {
  initialData?: SupplierFormData;
  onSubmit: (data: SupplierFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  onCancel?: () => void;
  showHeader?: boolean;
}

// Типы для данных формы
export interface SupplierFormData {
  id?: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
}

/**
 * Форма для создания/редактирования поставщика
 */
export function SupplierForm({
  initialData,
  onSubmit,
  isLoading = false,
  error,
  onCancel,
  showHeader = true
}: SupplierFormProps) {
  // Настройка React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormData>({
    defaultValues: initialData || {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
    },
  });

  // Обработчик отправки формы
  const onSubmitHandler = async (data: SupplierFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting supplier form:', error);
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
          <Label htmlFor="name">Название поставщика *</Label>
          <Input
            id="name"
            {...register('name', { required: 'Название поставщика обязательно' })}
            error={errors.name?.message}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPerson">Контактное лицо</Label>
          <Input
            id="contactPerson"
            {...register('contactPerson')}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Электронная почта</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email',
              },
            })}
            error={errors.email?.message}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Адрес</Label>
          <Input
            id="address"
            {...register('address')}
            disabled={isLoading}
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
        <CardTitle>{initialData?.id ? 'Редактирование поставщика' : 'Новый поставщик'}</CardTitle>
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