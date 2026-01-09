import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

export function PrList({ children, title }: Props) {
  return (
    <div className="flex flex-col gap-2 dark:text-catppuccin-text">
      {title}
      <div className="flex flex-col rounded-lg border border-solid shadow-md">
        {children}
      </div>
    </div>
  );
}
