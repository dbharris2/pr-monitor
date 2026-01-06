'use client';

import type { PropsWithChildren } from 'react';
import { memo } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import type { RequestParameters, Variables } from 'relay-runtime';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const fetchQuery = async (params: RequestParameters, variables: Variables) => {
  try {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: params.text, variables }),
    });
    const json = await response.json();
    if (json?.status === '401') {
      throw new Error(json?.message);
    }
    return json;
  } catch (error) {
    console.error('Failed to fetch data from server', error);
    throw error;
  }
};

const RelayContextProvider = ({ children }: PropsWithChildren) => {
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

export default memo(RelayContextProvider);
