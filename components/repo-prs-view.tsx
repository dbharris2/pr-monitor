import React, { memo, Suspense, useCallback, useEffect, useRef } from 'react';
import { useQueryLoader } from 'react-relay';

import type { repoPrListQuery } from 'components/__generated__/repoPrListQuery.graphql';
import RepoPrList, { RepoPrListQuery } from 'components/repo-pr-list';
import { SkeletonList } from 'components/skeleton-list';
import useLocalState from 'utils/use-local-state';

type Props = {
  isLoggedIn: boolean;
};

const RepoPrsViewImpl = ({ isLoggedIn }: Props) => {
  const [repo, setRepo] = useLocalState('pr-monitor-repo', '');

  const openPrQuery = `repo:${repo} is:open is:pr draft:false sort:updated`;
  const mergedPrQuery = `repo:${repo} is:merged is:pr`;

  const repoRef = useRef<HTMLInputElement>(null);

  const [openPrQueryRef, loadOpenPrQuery] =
    useQueryLoader<repoPrListQuery>(RepoPrListQuery);

  const [mergedPrQueryRef, loadMergedPrQuery] =
    useQueryLoader<repoPrListQuery>(RepoPrListQuery);

  const refresh = useCallback(() => {
    if (!isLoggedIn) return;
    loadOpenPrQuery({ query: openPrQuery }, { fetchPolicy: 'network-only' });
    loadMergedPrQuery(
      { query: mergedPrQuery },
      { fetchPolicy: 'network-only' }
    );
  }, [
    isLoggedIn,
    loadMergedPrQuery,
    loadOpenPrQuery,
    mergedPrQuery,
    openPrQuery,
  ]);

  useEffect(() => {
    refresh();
    const timerId = setInterval(() => refresh(), 1000 * 60 * 10);
    return () => clearInterval(timerId);
  }, [refresh]);

  return (
    <>
      <form
        className="flex w-full justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          setRepo(repoRef.current?.value ?? '');
          refresh();
        }}
      >
        <input
          className="flex w-full rounded p-2 dark:bg-catppuccin-surface0 dark:text-catppuccin-text"
          defaultValue={repo}
          placeholder="Insert org/repo here..."
          ref={repoRef}
        />
      </form>
      <Suspense fallback={<SkeletonList titles={['Open PRs', 'Merged PRs']} />}>
        {openPrQueryRef ? (
          <RepoPrList queryRef={openPrQueryRef} title="Open PRs" />
        ) : (
          <SkeletonList titles={['Open PRs']} />
        )}
        {mergedPrQueryRef ? (
          <RepoPrList queryRef={mergedPrQueryRef} title="Merged PRs" />
        ) : (
          <SkeletonList titles={['Merged PRs']} />
        )}
      </Suspense>
    </>
  );
};

export const RepoPrsView = memo(RepoPrsViewImpl);
