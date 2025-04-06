import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ru } from 'date-fns/locale';

import { cn } from '../../utils';
import { Button } from './Button';
import { Calendar } from './Calendar';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

// Интерфейс для пропсов DatePicker
export interface DatePickerProps {
  date?: Date;
  setDate: (date?: Date) => void;
  className?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

// Компонент DatePicker
export function DatePicker({
  date,
  setDate,
  className,
  placeholder = 'Выберите дату',
  error,
  disabled = false,
}: DatePickerProps) {
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              error ? 'border-red-500' : '',
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP', { locale: ru }) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className='bg-white'
          />
        </PopoverContent>
      </Popover>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}