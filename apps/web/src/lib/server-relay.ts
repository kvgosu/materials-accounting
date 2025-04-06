// Это файл для серверных компонентов Next.js, которым может понадобиться выполнять запросы к GraphQL
// Поскольку на сервере нельзя использовать React контексты, мы создаем отдельную функцию

import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

// URL GraphQL API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/graphql';

/**
 * Создает новое окружение Relay для серверных компонентов
 */
export function createServerEnvironment() {
  return new Environment({
    network: Network.create(async (request, variables) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: request.text,
          variables,
        }),
      });

      return await response.json();
    }),
    store: new Store(new RecordSource()),
  });
}

/**
 * Выполняет GraphQL запрос на сервере
 */
export async function fetchQuery(query: string, variables = {}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: 'no-store',
  });

  return await response.json();
}