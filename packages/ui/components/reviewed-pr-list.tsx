import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type { reviewedPrList_changesRequested$key } from 'components/__generated__/reviewedPrList_changesRequested.graphql';
import type { reviewedPrList_reviewed$key } from 'components/__generated__/reviewedPrList_reviewed.graphql';
import type { ReviewedPrListChangesRequestedPaginationQuery } from 'components/__generated__/ReviewedPrListChangesRequestedPaginationQuery.graphql';
import type { ReviewedPrListPaginationQuery } from 'components/__generated__/ReviewedPrListPaginationQuery.graphql';
import type { reviewedPrListQuery } from 'components/__generated__/reviewedPrListQuery.graphql';
import { LoadMoreButton } from 'components/load-more-button';
import { Pr } from 'components/pr';
import { PrList } from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const ReviewedPrListQuery = graphql`
  query reviewedPrListQuery {
    ...reviewedPrList_reviewed
    ...reviewedPrList_changesRequested
  }
`;

type Props = {
  queryRef: PreloadedQuery<reviewedPrListQuery, Record<string, unknown>>;
};

export const ReviewedPrList = ({ queryRef }: Props) => {
  const data = usePreloadedQuery<reviewedPrListQuery>(
    ReviewedPrListQuery,
    queryRef
  );

  // PRs the user has already reviewed
  const {
    data: { reviewed },
    hasNext: hasNextReviewed,
    loadNext: loadNextReviewed,
    isLoadingNext: isLoadingNextReviewed,
  } = usePaginationFragment<
    ReviewedPrListPaginationQuery,
    reviewedPrList_reviewed$key
  >(
    graphql`
      fragment reviewedPrList_reviewed on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      )
      @refetchable(queryName: "ReviewedPrListPaginationQuery") {
        reviewed: search(
          query: "-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved sort:updated"
          type: ISSUE
          first: $count
          after: $cursor
        ) @connection(key: "reviewedPrList_reviewed") @required(action: THROW) {
          edges {
            node {
              ... on PullRequest {
                id
                ...pr_pullRequest
              }
            }
          }
        }
      }
    `,
    data
  );

  // PRs where user is a requested reviewer - we'll filter for changes_requested client-side
  const {
    data: { changesRequested },
    hasNext: hasNextChangesRequested,
    loadNext: loadNextChangesRequested,
    isLoadingNext: isLoadingNextChangesRequested,
  } = usePaginationFragment<
    ReviewedPrListChangesRequestedPaginationQuery,
    reviewedPrList_changesRequested$key
  >(
    graphql`
      fragment reviewedPrList_changesRequested on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      )
      @refetchable(queryName: "ReviewedPrListChangesRequestedPaginationQuery") {
        changesRequested: search(
          query: "-author:@me -is:draft is:open is:pr review-requested:@me sort:updated"
          type: ISSUE
          first: $count
          after: $cursor
        )
          @connection(key: "reviewedPrList_changesRequested")
          @required(action: THROW) {
          edges {
            node {
              ... on PullRequest {
                id
                reviewDecision
                ...pr_pullRequest
              }
            }
          }
        }
      }
    `,
    data
  );

  const reviewedPrs = nonnull(reviewed.edges).map(({ node }) => node);

  // Filter to only PRs where someone requested changes (matches Mac app behavior)
  const changesRequestedPrs = nonnull(changesRequested.edges)
    .map(({ node }) => node)
    .filter((pr) => pr?.reviewDecision === 'CHANGES_REQUESTED');

  // Combine both lists, deduplicating by ID
  const seenIds = new Set<string>();
  const allPrs = [...reviewedPrs, ...changesRequestedPrs].filter((pr) => {
    const id = pr?.id;
    if (!id || seenIds.has(id)) return false;
    seenIds.add(id);
    return true;
  });

  const hasNext = hasNextReviewed || hasNextChangesRequested;
  const isLoadingNext = isLoadingNextReviewed || isLoadingNextChangesRequested;

  const loadNext = () => {
    if (hasNextReviewed) loadNextReviewed(10);
    if (hasNextChangesRequested) loadNextChangesRequested(10);
  };

  return (
    <PrList title="Reviewed">
      {allPrs.map((pr) => (
        <Pr key={pr!.id} prKey={pr!} />
      ))}
      {hasNext && (
        <LoadMoreButton disabled={isLoadingNext} onClick={loadNext} />
      )}
    </PrList>
  );
};
