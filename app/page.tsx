'use client';

import React, { memo, useCallback, useEffect, useTransition } from 'react';
import { useQueryLoader } from 'react-relay';

import type { myPrListQuery } from 'components/__generated__/myPrListQuery.graphql';
import type { reviewedPrListQuery } from 'components/__generated__/reviewedPrListQuery.graphql';
import type { reviewPrListQuery } from 'components/__generated__/reviewPrListQuery.graphql';
import Header from 'components/header';
import MyPrList, { MyPrListQuery } from 'components/my-pr-list';
import ReviewPrList, { ReviewPrListQuery } from 'components/review-pr-list';
import ReviewedPrList, {
  ReviewedPrListQuery,
} from 'components/reviewed-pr-list';
import useLocalState from 'utils/use-local-state';

const PrMonitor = () => {
  const [token, _setToken] = useLocalState('pr-monitor-gh-token', '');
  const [isPending, startTransition] = useTransition();

  const [myPrQueryRef, loadMyPrQuery] =
    useQueryLoader<myPrListQuery>(MyPrListQuery);
  const [reviewQueryRef, loadReviewQuery] =
    useQueryLoader<reviewPrListQuery>(ReviewPrListQuery);
  const [reviewedQueryRef, loadReviewedQuery] =
    useQueryLoader<reviewedPrListQuery>(ReviewedPrListQuery);

  const refresh = useCallback(() => {
    startTransition(() => {
      loadMyPrQuery({}, { fetchPolicy: 'network-only' });
      loadReviewQuery({}, { fetchPolicy: 'network-only' });
      loadReviewedQuery({}, { fetchPolicy: 'network-only' });
    });
  }, [loadMyPrQuery, loadReviewQuery, loadReviewedQuery]);

  useEffect(() => {
    myPrQueryRef == null && token && loadMyPrQuery({});
    reviewQueryRef == null && token && loadReviewQuery({});
    reviewedQueryRef == null && token && loadReviewedQuery({});
  }, [
    token,
    myPrQueryRef,
    loadMyPrQuery,
    reviewQueryRef,
    loadReviewQuery,
    reviewedQueryRef,
    loadReviewedQuery,
  ]);

  useEffect(() => {
    const timerId = setInterval(() => token && refresh(), 1000 * 60 * 10);
    return () => clearInterval(timerId);
  }, [refresh, token]);

  return (
    <div className="flex flex-col gap-2 p-4 max-w-3xl m-auto">
      <Header isPending={isPending} onClickRefresh={refresh} />
      {reviewQueryRef && <ReviewPrList queryRef={reviewQueryRef} />}
      {reviewedQueryRef && <ReviewedPrList queryRef={reviewedQueryRef} />}
      {myPrQueryRef && <MyPrList queryRef={myPrQueryRef} />}
    </div>
  );
};

export default memo(PrMonitor);
