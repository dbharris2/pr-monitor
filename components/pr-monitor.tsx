'use client';

import { useState } from 'react';

import { RowsIcon, StackIcon } from '@primer/octicons-react';
import {
  DisplayModeProvider,
  useDisplayMode,
} from 'components/display-mode-context';
import { Header } from 'components/header';
import { PageWrapper } from 'components/page-wrapper';
import { RepoPrsView } from 'components/repo-prs-view';
import { ReviewPage } from 'components/review-page';
import cn from 'utils/cn';
import useLocalState from 'utils/use-local-state';

type Props = {
  initialHasToken: boolean;
};

type View = 'me' | 'repository' | 'both';

export const PrMonitor = ({ initialHasToken }: Props) => (
  <DisplayModeProvider>
    <PrMonitorContent initialHasToken={initialHasToken} />
  </DisplayModeProvider>
);

const PrMonitorContent = ({ initialHasToken }: Props) => {
  const [hasToken, setHasToken] = useState(initialHasToken);
  const [view, setView] = useLocalState<View>('pr-monitor-view', 'me');
  const { displayMode, setDisplayMode } = useDisplayMode();

  const isBoth = view === 'both';

  return (
    <PageWrapper wide={isBoth}>
      <Header hasToken={hasToken} onUpdatedToken={() => setHasToken(true)} />
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1 rounded-lg bg-white p-1 dark:bg-catppuccin-surface0">
          <ToggleButton
            onClick={() => setView('me')}
            selected={view === 'me'}
            title="Me"
          />
          <ToggleButton
            onClick={() => setView('repository')}
            selected={view === 'repository'}
            title="Repository"
          />
          <ToggleButton
            onClick={() => setView('both')}
            selected={view === 'both'}
            title="Both"
          />
        </div>
        <div className="flex gap-1 rounded-lg bg-white p-1 dark:bg-catppuccin-surface0">
          <button
            className={cn(
              'cursor-pointer rounded-md border-none p-1.5 outline-none transition-colors hover:bg-slate-100 dark:text-catppuccin-text dark:hover:bg-catppuccin-surface1',
              {
                'bg-slate-200 dark:bg-catppuccin-surface1':
                  displayMode === 'standard',
                'bg-transparent': displayMode !== 'standard',
              }
            )}
            onClick={() => setDisplayMode('standard')}
            title="Standard view"
            type="button"
          >
            <StackIcon size={16} />
          </button>
          <button
            className={cn(
              'cursor-pointer rounded-md border-none p-1.5 outline-none transition-colors hover:bg-slate-100 dark:text-catppuccin-text dark:hover:bg-catppuccin-surface1',
              {
                'bg-slate-200 dark:bg-catppuccin-surface1':
                  displayMode === 'compact',
                'bg-transparent': displayMode !== 'compact',
              }
            )}
            onClick={() => setDisplayMode('compact')}
            title="Compact view"
            type="button"
          >
            <RowsIcon size={16} />
          </button>
        </div>
      </div>
      {isBoth ? (
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="min-w-0 flex-1">
            <ReviewPage isLoggedIn={hasToken} />
          </div>
          <div className="min-w-0 flex-1">
            <RepoPrsView isLoggedIn={hasToken} />
          </div>
        </div>
      ) : view === 'me' ? (
        <ReviewPage isLoggedIn={hasToken} />
      ) : (
        <RepoPrsView isLoggedIn={hasToken} />
      )}
    </PageWrapper>
  );
};

const ToggleButton = ({
  selected,
  onClick,
  title,
}: {
  selected?: boolean;
  onClick: () => void;
  title: string;
}) => (
  <button
    className={cn(
      'flex-1 cursor-pointer rounded-md border-none py-1 font-semibold outline-none transition-colors hover:bg-slate-100 dark:text-catppuccin-text dark:hover:bg-catppuccin-surface1',
      {
        'bg-slate-200 dark:bg-catppuccin-surface1': selected,
        'bg-transparent': !selected,
      }
    )}
    onClick={onClick}
    type="button"
  >
    {title}
  </button>
);
