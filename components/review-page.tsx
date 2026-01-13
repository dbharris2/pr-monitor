'use client';

import { Suspense, useEffect } from 'react';
import { useQueryLoader } from 'react-relay';

import useOnVisible from 'utils/use-on-visible';

import type { mentionedPrListQuery } from 'components/__generated__/mentionedPrListQuery.graphql';
import type { myPrListQuery } from 'components/__generated__/myPrListQuery.graphql';
import type { reviewedPrListQuery } from 'components/__generated__/reviewedPrListQuery.graphql';
import type { reviewPrListQuery } from 'components/__generated__/reviewPrListQuery.graphql';
import {
  MentionedPrList,
  MentionedPrListQuery,
} from 'components/mentioned-pr-list';
import { MyPrList, MyPrListQuery } from 'components/my-pr-list';
import { ReviewPrList, ReviewPrListQuery } from 'components/review-pr-list';
import {
  ReviewedPrList,
  ReviewedPrListQuery,
} from 'components/reviewed-pr-list';
import { SkeletonList } from 'components/skeleton-list';

type Props = {
  isLoggedIn: boolean;
};

export const ReviewPage = ({ isLoggedIn }: Props) => {
  const [myPrQueryRef, loadMyPrQuery] =
    useQueryLoader<myPrListQuery>(MyPrListQuery);
  const [reviewQueryRef, loadReviewQuery] =
    useQueryLoader<reviewPrListQuery>(ReviewPrListQuery);
  const [reviewedQueryRef, loadReviewedQuery] =
    useQueryLoader<reviewedPrListQuery>(ReviewedPrListQuery);
  const [mentionedQueryRef, loadMentionedQuery] =
    useQueryLoader<mentionedPrListQuery>(MentionedPrListQuery);

  const refresh = () => {
    if (!isLoggedIn) return;
    if (document.visibilityState !== 'visible') return;

    const fetchPolicy = 'store-and-network' as const;
    loadMyPrQuery({}, { fetchPolicy });
    loadReviewQuery({}, { fetchPolicy });
    loadReviewedQuery({}, { fetchPolicy });
    loadMentionedQuery({}, { fetchPolicy });
  };

  useEffect(() => {
    refresh();
    const timerId = setInterval(refresh, 1000 * 60 * 10);
    return () => clearInterval(timerId);
  }, [refresh]);

  useOnVisible(refresh);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <SkeletonList
          titles={['Review requested', 'Reviewed', 'Mentions', 'My PRs']}
        />
      }
    >
      {reviewQueryRef && <ReviewPrList queryRef={reviewQueryRef} />}
      {reviewedQueryRef && <ReviewedPrList queryRef={reviewedQueryRef} />}
      {mentionedQueryRef && <MentionedPrList queryRef={mentionedQueryRef} />}
      {myPrQueryRef && <MyPrList queryRef={myPrQueryRef} />}
    </Suspense>
  );
};
