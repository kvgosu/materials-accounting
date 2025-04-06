// libs/ui/src/lib/components/providers/ToastProvider.tsx
"use client";

import { ToastProvider as InternalToastProvider } from "../../hooks/useToast";
import { Toaster } from "../common/Toaster";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <InternalToastProvider>
      {children}
      <Toaster />
    </InternalToastProvider>
  );
}