'use client';

import type { ReactNode } from 'react';

import { RowsIcon, StackIcon } from '@primer/octicons-react';
import {
  type DisplayMode,
  useDisplayMode,
} from 'components/display-mode-context';
import cn from 'utils/cn';

type IconButtonProps = {
  icon: ReactNode;
  mode: DisplayMode;
  onClick: () => void;
  selected: boolean;
  title: string;
};

const IconButton = ({ icon, onClick, selected, title }: IconButtonProps) => (
  <button
    className={cn(
      'dark:text-catppuccin-text dark:hover:bg-catppuccin-surface1 cursor-pointer rounded-md border-none p-1.5 transition-colors outline-none hover:bg-slate-100',
      {
        'dark:bg-catppuccin-surface1 bg-slate-200': selected,
        'bg-transparent': !selected,
      }
    )}
    onClick={onClick}
    title={title}
    type="button"
  >
    {icon}
  </button>
);

export const DisplayModeToggle = () => {
  const { displayMode, setDisplayMode } = useDisplayMode();

  return (
    <div className="dark:bg-catppuccin-surface0 flex gap-1 rounded-lg bg-white p-1">
      <IconButton
        icon={<StackIcon size={16} />}
        mode="standard"
        onClick={() => setDisplayMode('standard')}
        selected={displayMode === 'standard'}
        title="Standard view"
      />
      <IconButton
        icon={<RowsIcon size={16} />}
        mode="compact"
        onClick={() => setDisplayMode('compact')}
        selected={displayMode === 'compact'}
        title="Compact view"
      />
    </div>
  );
};
