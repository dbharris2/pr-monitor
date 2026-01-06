'use client';

import { memo, useState } from 'react';

import Header from 'components/header';
import { PageWrapper } from 'components/page-wrapper';
import { ReviewPage } from 'components/review-page';

type Props = {
  initialHasToken: boolean;
};

const PrMonitor = ({ initialHasToken }: Props) => {
  const [hasToken, setHasToken] = useState(initialHasToken);
  return (
    <PageWrapper>
      <Header hasToken={hasToken} onUpdatedToken={() => setHasToken(true)} />
      <ReviewPage isLoggedIn={hasToken} />
    </PageWrapper>
  );
};

export default memo(PrMonitor);
