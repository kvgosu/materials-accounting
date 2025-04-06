// apps/web/src/hooks/clients/useClientForm.ts
import { useLazyLoadQuery } from 'react-relay';
import { ClientQuery } from '@materials-accounting/graphql';
import { ClientQueryType } from '@materials-accounting/types';
import { ClientFormValues } from '@materials-accounting/types';

export function useClientForm(clientId: string | null) {
  // Всегда вызываем useLazyLoadQuery, но с пустым ID для нового клиента
  const data = useLazyLoadQuery<ClientQueryType>(
    ClientQuery,
    { id: clientId || '' },
    { fetchPolicy: 'network-only' }
  );
  
  // Преобразование данных клиента в формат формы
  const clientFormData: ClientFormValues | null = clientId ? {
    id: data.client.id,
    name: data.client.name,
    contact_person: data.client.contact_person || '',
    phone: data.client.phone || '',
    email: data.client.email || '',
    address: data.client.address || ''
  } : null;

  return {
    clientData: clientFormData,
    loading: clientId !== null && !data.client
  };
}