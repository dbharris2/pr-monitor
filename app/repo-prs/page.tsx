'use client';

import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useQueryLoader } from 'react-relay';

import type { repoPrListQuery } from 'components/__generated__/repoPrListQuery.graphql';
import Header from 'components/header';
import RepoPrList, { RepoPrListQuery } from 'components/repo-pr-list';
import useLocalState from 'utils/use-local-state';

const PrMonitor = () => {
  const [token, _setToken] = useLocalState('pr-monitor-gh-token', '');
  const [repo, setRepo] = useLocalState('pr-monitor-repo', '');

  const openPrQuery = `repo:${repo} is:open is:pr draft:false sort:updated`;
  const mergedPrQuery = `repo:${repo} is:merged is:pr`;

  const repoRef = useRef<HTMLInputElement>(null);

  const [openPrQueryRef, loadOpenPrQuery] =
    useQueryLoader<repoPrListQuery>(RepoPrListQuery);

  const [mergedPrQueryRef, loadMergedPrQuery] =
    useQueryLoader<repoPrListQuery>(RepoPrListQuery);

  const refresh = useCallback(() => {
    loadOpenPrQuery({ query: openPrQuery }, { fetchPolicy: 'network-only' });
    loadMergedPrQuery(
      { query: mergedPrQuery },
      { fetchPolicy: 'network-only' }
    );
  }, [loadMergedPrQuery, loadOpenPrQuery, mergedPrQuery, openPrQuery]);

  useEffect(() => {
    if (token) {
      if (openPrQueryRef == null) {
        loadOpenPrQuery({ query: openPrQuery });
      }
      if (mergedPrQueryRef == null) {
        loadMergedPrQuery({ query: mergedPrQuery });
      }
    }
  }, [
    token,
    openPrQuery,
    openPrQueryRef,
    loadOpenPrQuery,
    loadMergedPrQuery,
    mergedPrQuery,
    mergedPrQueryRef,
  ]);

  useEffect(() => {
    const timerId = setInterval(() => token && refresh(), 1000 * 60 * 10);
    return () => clearInterval(timerId);
  }, [refresh, token]);

  return (
    <div className="m-auto flex  max-w-3xl flex-col gap-2 p-4">
      <Header onUpdatedToken={refresh} />
      <form
        className="flex w-full justify-between"
        onSubmit={() => {
          setRepo(repoRef.current?.value ?? '');
          refresh();
        }}
      >
        <input
          className="flex w-full rounded p-2 dark:bg-sky-950 dark:text-blue-200"
          defaultValue={repo}
          placeholder="Insert org/repo here..."
          ref={repoRef}
        />
      </form>
      {openPrQueryRef && (
        <RepoPrList queryRef={openPrQueryRef} title="Open PRs" />
      )}
      {mergedPrQueryRef && (
        <RepoPrList queryRef={mergedPrQueryRef} title="Merged PRs" />
      )}
    </div>
  );
};

export default memo(PrMonitor);
