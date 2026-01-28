import type { PropsWithChildren } from 'react';

import cn from 'utils/cn';

type Props = PropsWithChildren<{
  wide?: boolean;
}>;

export const PageWrapper = ({ children, wide }: Props) => (
  <div
    className={cn('m-auto flex flex-col gap-2 p-4', {
      'max-w-3xl': !wide,
      'max-w-7xl': wide,
    })}
  >
    {children}
  </div>
);
