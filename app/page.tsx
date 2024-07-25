'use client';

import React, { memo, useCallback, useEffect } from 'react';
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
import { mentionedPrListQuery } from 'components/__generated__/mentionedPrListQuery.graphql';
import MentionedPrList, { MentionedPrListQuery } from 'components/mentioned-pr-list';

const PrMonitor = () => {
  const [token, _setToken] = useLocalState('pr-monitor-gh-token', '');

  const [myPrQueryRef, loadMyPrQuery] =
    useQueryLoader<myPrListQuery>(MyPrListQuery);
  const [reviewQueryRef, loadReviewQuery] =
    useQueryLoader<reviewPrListQuery>(ReviewPrListQuery);
  const [reviewedQueryRef, loadReviewedQuery] =
    useQueryLoader<reviewedPrListQuery>(ReviewedPrListQuery);
  const [mentionedQueryRef, loadMentionedQuery] =
    useQueryLoader<mentionedPrListQuery>(MentionedPrListQuery);

  const refresh = useCallback(() => {
    loadMyPrQuery({}, { fetchPolicy: 'network-only' });
    loadReviewQuery({}, { fetchPolicy: 'network-only' });
    loadReviewedQuery({}, { fetchPolicy: 'network-only' });
    loadMentionedQuery({}, { fetchPolicy: 'network-only' });
  }, [loadMyPrQuery, loadReviewQuery, loadReviewedQuery, loadMentionedQuery]);

  useEffect(() => {
    myPrQueryRef == null && token && loadMyPrQuery({});
    reviewQueryRef == null && token && loadReviewQuery({});
    reviewedQueryRef == null && token && loadReviewedQuery({});
    mentionedQueryRef == null && token && loadMentionedQuery({});
  }, [
    token,
    myPrQueryRef,
    loadMyPrQuery,
    reviewQueryRef,
    loadReviewQuery,
    reviewedQueryRef,
    loadReviewedQuery,
    mentionedQueryRef,
    loadMentionedQuery,
  ]);

  useEffect(() => {
    const timerId = setInterval(() => token && refresh(), 1000 * 60 * 10);
    return () => clearInterval(timerId);
  }, [refresh, token]);

  return (
    <div className="m-auto flex  max-w-3xl flex-col gap-2 p-4">
      <Header onUpdatedToken={refresh} />
      {reviewQueryRef && <ReviewPrList queryRef={reviewQueryRef} />}
      {reviewedQueryRef && <ReviewedPrList queryRef={reviewedQueryRef} />}
      {mentionedQueryRef && <MentionedPrList queryRef={mentionedQueryRef} />}
      {myPrQueryRef && <MyPrList queryRef={myPrQueryRef} />}
    </div>
  );
};

export default memo(PrMonitor);
