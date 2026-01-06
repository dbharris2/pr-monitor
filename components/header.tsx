import { memo, useRef, useState } from 'react';

import { saveToken } from 'app/actions/token';
import { ThemeToggle } from 'components/theme-toggle';

type Props = {
  hasToken: boolean;
  onUpdatedToken: () => void;
};

const Header = ({ hasToken, onUpdatedToken }: Props) => {
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
        className="flex w-full p-2"
        placeholder="Insert GitHub token here..."
        ref={tokenRef}
        type="password"
      />
      <div className="flex gap-2 pl-2">
        <button
          className="cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600"
          type="submit"
        >
          Save
        </button>
        <button
          className="cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600"
          onClick={async () => {
             // If they cancel, we don't necessarily want to delete the token, just close the form?
             // But if they are trying to "Update", maybe they want to clear it?
             // Standard cancel just closes form.
             // But let's add a logout/clear button separate maybe?
             // For now, let's keep cancel as just closing the form.
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

export default memo(Header);
