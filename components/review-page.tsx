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
import { usePrevious } from 'utils/use-previous';

type Props = {
  token: string | null;
};

const ReviewPageImpl = ({ token }: Props) => {
  const prevToken = usePrevious(token);

  const [myPrQueryRef, loadMyPrQuery] =
    useQueryLoader<myPrListQuery>(MyPrListQuery);
  const [reviewQueryRef, loadReviewQuery] =
    useQueryLoader<reviewPrListQuery>(ReviewPrListQuery);
  const [reviewedQueryRef, loadReviewedQuery] =
    useQueryLoader<reviewedPrListQuery>(ReviewedPrListQuery);
  const [mentionedQueryRef, loadMentionedQuery] =
    useQueryLoader<mentionedPrListQuery>(MentionedPrListQuery);

  const refresh = useCallback(() => {
    if (!token) return;
    loadMyPrQuery({}, { fetchPolicy: 'network-only' });
    loadReviewQuery({}, { fetchPolicy: 'network-only' });
    loadReviewedQuery({}, { fetchPolicy: 'network-only' });
    loadMentionedQuery({}, { fetchPolicy: 'network-only' });
  }, [
    token,
    loadMyPrQuery,
    loadReviewQuery,
    loadReviewedQuery,
    loadMentionedQuery,
  ]);

  useEffect(() => {
    if (!prevToken || prevToken !== token) {
      refresh();
    }

    const timerId = setInterval(() => refresh(), 1000 * 60 * 10);
    return () => clearInterval(timerId);
  }, [prevToken, refresh, token]);

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
