import { XCircleIcon } from '@primer/octicons-react';

type PillProps = {
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
};

export const Pill = ({
  label,
  selected = false,
  onSelect,
  onRemove,
}: PillProps) => (
  <button
    className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm text-black hover:bg-slate-300 dark:text-catppuccin-text dark:hover:bg-catppuccin-surface2 ${
      selected
        ? 'bg-slate-300 ring-2 ring-blue-500 dark:bg-catppuccin-surface2 dark:ring-catppuccin-blue'
        : 'bg-slate-200 dark:bg-catppuccin-surface1'
    }`}
    onClick={onSelect}
    type="button"
  >
    <span>{label}</span>
    {onRemove && (
      <span
        className="ml-1 text-slate-500 hover:text-red-500 dark:text-catppuccin-overlay0 dark:hover:text-catppuccin-red"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
            onRemove();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <XCircleIcon size={14} />
      </span>
    )}
  </button>
);
