// libs/ui/src/lib/components/common/Modal.tsx
import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from './Dialog';
import { Button } from './Button';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean; // Параметр для контроля отображения кнопки закрытия
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Компонент Modal (обертка над Dialog) для отображения модальных окон
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showCloseButton = true, // По умолчанию показываем кнопку
  size = 'md',
}: ModalProps) {
  // Классы для разных размеров
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[95vw] max-h-[95vh]',
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`bg-white ${sizeClasses[size]} ${size === 'full' ? 'overflow-auto' : ''}`}
        // Важно: Отключаем встроенную кнопку закрытия в DialogContent
        // (будет использоваться наша кнопка в DialogHeader)
        showCloseButton={false}
      >
        {title && (
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{title}</DialogTitle>
              {showCloseButton && (
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full p-0"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>
              )}
            </div>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className={size === 'full' ? 'flex-1 overflow-auto' : ''}>{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

// Экспортируем для удобства
export {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './Dialog';