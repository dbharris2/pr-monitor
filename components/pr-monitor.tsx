'use client';

import { useState } from 'react';

import { Header } from 'components/header';
import { PageWrapper } from 'components/page-wrapper';
import { RepoPrsView } from 'components/repo-prs-view';
import { ReviewPage } from 'components/review-page';
import cn from 'utils/cn';
import useLocalState from 'utils/use-local-state';

type Props = {
  initialHasToken: boolean;
};

export const PrMonitor = ({ initialHasToken }: Props) => {
  const [hasToken, setHasToken] = useState(initialHasToken);
  const [view, setView] = useLocalState<'my-prs' | 'repo-prs'>(
    'pr-monitor-view',
    'my-prs'
  );

  return (
    <PageWrapper>
      <Header hasToken={hasToken} onUpdatedToken={() => setHasToken(true)} />
      <div className="flex w-full gap-1 rounded-lg bg-white p-1 dark:bg-catppuccin-surface0">
        <ToggleButton
          selected={view === 'my-prs'}
          setView={setView}
          title="My PRs"
          view="my-prs"
        />
        <ToggleButton
          selected={view === 'repo-prs'}
          setView={setView}
          title="Repo PRs"
          view="repo-prs"
        />
      </div>
      {view === 'my-prs' ? (
        <ReviewPage isLoggedIn={hasToken} />
      ) : (
        <RepoPrsView isLoggedIn={hasToken} />
      )}
    </PageWrapper>
  );
};

const ToggleButton = ({
  selected,
  setView,
  title,
  view,
}: {
  selected?: boolean;
  setView: (view: 'my-prs' | 'repo-prs') => void;
  title: string;
  view: 'my-prs' | 'repo-prs';
}) => (
  <button
    className={cn(
      'flex-1 cursor-pointer rounded-md border-none py-1 font-semibold outline-none transition-colors hover:bg-slate-100 dark:text-catppuccin-text dark:hover:bg-catppuccin-surface1',
      {
        'bg-slate-200 dark:bg-catppuccin-surface1': selected,
        'bg-transparent': !selected,
      }
    )}
    onClick={() => setView(view)}
    type="button"
  >
    {title}
  </button>
);
