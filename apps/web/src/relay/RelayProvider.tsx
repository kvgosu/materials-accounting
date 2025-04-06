// apps/web/src/relay/RelayProvider.tsx
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { getEnvironment } from './RelayEnvironment';

export const RelayProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const environment = getEnvironment();

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};