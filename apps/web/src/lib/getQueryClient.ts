// apps/web/src/lib/getQueryClient.ts
import { getEnvironment } from '../relay/RelayEnvironment';
import { fetchQuery, graphql } from 'relay-runtime';

export async function getQueryClient(query: any, variables: Record<string, any> = {}) {
  const environment = getEnvironment();
  try {
    return await fetchQuery(environment, query, variables).toPromise();
  } catch (error) {
    console.error('Error fetching query:', error);
    throw error;
  }
}