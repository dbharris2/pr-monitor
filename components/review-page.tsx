'use client';

import React, { memo, useCallback, useEffect } from 'react';
import { useQueryLoader } from 'react-relay';

import type { mentionedPrListQuery } from 'components/__generated__/mentionedPrListQuery.graphql';
import type { myPrListQuery } from 'components/__generated__/myPrListQuery.graphql';
import type { reviewedPrListQuery } from 'components/__generated__/reviewedPrListQuery.graphql';
import type { reviewPrListQuery } from 'components/__generated__/reviewPrListQuery.graphql';
import MentionedPrList, {
  MentionedPrListQuery,
} from 'components/mentioned-pr-list';
import MyPrList, { MyPrListQuery } from 'components/my-pr-list';
import ReviewPrList, { ReviewPrListQuery } from 'components/review-pr-list';
import ReviewedPrList, {
  ReviewedPrListQuery,
} from 'components/reviewed-pr-list';

type Props = {
  isLoggedIn: boolean;
};

const ReviewPageImpl = ({ isLoggedIn }: Props) => {
  const [myPrQueryRef, loadMyPrQuery] =
    useQueryLoader<myPrListQuery>(MyPrListQuery);
  const [reviewQueryRef, loadReviewQuery] =
    useQueryLoader<reviewPrListQuery>(ReviewPrListQuery);
  const [reviewedQueryRef, loadReviewedQuery] =
    useQueryLoader<reviewedPrListQuery>(ReviewedPrListQuery);
  const [mentionedQueryRef, loadMentionedQuery] =
    useQueryLoader<mentionedPrListQuery>(MentionedPrListQuery);

  const refresh = useCallback(() => {
    if (!isLoggedIn) return;
    loadMyPrQuery({}, { fetchPolicy: 'network-only' });
    loadReviewQuery({}, { fetchPolicy: 'network-only' });
    loadReviewedQuery({}, { fetchPolicy: 'network-only' });
    loadMentionedQuery({}, { fetchPolicy: 'network-only' });
  }, [
    isLoggedIn,
    loadMyPrQuery,
    loadReviewQuery,
    loadReviewedQuery,
    loadMentionedQuery,
  ]);

  useEffect(() => {
    refresh();
    const timerId = setInterval(() => refresh(), 1000 * 60 * 10);
    return () => clearInterval(timerId);
  }, [refresh]);

  return (
    <>
      {reviewQueryRef && <ReviewPrList queryRef={reviewQueryRef} />}
      {reviewedQueryRef && <ReviewedPrList queryRef={reviewedQueryRef} />}
      {mentionedQueryRef && <MentionedPrList queryRef={mentionedQueryRef} />}
      {myPrQueryRef && <MyPrList queryRef={myPrQueryRef} />}
    </>
  );
};

export const ReviewPage = memo(ReviewPageImpl);
