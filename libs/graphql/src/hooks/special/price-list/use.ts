// libs/graphql/src/hooks/special/price-list/use.ts
import { useState, useCallback, useMemo } from 'react';
import { graphql, useMutation } from 'react-relay';
import { 
  PriceListsQueryResponse,
  PriceListQueryResponse,
  PriceListItemsQueryResponse,
  UploadPriceListInput,
  UpdatePriceListItemInput,
  UploadPriceListMutationResponse,
  DeactivatePriceListMutationResponse,
  GenerateTemplateMutationResponse,
  LinkItemToMaterialMutationResponse,
  UpdatePriceListItemMutationResponse,
  ActivatePriceListMutationResponse,
  CurrentMaterialPriceQueryResponse
} from '@materials-accounting/types';
import { useEntityList, useEntityDetails } from '../../generic';

export function usePriceLists(
  skip: number = 0,
  limit: number = 10,
  supplier_id?: string,
  is_active?: boolean,
  date_from?: string,
  date_to?: string
) {
  return useEntityList<
    PriceListsQueryResponse,
    {
      skip?: number;
      limit?: number;
      supplier_id?: string;
      is_active?: boolean;
      date_from?: string;
      date_to?: string;
    }
  >(
    graphql`
      query usePriceListsQuery(
        $skip: Int,
        $limit: Int,
        $supplier_id: ID,
        $is_active: Boolean,
        $date_from: String,
        $date_to: String
      ) {
        price_lists(
          skip: $skip,
          limit: $limit,
          supplier_id: $supplier_id,
          is_active: $is_active,
          date_from: $date_from,
          date_to: $date_to
        ) {
          ...PriceListFragments_list
        }
      }
    `,
    {
      skip,
      limit,
      supplier_id,
      is_active,
      date_from,
      date_to
    },
    { entityKey: 'price_lists' }
  );
}

export function usePriceList(id: string) {
  return useEntityDetails<
    PriceListQueryResponse,
    { id: string }
  >(
    graphql`
      query usePriceListQuery($id: ID!) {
        price_list(id: $id) {
          ...PriceListFragments_priceListDetails
          items {
            ...PriceListFragments_priceListItemList
          }
        }
      }
    `,
    { id },
    { entityKey: 'price_list' }
  );
}

export function usePriceListItems(
  price_list_id: string,
  skip: number = 0,
  limit: number = 100,
  search?: string
) {
  return useEntityList<
    PriceListItemsQueryResponse,
    {
      price_list_id: string;
      skip?: number;
      limit?: number;
      search?: string;
    }
  >(
    graphql`
      query usePriceListItemsQuery(
        $price_list_id: ID!,
        $skip: Int,
        $limit: Int,
        $search: String
      ) {
        price_list_items(
          price_list_id: $price_list_id,
          skip: $skip,
          limit: $limit,
          search: $search
        ) {
          ...PriceListFragments_priceListItemList
        }
      }
    `,
    {
      price_list_id,
      skip,
      limit,
      search
    },
    { entityKey: 'price_list_items' }
  );
}

export function useCurrentMaterialPrice(material_id: string, supplier_id: string) {
  const variables = useMemo(() => {
    const isValid = (id: string): boolean => {
      return Boolean(id && id.trim() && id !== 'undefined' && id !== 'null');
    };
    
    const validMaterialId = isValid(material_id);
    const validSupplierId = isValid(supplier_id);

    return {
      material_id: validMaterialId && validSupplierId ? material_id : "00000000-0000-0000-0000-000000000000",
      supplier_id: validMaterialId && validSupplierId ? supplier_id : "00000000-0000-0000-0000-000000000000"
    };
  }, [material_id, supplier_id]);

  // Всегда вызываем хук useEntityDetails с переменными
  const result = useEntityDetails<
    CurrentMaterialPriceQueryResponse,
    { material_id: string; supplier_id: string }
  >(
    graphql`
      query useCurrentMaterialPriceQuery($material_id: ID!, $supplier_id: ID!) {
        current_material_price(material_id: $material_id, supplier_id: $supplier_id) {
          ...PriceListFragments_currentMaterialPrice
        }
      }
    `,
    variables,
    { entityKey: 'current_material_price' }
  );

  return result;
}

