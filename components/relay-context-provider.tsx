'use client';

import type { ReactNode } from 'react';
import { memo } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import type { RequestParameters, Variables } from 'relay-runtime';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import getToken from 'utils/get-token';

const fetchQuery = async (params: RequestParameters, variables: Variables) => {
  try {
    const token = getToken();
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to fetch data from server', error);
  }
};

const RelayContextProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
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
