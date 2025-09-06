import React, { memo } from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
};

const PrList = ({ children, title }: Props) => (
  <div className="flex flex-col gap-2 dark:text-blue-200">
    {title}
    <div className="min-h-3 rounded-lg border border-solid">{children}</div>
  </div>
);

export default memo(PrList);
