import { memo } from 'react';

const Avatar = ({ src }: { src: string }) => (
  <img
    className="h-5 w-5 rounded-xl border-2 border-solid border-stone-700"
    src={src}
  />
);

export default memo(Avatar);
