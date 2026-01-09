import type { PropsWithChildren } from 'react';

export const PageWrapper = ({ children }: PropsWithChildren) => (
  <div className="m-auto flex max-w-3xl flex-col gap-2 p-4">{children}</div>
);
