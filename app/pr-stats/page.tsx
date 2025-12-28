'use client';

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useTransition,
} from 'react';
import { useQueryLoader } from 'react-relay';

import type { prTableQuery } from 'components/__generated__/prTableQuery.graphql';
import Header from 'components/header';
import PrTable, { PrTableQuery } from 'components/pr-table';
import useLocalState from 'utils/use-local-state';

const PrMonitor = () => {
  const [token, _setToken] = useLocalState('pr-monitor-gh-token', '');
  const [query, setQuery] = useLocalState('pr-monitor-search-query', '');

  const searchQueryRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const [queryRef, loadQuery] = useQueryLoader<prTableQuery>(PrTableQuery);

  const refresh = useCallback(() => {
    startTransition(() => {
      loadQuery({ query }, { fetchPolicy: 'network-only' });
    });
  }, [loadQuery, query]);

  useEffect(() => {
    if (token && queryRef == null) {
      startTransition(() => {
        loadQuery({ query });
      });
    }
  }, [token, queryRef, loadQuery, query]);

  return (
    <div className="m-auto flex  max-w-3xl flex-col gap-2 p-4">
      <Header onUpdatedToken={refresh} />
      <form
        className="flex w-full justify-between gap-2"
        onSubmit={() => {
          console.log('on submit');
          setQuery(searchQueryRef.current?.value ?? '');
          refresh();
        }}
      >
        <input
          className="flex w-full p-2"
          defaultValue={query}
          placeholder="Insert GitHub search query here..."
          ref={searchQueryRef}
        />
      </form>
      {isPending && 'Loading...'}
      {queryRef && <PrTable queryRef={queryRef} />}
    </div>
  );
};

export default memo(PrMonitor);
