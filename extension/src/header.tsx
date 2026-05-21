import { useRef, useState } from 'react';

import { ThemeToggle } from 'components/theme-toggle';
import { saveToken } from 'extension/src/token-storage';

type Props = {
  hasToken: boolean;
  onTokenSaved: (token: string) => void;
};

export const Header = ({ hasToken, onTokenSaved }: Props) => {
  const [editing, setEditing] = useState(!hasToken);

  return (
    <div className="flex items-center justify-between rounded-lg border border-solid bg-white p-2 dark:bg-catppuccin-surface0 dark:text-catppuccin-text">
      {editing ? (
        <EditTokenForm
          allowCancel={hasToken}
          onCancel={() => setEditing(false)}
          onSaved={(token) => {
            setEditing(false);
            onTokenSaved(token);
          }}
        />
      ) : (
        <DefaultHeader onUpdateClick={() => setEditing(true)} />
      )}
    </div>
  );
};

const DefaultHeader = ({ onUpdateClick }: { onUpdateClick: () => void }) => (
  <>
    PR Monitor
    <div className="flex gap-4">
      <ThemeToggle />
      <button
        className="cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600 dark:bg-catppuccin-surface1 dark:text-catppuccin-text"
        onClick={onUpdateClick}
        type="button"
      >
        Update Token
      </button>
    </div>
  </>
);

type EditTokenFormProps = {
  allowCancel: boolean;
  onCancel: () => void;
  onSaved: (token: string) => void;
};

const EditTokenForm = ({ allowCancel, onCancel, onSaved }: EditTokenFormProps) => {
  const tokenRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="flex w-full justify-between"
      onSubmit={async (e) => {
        e.preventDefault();
        const raw = tokenRef.current?.value ?? '';
        if (!raw) return;
        await saveToken(raw);
        onSaved(raw);
      }}
    >
      <input
        className="flex w-full p-2 placeholder:text-slate-500 dark:bg-catppuccin-surface1 dark:text-catppuccin-text dark:placeholder:text-catppuccin-subtext0"
        placeholder="Insert GitHub token here..."
        ref={tokenRef}
        type="password"
      />
      <div className="flex gap-2 pl-2">
        <button
          className="cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600 dark:bg-catppuccin-surface1 dark:text-catppuccin-text"
          type="submit"
        >
          Save
        </button>
        {allowCancel && (
          <button
            className="cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600 dark:bg-catppuccin-surface1 dark:text-catppuccin-text"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
