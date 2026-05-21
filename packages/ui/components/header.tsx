import { useRef, useState } from 'react';

import { ThemeToggle } from 'components/theme-toggle';

type Props = {
  hasToken: boolean;
  saveToken: (token: string) => Promise<void>;
  onUpdatedToken?: () => void;
};

export const Header = ({ hasToken, saveToken, onUpdatedToken }: Props) => {
  const [isUpdatingToken, setIsUpdatingToken] = useState(!hasToken);
  return (
    <div className="dark:bg-catppuccin-surface0 dark:text-catppuccin-text flex items-center justify-between rounded-lg border border-solid bg-white p-2">
      {!isUpdatingToken && (
        <DefaultHeader onClickUpdateToken={() => setIsUpdatingToken(true)} />
      )}
      {isUpdatingToken && (
        <UpdateTokenHeader
          onClickCancel={() => setIsUpdatingToken(false)}
          onUpdatedToken={() => {
            setIsUpdatingToken(false);
            onUpdatedToken?.();
          }}
          saveToken={saveToken}
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
        className="dark:bg-catppuccin-surface1 dark:text-catppuccin-text cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600"
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
  saveToken: (token: string) => Promise<void>;
};

const UpdateTokenHeader = ({
  onClickCancel,
  onUpdatedToken,
  saveToken,
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
        className="dark:bg-catppuccin-surface1 dark:text-catppuccin-text dark:placeholder:text-catppuccin-subtext0 flex w-full p-2 placeholder:text-slate-500"
        placeholder="Insert GitHub token here..."
        ref={tokenRef}
        type="password"
      />
      <div className="flex gap-2 pl-2">
        <button
          className="dark:bg-catppuccin-surface1 dark:text-catppuccin-text cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600"
          type="submit"
        >
          Save
        </button>
        <button
          className="dark:bg-catppuccin-surface1 dark:text-catppuccin-text cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600"
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
