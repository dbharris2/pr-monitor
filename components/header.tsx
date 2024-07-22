import { memo, useRef, useState } from 'react';

import useLocalState from 'utils/use-local-state';

type Props = {
  isPending: boolean;
  onUpdatedToken: () => void;
};

const Header = ({ isPending, onUpdatedToken }: Props) => {
  const [isUpdatingToken, setIsUpdatingToken] = useState(false);
  return (
    <div className="flex items-center justify-between rounded-lg border border-solid bg-white p-2">
      {!isUpdatingToken && (
        <DefaultHeader
          isPending={isPending}
          onClickUpdateToken={() => setIsUpdatingToken(true)}
        />
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
  isPending: boolean;
  onClickUpdateToken: () => void;
};

const DefaultHeader = ({
  isPending,
  onClickUpdateToken,
}: DefaultHeaderProps) => (
  <>
    {isPending ? 'Refreshing...' : 'Pr Monitor'}
    <div className="flex gap-2">
      <button
        className="cursor-pointer items-center rounded-lg border-none bg-slate-200 p-1 outline-none hover:bg-slate-400 active:bg-slate-600"
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
  const [_token, setToken] = useLocalState<string>('pr-monitor-gh-token', '');
  const tokenRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="flex w-full justify-between"
      onSubmit={() => {
        setToken(tokenRef.current?.value ?? '');
        onUpdatedToken();
      }}
    >
      <input
        className="flex w-full p-2"
        placeholder="Insert GitHub token here..."
        ref={tokenRef}
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
          onClick={onClickCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default memo(Header);
