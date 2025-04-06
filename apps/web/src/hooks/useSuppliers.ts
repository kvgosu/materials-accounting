// apps/web/src/hooks/useSuppliers.ts
import { useLazyLoadQuery } from 'react-relay';
import { SuppliersQuery } from '@materials-accounting/graphql';
import { SuppliersQueryResponse } from '@materials-accounting/types';

type SuppliersQueryType = {
  readonly variables: {
    skip?: number;
    limit?: number;
    search?: string;
  };
  readonly response: SuppliersQueryResponse;
}

export function useSuppliers(skip = 0, limit = 10, search?: string) {
  const data = useLazyLoadQuery<SuppliersQueryType>(
    SuppliersQuery,
    { skip, limit, search },
    { fetchPolicy: 'network-only' }
  );
  
  return {
    suppliers: data?.suppliers || [],
    loading: false
  };
}