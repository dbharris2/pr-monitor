import { useRef, useState } from 'react';

import { saveToken } from 'app/actions/token';
import { ThemeToggle } from 'components/theme-toggle';

type Props = {
  hasToken: boolean;
  onUpdatedToken: () => void;
};

export const Header = ({ hasToken, onUpdatedToken }: Props) => {
  const [isUpdatingToken, setIsUpdatingToken] = useState(!hasToken);
  return (
    <div className="flex items-center justify-between rounded-lg border border-solid bg-white p-2 dark:bg-catppuccin-surface0 dark:text-catppuccin-text">
      {!isUpdatingToken && (
        <DefaultHeader onClickUpdateToken={() => setIsUpdatingToken(true)} />
      )}
      {isUpdatingToken && (
        <UpdateTokenHeader
          onClickCancel={() => setIsUpdatingToken(false)}
          onUpdatedToken={() => {
            setIsUpdatingToken(false);
            onUpdatedToken();
          }}
        />
      )}
    </div>
  );
};

type DefaultHeaderProps = {
  onClickUpdateToken: () => void;
};

const DefaultHeader = ({ onClickUpdateToken }: DefaultHeaderProps) => (
  <>
    PR Monitor
    <div className="flex gap-4">
      <ThemeToggle />
      <button
        className="cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600 dark:bg-catppuccin-surface1 dark:text-catppuccin-text"
        onClick={onClickUpdateToken}
        type="button"
      >
        Update Token
      </button>
    </div>
  </>
);

type UpdateTokenHeaderProps = {
  onClickCancel: () => void;
  onUpdatedToken: () => void;
};

const UpdateTokenHeader = ({
  onClickCancel,
  onUpdatedToken,
}: UpdateTokenHeaderProps) => {
  const tokenRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="flex w-full justify-between"
      onSubmit={async (e) => {
        e.preventDefault();
        const rawToken = tokenRef.current?.value ?? '';
        await saveToken(rawToken);
        onUpdatedToken();
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
        <button
          className="cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600 dark:bg-catppuccin-surface1 dark:text-catppuccin-text"
          onClick={async () => {
            onClickCancel();
          }}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
