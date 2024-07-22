import { memo } from 'react';

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const LoadMoreButton = ({ disabled, onClick }: Props) => (
  <div className="w-full rounded-b-lg bg-white p-3">
    <button
      className="m-auto flex cursor-pointer items-center rounded-lg border-none bg-slate-200 p-2 outline-none hover:bg-slate-400 active:bg-slate-600 disabled:bg-slate-600"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      Load more
    </button>
  </div>
);

export default memo(LoadMoreButton);
