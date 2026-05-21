import type { RequestParameters, Variables } from 'relay-runtime';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const createFetchQuery = (token: string | null) =>
  async (params: RequestParameters, variables: Variables) => {
    if (!token) {
      throw new Error('Missing token');
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: params.text, variables }),
    });

    if (response.status === 401) {
      throw new Error('Unauthorized');
    }

    return response.json();
  };

export const createRelayEnvironment = (token: string | null) =>
  new Environment({
    network: Network.create(createFetchQuery(token)),
    store: new Store(new RecordSource()),
  });
