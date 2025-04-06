// libs/graphql/src/hooks/generic/index.ts
import { useState, useCallback, useMemo } from 'react';
import { GraphQLTaggedNode, useLazyLoadQuery, useMutation } from 'react-relay';
import type { FetchPolicy, OperationType } from 'relay-runtime';

/**
 * Generic хук для получения списка сущностей
 */
export function useEntityList<
  TResponse extends Record<string, any[]>,
  TVariables extends Record<string, any>
>(
  query: GraphQLTaggedNode,
  variables: TVariables,
  options: { 
    entityKey: keyof TResponse; 
    fetchPolicy?: FetchPolicy;
  }
) {
  const { entityKey, fetchPolicy = 'store-or-network' } = options;
  
  const data = useLazyLoadQuery<any>(
    query,
    variables,
    { fetchPolicy }
  );

  return useMemo(() => ({
    [entityKey]: data[entityKey] || []
  }), [data, entityKey]) as TResponse;
}

/**
 * Generic хук для получения детальной информации о сущности
 */
export function useEntityDetails<
  TResponse extends Record<string, any>,
  TVariables extends { id: string }
>(
  query: GraphQLTaggedNode,
  variables: TVariables,
  options: { 
    entityKey: keyof TResponse;
    fetchPolicy?: FetchPolicy;
  }
) {
  const { entityKey, fetchPolicy = 'store-or-network' } = options;
  
  const data = useLazyLoadQuery<any>(
    query,
    variables,
    { fetchPolicy }
  );

  return useMemo(() => ({
    [entityKey]: data[entityKey]
  }), [data, entityKey]) as TResponse;
}

/**
 * Generic хук для создания сущности
 */
export function useEntityCreate<
  TInput extends Record<string, any>,
  TResponse extends Record<string, { [key: string]: any }>,
  TMutationKey extends keyof TResponse
>(
  mutation: GraphQLTaggedNode,
  options: { 
    responseKey: TMutationKey;
  }
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { responseKey } = options;

  const [commitMutation] = useMutation<any>(mutation);

  const createEntity = useCallback(
    async (input: TInput) => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise<TResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              input,
            },
            onCompleted: (response, errors) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as unknown as TResponse);
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || `Произошла ошибка при создании`);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation, responseKey]
  );

  return {
    create: createEntity,
    loading,
    error,
  };
}

/**
 * Generic хук для обновления сущности
 */
export function useEntityUpdate<
  TInput extends Record<string, any> & { id?: string },
  TResponse extends Record<string, { [key: string]: any }>,
  TMutationKey extends keyof TResponse
>(
  mutation: GraphQLTaggedNode,
  options: { 
    responseKey: TMutationKey;
  }
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { responseKey } = options;

  const [commitMutation] = useMutation<any>(mutation);

  const updateEntity = useCallback(
    async (data: TInput) => {
      if (!data.id) {
        setError('ID сущности не указан');
        return;
      }

      setLoading(true);
      setError(null);

      const { id, ...input } = data;

      try {
        const response = await new Promise<TResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              id,
              input,
            },
            onCompleted: (response, errors) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as unknown as TResponse);
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || `Произошла ошибка при обновлении`);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation, responseKey]
  );

  return {
    update: updateEntity,
    loading,
    error,
  };
}

/**
 * Generic хук для удаления сущности
 */
export function useEntityDelete<
  TResponse extends { [key: string]: { success: boolean } }
>(
  mutation: GraphQLTaggedNode,
  options: { 
    responseKey: keyof TResponse;
  }
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { responseKey } = options;

  const [commitMutation] = useMutation<any>(mutation);

  const deleteEntity = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise<TResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              id,
            },
            onCompleted: (response, errors) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as unknown as TResponse);
              }
            },
            onError: (error) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || `Произошла ошибка при удалении`);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation, responseKey]
  );

  return {
    delete: deleteEntity,
    loading,
    error,
  };
}