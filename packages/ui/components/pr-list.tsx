import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

export const PrList = ({ children, title }: Props) => (
  <div className="dark:text-catppuccin-text flex flex-col gap-2">
    {title}
    <div className="flex flex-col rounded-lg border border-solid shadow-md">
      {children}
    </div>
  </div>
);
