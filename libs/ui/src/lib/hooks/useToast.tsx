// libs/ui/src/lib/hooks/useToast.tsx
"use client";

import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { ToastActionElement } from '../components/common/Toast';

type ToastVariant = 'default' | 'destructive';

interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: ToastVariant;
  duration?: number;
}

type ToasterToast = ToastProps;

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

interface ToasterToastWithId extends ToastProps {
  id: string;
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

interface ToastContextType {
  toasts: ToasterToastWithId[];
  addToast: (props: ToastProps) => string;
  removeToast: (id: string) => void;
  removeAll: () => void;
  updateToast: (id: string, props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => "",
  removeToast: () => {},
  removeAll: () => {},
  updateToast: () => {},
});

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToasterToastWithId[]>([]);

  const addToast = React.useCallback(
    (props: ToastProps) => {
      const id = props.id || genId();

      setToasts((prevToasts) => {
        const newToast = {
          ...props,
          id,
        };

        // Если достигнут лимит тостов, удаляем самый старый
        if (prevToasts.length >= TOAST_LIMIT) {
          return [...prevToasts.slice(1), newToast];
        }

        return [...prevToasts, newToast];
      });

      // Если установлена длительность, автоматически удаляем тост
      if (props.duration !== Infinity) {
        const duration = props.duration || 5000; // 5 секунд по умолчанию
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [setToasts]
  );

  const removeToast = React.useCallback(
    (id: string) => {
      setToasts((prevToasts) => 
        prevToasts.filter((toast) => toast.id !== id)
      );
    },
    [setToasts]
  );

  const removeAll = React.useCallback(() => {
    setToasts([]);
  }, [setToasts]);

  const updateToast = React.useCallback(
    (id: string, props: ToastProps) => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === id ? { ...toast, ...props } : toast
        )
      );
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        removeAll,
        updateToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const toast = (props: Omit<ToastProps, "id">) => {
    return context.addToast({
      ...props,
      id: ''
    });
  };

  toast.dismiss = (toastId?: string) => {
    if (toastId) {
      context.removeToast(toastId);
    } else {
      context.removeAll();
    }
  };

  toast.update = (toastId: string, props: ToastProps) => {
    context.updateToast(toastId, props);
  };

  return { toast, toasts: context.toasts };
}