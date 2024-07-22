import React, { memo } from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
};

const PrList = ({ children, title }: Props) => (
  <div className="flex flex-col gap-2">
    {title}
    <div className="rounded-lg border border-solid min-h-3">{children}</div>
  </div>
);

export default memo(PrList);
