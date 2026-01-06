'use client';

import { memo } from 'react';

import Header from 'components/header';
import { PageWrapper } from 'components/page-wrapper';
import { ReviewPage } from 'components/review-page';
import useLocalState from 'utils/use-local-state';

const PrMonitor = () => {
  const [token, setToken] = useLocalState('pr-monitor-gh-token', '');
  return (
    <PageWrapper>
      <Header onUpdatedToken={(token) => setToken(token)} />
      <ReviewPage token={token} />
    </PageWrapper>
  );
};

export default memo(PrMonitor);
