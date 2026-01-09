type Props = {
  disabled: boolean;
  onClick: () => void;
};

export function LoadMoreButton({ onClick, disabled }: Props) {
  return (
    <div className="w-full rounded-b-lg bg-white p-3 dark:bg-catppuccin-surface0">
      <button
        className="m-auto flex cursor-pointer items-center rounded-lg border-none bg-slate-200 p-2 outline-none hover:bg-slate-400 active:bg-slate-600 disabled:bg-slate-600 dark:bg-catppuccin-surface1 dark:text-catppuccin-text"
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        Load more
      </button>
    </div>
  );
}
