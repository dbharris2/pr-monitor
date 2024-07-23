'use client';

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useTransition,
} from 'react';
import { useQueryLoader } from 'react-relay';

import type { repoPrListQuery } from 'components/__generated__/repoPrListQuery.graphql';
import Header from 'components/header';
import RepoPrList, { RepoPrListQuery } from 'components/repo-pr-list';
import useLocalState from 'utils/use-local-state';

const PrMonitor = () => {
  const [token, _setToken] = useLocalState('pr-monitor-gh-token', '');
  const [repo, setRepo] = useLocalState('pr-monitor-repo', '');
  const query = `repo:${repo} is:open is:pr draft:false sort:updated`;
  const repoRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const [queryRef, loadQuery] =
    useQueryLoader<repoPrListQuery>(RepoPrListQuery);

  const refresh = useCallback(() => {
    startTransition(() => {
      loadQuery({ query }, { fetchPolicy: 'network-only' });
    });
  }, [loadQuery, query]);

  useEffect(() => {
    queryRef == null && token && loadQuery({ query });
  }, [token, queryRef, loadQuery, query]);

  useEffect(() => {
    const timerId = setInterval(() => token && refresh(), 1000 * 60 * 10);
    return () => clearInterval(timerId);
  }, [refresh, token]);

  return (
    <div className="m-auto flex  max-w-3xl flex-col gap-2 p-4">
      <Header isPending={isPending} onUpdatedToken={refresh} />
      <form
        className="flex w-full justify-between"
        onSubmit={() => {
          setRepo(repoRef.current?.value ?? '');
          refresh();
        }}
      >
        <input
          className="flex w-full p-2"
          defaultValue={repo}
          placeholder="Insert org/repo here..."
          ref={repoRef}
        />
      </form>
      {queryRef && <RepoPrList queryRef={queryRef} />}
    </div>
  );
};

export default memo(PrMonitor);
