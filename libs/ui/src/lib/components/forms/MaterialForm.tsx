import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Label } from '../common/Label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../common/Card';
import { Alert, AlertDescription } from '../common/Alert';

// Типы для пропсов формы
interface MaterialFormProps {
  initialData?: MaterialFormData;
  onSubmit: (data: MaterialFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  onCancel?: () => void;
  showHeader?: boolean;
}

// Типы для данных формы
export interface MaterialFormData {
  id?: string;
  name: string;
  unit: string;
  description?: string;
}

/**
 * Форма для создания/редактирования материала
 */
export function MaterialForm({
  initialData,
  onSubmit,
  isLoading = false,
  error,
  onCancel,
  showHeader = true
}: MaterialFormProps) {
  // Настройка React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaterialFormData>({
    defaultValues: initialData || {
      name: '',
      unit: '',
      description: '',
    },
  });

  // Обработчик отправки формы
  const onSubmitHandler = async (data: MaterialFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting material form:', error);
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
          <Label htmlFor="name">Название материала *</Label>
          <Input
            id="name"
            {...register('name', { required: 'Название материала обязательно' })}
            error={errors.name?.message}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Единица измерения *</Label>
          <Input
            id="unit"
            {...register('unit', { required: 'Единица измерения обязательна' })}
            error={errors.unit?.message}
            disabled={isLoading}
            placeholder="м², м³, шт., кг и т.д."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Описание</Label>
          <Input
            id="description"
            {...register('description')}
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
        <CardTitle>{initialData?.id ? 'Редактирование материала' : 'Новый материал'}</CardTitle>
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