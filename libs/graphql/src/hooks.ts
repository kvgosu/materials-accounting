// libs/graphql/src/hooks.ts

// Экспортируем все хуки клиентов
export { 
    useClients, 
    useClient, 
    useCreateClient, 
    useUpdateClient, 
    useDeleteClient 
  } from './hooks/clients/use';
  
  // Экспортируем все хуки поставщиков
  export {
    useSuppliers,
    useSupplier,
    useCreateSupplier,
    useUpdateSupplier,
    useDeleteSupplier
  } from './hooks/suppliers/use';
  
  // Экспортируем все хуки договоров
  export {
    useContracts,
    useContract,
    useCreateContract,
    useUpdateContract,
    useDeleteContract
  } from './hooks/contracts/use';
  
  // Экспортируем все хуки материалов
  export {
    useMaterials,
    useMaterial,
    useCreateMaterial,
    useUpdateMaterial,
    useDeleteMaterial
  } from './hooks/materials/use';  
  
  // Экспортируем все хуки материалов
  export {
    useTransactions,
    useTransaction
  } from './hooks/transaction/use';
  
  // Экспортируем хук для дашборда
  export { useDashboard } from './hooks/dashboard/use';
  
  export {
    usePriceLists,
    usePriceList,
    usePriceListItems,
    useCurrentMaterialPrice,
    useUploadPriceList,
    useDeactivatePriceList,
    useActivatePriceList,
    useGenerateTemplate,
    useLinkItemToMaterial,
    useUpdatePriceListItem
  } from './hooks/special/price-list/use';

  // Экспортируем специализированные хуки
  export * from './hooks/special';