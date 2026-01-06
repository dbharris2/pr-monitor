import type { PropsWithChildren } from 'react';
import { memo } from 'react';

const PageWrapperImpl = ({ children }: PropsWithChildren) => (
  <div className="m-auto flex max-w-3xl flex-col gap-2 p-4">{children}</div>
);

export const PageWrapper = memo(PageWrapperImpl);
