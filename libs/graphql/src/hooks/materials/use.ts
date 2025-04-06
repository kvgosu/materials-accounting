// libs/graphql/src/hooks/material.ts
import { graphql } from 'react-relay';
import { 
  useEntityList, 
  useEntityDetails, 
  useEntityCreate, 
  useEntityUpdate, 
  useEntityDelete 
} from '../generic';
import { 
  MaterialsQueryResponse,
  MaterialQueryResponse,
  CreateMaterialMutationResponse,
  UpdateMaterialMutationResponse,
  DeleteMaterialMutationResponse
} from '@materials-accounting/types'; // Замените на правильный путь к вашим типам
import { MaterialFormValues } from '@materials-accounting/types'; // Замените на правильный путь к вашим типам

/**
 * Хук для получения списка материалов
 */
export function useMaterials(
  skip: number = 0,
  limit: number = 10,
  search?: string
) {
  return useEntityList<
    MaterialsQueryResponse,
    { skip?: number; limit?: number; search?: string }
  >(
    graphql`
      query useMaterialsQuery($skip: Int, $limit: Int, $search: String) {
        materials(skip: $skip, limit: $limit, search: $search) {
          ...MaterialFragments_list
        }
      }
    `,
    { skip, limit, search },
    { entityKey: 'materials' }
  );
}

/**
 * Хук для получения информации о материале
 */
export function useMaterial(id: string) {
  return useEntityDetails<
    MaterialQueryResponse,
    { id: string }
  >(
    graphql`
      query useMaterialQuery($id: ID!) {
        material(id: $id) {
          ...MaterialFragments_materialDetails
        }
      }
    `,
    { id },
    { entityKey: 'material' }
  );
}

/**
 * Хук для создания материала
 */
export function useCreateMaterial() {
  const { create, loading, error } = useEntityCreate<
    MaterialFormValues,
    CreateMaterialMutationResponse,
    'create_material'
  >(
    graphql`
      mutation useCreateMaterialMutation($input: CreateMaterialInput!) {
        create_material(input: $input) {
          material {
            ...MaterialFragments_materialDetails
          }
        }
      }
    `,
    { responseKey: 'create_material' }
  );

  return {
    createMaterial: create,
    loading,
    error
  };
}

/**
 * Хук для обновления материала
 */
export function useUpdateMaterial() {
  const { update, loading, error } = useEntityUpdate<
    MaterialFormValues,
    UpdateMaterialMutationResponse,
    'update_material'
  >(
    graphql`
      mutation useUpdateMaterialMutation($id: ID!, $input: UpdateMaterialInput!) {
        update_material(id: $id, input: $input) {
          material {
            ...MaterialFragments_materialDetails
          }
        }
      }
    `,
    { responseKey: 'update_material' }
  );

  return {
    updateMaterial: update,
    loading,
    error
  };
}

/**
 * Хук для удаления материала
 */
export function useDeleteMaterial() {
  const { delete: deleteEntity, loading, error } = useEntityDelete<
    DeleteMaterialMutationResponse
  >(
    graphql`
      mutation useDeleteMaterialMutation($id: ID!) {
        delete_material(id: $id) {
          success
        }
      }
    `,
    { responseKey: 'delete_material' }
  );

  return {
    deleteMaterial: deleteEntity,
    loading,
    error
  };
}