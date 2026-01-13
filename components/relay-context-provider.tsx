'use client';

import type { PropsWithChildren } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import type { RequestParameters, Variables } from 'relay-runtime';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const fetchQuery = (params: RequestParameters, variables: Variables) =>
  fetch('/api/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: params.text, variables }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json?.status === '401') {
        throw new Error(json?.message);
      }
      return json;
    })
    .catch((error) => {
      // For network errors (e.g., tab was backgrounded, connection lost),
      // return a promise that never resolves. This prevents Relay from
      // updating the store, preserving existing cached data. The next
      // poll will retry.
      if (
        error instanceof TypeError &&
        error.message.includes('Failed to fetch')
      ) {
        console.warn('Network request failed, keeping existing data');
        return new Promise(() => {});
      }
      console.error('Failed to fetch data from server', error);
      throw error;
    });

export const RelayContextProvider = ({ children }: PropsWithChildren) => {
  const env = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
  return (
    <RelayEnvironmentProvider environment={env}>
      {children}
    </RelayEnvironmentProvider>
  );
};
