'use client';

import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from 'relay-runtime';

// URL GraphQL API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/graphql';

// Функция fetchFunction для выполнения запросов
const fetchFunction: FetchFunction = async (request, variables) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: request.text,
        variables,
      }),
    });
  
    return await response.json();
  } catch (error) {
    console.error('Ошибка GraphQL запроса:', error);
    return { data: null, errors: [{ message: 'Ошибка сети' }] };
  }
};

// Создаем и экспортируем экземпляр Environment
const environment = new Environment({
  network: Network.create(fetchFunction),
  store: new Store(new RecordSource()),
});

export default environment;