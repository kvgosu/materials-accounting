// apps/web/src/hooks/clients/useCreateClient.ts
import { useMutation } from 'react-relay';
import { 
  CreateClientMutation, 
  UpdateClientMutation, 
  DeleteClientMutation 
} from '@materials-accounting/graphql';
import { 
  ClientFormValues 
} from '@materials-accounting/types';
import { 
  CreateClientMutationType 
} from '@materials-accounting/types';

export function useCreateClient() {
  const [commitCreate, isCreateInFlight] = useMutation<CreateClientMutationType>(
    CreateClientMutation
  );
  
  const [commitUpdate, isUpdateInFlight] = useMutation(
    UpdateClientMutation
  );
  
  const [commitDelete, isDeleteInFlight] = useMutation(
    DeleteClientMutation
  );

  const createClient = (clientData: ClientFormValues) => {
    return new Promise((resolve, reject) => {
      commitCreate({
        variables: {
          input: {
            name: clientData.name,
            contact_person: clientData.contact_person || null,
            phone: clientData.phone || null,
            email: clientData.email || null,
            address: clientData.address || null
          }
        },
        onCompleted: (response, errors) => {
          if (errors && errors.length > 0) {
            reject(errors);
            return;
          }
          resolve(response.create_client.client);
        },
        onError: reject
      });
    });
  };

  const updateClient = (clientId: string, clientData: ClientFormValues) => {
    return new Promise((resolve, reject) => {
      commitUpdate({
        variables: {
          id: clientId,
          input: {
            name: clientData.name,
            contact_person: clientData.contact_person || null,
            phone: clientData.phone || null,
            email: clientData.email || null,
            address: clientData.address || null
          }
        },
        onCompleted: (response, errors) => {
          if (errors && errors.length > 0) {
            reject(errors);
            return;
          }
          resolve((response as any).update_client.client);
        },
        onError: reject
      });
    });
  };

  const deleteClient = (clientId: string) => {
    return new Promise((resolve, reject) => {
      commitDelete({
        variables: { id: clientId },
        onCompleted: (response, errors) => {
          if (errors && errors.length > 0) {
            reject(errors);
            return;
          }
          resolve((response as any).delete_client.success);
        },
        onError: reject
      });
    });
  };

  return { 
    createClient, 
    updateClient,
    deleteClient,
    isCreating: isCreateInFlight,
    isUpdating: isUpdateInFlight,
    isDeleting: isDeleteInFlight
  };
}