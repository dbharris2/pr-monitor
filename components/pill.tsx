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
    className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm text-catppuccin-text hover:bg-catppuccin-surface2 ${
      selected
        ? 'bg-catppuccin-surface2 ring-2 ring-catppuccin-blue'
        : 'bg-catppuccin-surface1'
    }`}
    onClick={onSelect}
    type="button"
  >
    <span>{label}</span>
    {onRemove && (
      <span
        className="ml-1 text-catppuccin-overlay0 hover:text-catppuccin-red"
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