export function useUploadPriceList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useUploadPriceListMutation($input: UploadPriceListInput!) {
        upload_price_list(input: $input) {
          price_list {
            ...PriceListFragments_priceListDetails
          }
          processed_items
          skipped_items
        }
      }
    `
  );

  const uploadPriceList = useCallback(
    async (input: UploadPriceListInput): Promise<UploadPriceListMutationResponse> => {
      setLoading(true);
      setError(null);

      try {
        // Базовая валидация
        if (!input.supplier_id) {
          throw new Error('ID поставщика не указан');
        }
        if (!input.date) {
          throw new Error('Дата прайс-листа не указана');
        }
        if (!input.file) {
          throw new Error('Файл прайс-листа не выбран');
        }

        // Для файлов нужно использовать специальный формат для GraphQL
        // Преобразуем File в base64 для передачи через GraphQL
        const fileBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(input.file);
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              // Убираем префикс data:application/...;base64,
              const base64 = reader.result.split(',')[1];
              resolve(base64);
            } else {
              reject(new Error('Не удалось прочитать файл'));
            }
          };
          reader.onerror = () => {
            reject(reader.error);
          };
        });

        // Подготавливаем входные данные для мутации
        const mutationInput = {
          supplier_id: input.supplier_id,
          date: input.date,
          file: {
            name: input.file.name,
            data: fileBase64
          }
        };

        // Выполняем мутацию
        const response = await new Promise<UploadPriceListMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: {
              input: mutationInput,
            },
            onCompleted: (response: any, errors: any) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as UploadPriceListMutationResponse);
              }
            },
            onError: (error: any) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при загрузке прайс-листа');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    uploadPriceList,
    loading,
    error,
  };
}

export function useDeactivatePriceList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useDeactivatePriceListMutation($id: ID!) {
        deactivate_price_list(id: $id) {
          success
        }
      }
    `
  );

  const deactivatePriceList = useCallback(
    async (id: string): Promise<DeactivatePriceListMutationResponse> => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise<DeactivatePriceListMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: { id },
            onCompleted: (response: any, errors: any) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as DeactivatePriceListMutationResponse);
              }
            },
            onError: (error: any) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при деактивации прайс-листа');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    deactivatePriceList,
    loading,
    error,
  };
}

export function useActivatePriceList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useActivatePriceListMutation($id: ID!) {
        activate_price_list(id: $id) {
          success
        }
      }
    `
  );

  const activatePriceList = useCallback(
    async (id: string): Promise<ActivatePriceListMutationResponse> => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise<ActivatePriceListMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: { id },
            onCompleted: (response: any, errors: any) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as ActivatePriceListMutationResponse);
              }
            },
            onError: (error: any) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при активации прайс-листа');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    activatePriceList,
    loading,
    error,
  };
}

export function useGenerateTemplate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useGenerateTemplateMutation($supplier_id: ID!) {
        generate_template(supplier_id: $supplier_id) {
          download_url
        }
      }
    `
  );

  const generateTemplate = useCallback(
    async (supplier_id: string): Promise<GenerateTemplateMutationResponse> => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise<GenerateTemplateMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: { supplier_id },
            onCompleted: (response: any, errors: any) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as GenerateTemplateMutationResponse);
              }
            },
            onError: (error: any) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при генерации шаблона');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    generateTemplate,
    loading,
    error,
  };
}

export function useLinkItemToMaterial() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useLinkItemToMaterialMutation($item_id: ID!, $material_id: ID!) {
        link_price_list_item_to_material(item_id: $item_id, material_id: $material_id) {
          item {
            ...PriceListFragments_priceListItemDetails
          }
          material {
            ...MaterialFragments_materialDetails
          }
        }
      }
    `
  );

  const linkItemToMaterial = useCallback(
    async (item_id: string, material_id: string): Promise<LinkItemToMaterialMutationResponse> => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise<LinkItemToMaterialMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: { item_id, material_id },
            onCompleted: (response: any, errors: any) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as LinkItemToMaterialMutationResponse);
              }
            },
            onError: (error: any) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при связывании позиции с материалом');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    linkItemToMaterial,
    loading,
    error,
  };
}

export function useUpdatePriceListItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [commitMutation] = useMutation<any>(
    graphql`
      mutation useUpdatePriceListItemMutation($item_id: ID!, $input: UpdatePriceListItemInput!) {
        update_price_list_item(item_id: $item_id, input: $input) {
          item {
            ...PriceListFragments_priceListItemDetails
          }
        }
      }
    `
  );

  const updatePriceListItem = useCallback(
    async (item_id: string, input: UpdatePriceListItemInput): Promise<UpdatePriceListItemMutationResponse> => {
      setLoading(true);
      setError(null);

      try {
        const response = await new Promise<UpdatePriceListItemMutationResponse>((resolve, reject) => {
          commitMutation({
            variables: { item_id, input },
            onCompleted: (response: any, errors: any) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(response as UpdatePriceListItemMutationResponse);
              }
            },
            onError: (error: any) => {
              reject(error);
            },
          });
        });

        return response;
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при обновлении позиции прайс-листа');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [commitMutation]
  );

  return {
    updatePriceListItem,
    loading,
    error,
  };
}