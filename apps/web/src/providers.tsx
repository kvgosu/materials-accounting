// apps/web/src/providers.tsx
'use client';

import React from 'react';
import { RelayProvider } from './relay/RelayProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <RelayProvider>
      {children}
    </RelayProvider>
  );
}