// apps/web/src/relay/RelayEnvironment.ts
import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction
} from 'relay-runtime';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/graphql';

const fetchFunction: FetchFunction = async (request, variables) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: request.text,
        variables,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching from GraphQL:', error);
    return { data: null, errors: [{ message: 'Network error' }] };
  }
};

let relayEnvironment: Environment;

export function getEnvironment() {
  if (typeof window === 'undefined') {
    return new Environment({
      network: Network.create(fetchFunction),
      store: new Store(new RecordSource()),
    });
  }

  if (!relayEnvironment) {
    relayEnvironment = new Environment({
      network: Network.create(fetchFunction),
      store: new Store(new RecordSource()),
    });
  }

  return relayEnvironment;
}