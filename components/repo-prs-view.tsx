import React, { memo, Suspense, useCallback, useEffect, useRef } from 'react';
import { useQueryLoader } from 'react-relay';

import type { repoPrListQuery } from 'components/__generated__/repoPrListQuery.graphql';
import { Pill } from 'components/pill';
import RepoPrList, { RepoPrListQuery } from 'components/repo-pr-list';
import { SkeletonList } from 'components/skeleton-list';
import useLocalState from 'utils/use-local-state';

const MAX_RECENT_REPOS = 5;

type Props = {
  isLoggedIn: boolean;
};

const RepoPrsViewImpl = ({ isLoggedIn }: Props) => {
  const [repo, setRepo] = useLocalState('pr-monitor-repo', '');
  const [recentRepos, setRecentRepos] = useLocalState<string[]>(
    'pr-monitor-recent-repos',
    []
  );

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

  const addToRecentRepos = useCallback(
    (newRepo: string) => {
      if (!newRepo.trim()) return;
      const filtered = recentRepos.filter((r) => r !== newRepo);
      const updated = [newRepo, ...filtered].slice(0, MAX_RECENT_REPOS);
      setRecentRepos(updated);
    },
    [recentRepos, setRecentRepos]
  );

  const removeFromRecentRepos = useCallback(
    (repoToRemove: string) => {
      setRecentRepos(recentRepos.filter((r) => r !== repoToRemove));
    },
    [recentRepos, setRecentRepos]
  );

  const selectRepo = useCallback(
    (selectedRepo: string) => {
      if (repoRef.current) {
        repoRef.current.value = selectedRepo;
      }
      setRepo(selectedRepo);
    },
    [setRepo]
  );

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
          const newRepo = repoRef.current?.value ?? '';
          setRepo(newRepo);
          addToRecentRepos(newRepo);
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
      {recentRepos.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {recentRepos.map((recentRepo) => (
            <Pill
              key={recentRepo}
              label={recentRepo}
              onRemove={() => removeFromRecentRepos(recentRepo)}
              onSelect={() => selectRepo(recentRepo)}
              selected={recentRepo === repo}
            />
          ))}
        </div>
      )}
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
