import { memo } from 'react';

const Avatar = ({ src }: { src: string }) => (
  <img
    className="size-5 rounded-xl border-2 border-solid border-stone-700 dark:border-stone-300"
    src={src}
  />
);

export default memo(Avatar);
