import React, { memo } from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
};

const PrList = ({ children, title }: Props) => (
  <div className="flex flex-col gap-2 dark:text-catppuccin-text">
    {title}
    <div className="flex flex-col rounded-lg border border-solid shadow-md">
      {children}
    </div>
  </div>
);

export default memo(PrList);
