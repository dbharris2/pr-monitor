'use client';

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useQueryLoader } from 'react-relay';

import type { prTableQuery } from 'components/__generated__/prTableQuery.graphql';
import Header from 'components/header';
import PrTable, { PrTableQuery } from 'components/pr-table';
import useLocalState from 'utils/use-local-state';

type Props = {
  initialHasToken: boolean;
};

const PrStatsPage = ({ initialHasToken }: Props) => {
  const [hasToken, setHasToken] = useState(initialHasToken);
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
    if (hasToken && queryRef == null) {
      startTransition(() => {
        loadQuery({ query });
      });
    }
  }, [hasToken, queryRef, loadQuery, query]);

  return (
    <div className="m-auto flex  max-w-3xl flex-col gap-2 p-4">
      <Header
        hasToken={hasToken}
        onUpdatedToken={() => {
          setHasToken(true);
          refresh();
        }}
      />
      <form
        className="flex w-full justify-between gap-2"
        onSubmit={() => {
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

export default memo(PrStatsPage);
