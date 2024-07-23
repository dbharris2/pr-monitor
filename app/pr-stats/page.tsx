'use client';

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useTransition,
} from 'react';
import { useQueryLoader } from 'react-relay';

import type { orgPrTableQuery } from 'components/__generated__/orgPrTableQuery.graphql';
import Header from 'components/header';
import OrgPrTable, { OrgPrTableQuery } from 'components/org-pr-table';
import useLocalState from 'utils/use-local-state';

const PrMonitor = () => {
  const [token, _setToken] = useLocalState('pr-monitor-gh-token', '');
  const [org, setOrg] = useLocalState('pr-monitor-org', '');
  const [startDate, setStartDate] = useLocalState(
    'pr-monitor-start-date',
    '2024-06-23'
  );
  const [endDate, setEndDate] = useLocalState(
    'pr-monitor-end-date',
    '2024-06-30'
  );

  const orgPrQuery = `org:${org} is:pr is:merged merged:${startDate}..${endDate} sort:updated`;

  const orgRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const [queryRef, loadQuery] =
    useQueryLoader<orgPrTableQuery>(OrgPrTableQuery);

  const refresh = useCallback(() => {
    startTransition(() => {
      loadQuery({ query: orgPrQuery }, { fetchPolicy: 'network-only' });
    });
  }, [loadQuery, orgPrQuery]);

  useEffect(() => {
    queryRef == null &&
      token &&
      startTransition(() => {
        loadQuery({ query: orgPrQuery });
      });
  }, [token, queryRef, loadQuery, orgPrQuery]);

  return (
    <div className="m-auto flex  max-w-3xl flex-col gap-2 p-4">
      <Header onUpdatedToken={refresh} />
      <form
        className="flex w-full justify-between gap-2"
        onSubmit={() => {
          console.log('on submit');
          setOrg(orgRef.current?.value ?? '');
          setStartDate(startDateRef.current?.value ?? '');
          setEndDate(endDateRef.current?.value ?? '');
          refresh();
        }}
      >
        <input
          className="flex w-full p-2"
          defaultValue={org}
          placeholder="Insert org here..."
          ref={orgRef}
        />
        <input
          className="flex w-full p-2"
          defaultValue={startDate}
          placeholder="Insert start date (YYYY-MM-DD)..."
          ref={startDateRef}
        />
        <input
          className="flex w-full p-2"
          defaultValue={endDate}
          placeholder="Insert end date (YYYY-MM-DD)..."
          ref={endDateRef}
        />
        <button
          className="cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600"
          type="submit"
        >
          Submit
        </button>
      </form>
      {isPending && 'Loading...'}
      {queryRef && <OrgPrTable queryRef={queryRef} />}
    </div>
  );
};

export default memo(PrMonitor);
