// libs/ui/src/lib/components/common/Toaster.tsx
"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastAction,
  ToastProps,
} from "./Toast";
import { useToast } from "../../hooks/useToast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 z-[100] flex flex-col gap-2 px-4 py-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col-reverse sm:items-end sm:justify-start sm:pb-10 sm:pt-0 md:gap-3">
      {toasts.map(({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) => (
        <Toast key={id} variant={variant} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
    </div>
  );
}