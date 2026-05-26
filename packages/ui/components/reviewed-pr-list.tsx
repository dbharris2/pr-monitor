import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type {
  reviewedPrList_changesRequested$data,
  reviewedPrList_changesRequested$key,
} from 'components/__generated__/reviewedPrList_changesRequested.graphql';
import type {
  reviewedPrList_reviewed$data,
  reviewedPrList_reviewed$key,
} from 'components/__generated__/reviewedPrList_reviewed.graphql';
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
  queryRef: PreloadedQuery<reviewedPrListQuery>;
};

export const ReviewedPrList = ({ queryRef }: Props) => {
  const data = usePreloadedQuery<reviewedPrListQuery>(
    ReviewedPrListQuery,
    queryRef
  );

  const {
    data: { reviewed },
    hasNext: hasNextReviewed,
    loadNext: loadNextReviewed,
    isLoadingNext: isLoadingNextReviewed,
  } = usePaginationReviewed(data);

  const {
    data: { changesRequested },
    hasNext: hasNextChangesRequested,
    loadNext: loadNextChangesRequested,
    isLoadingNext: isLoadingNextChangesRequested,
  } = usePaginationChangesRequested(data);

  const nodes = useCombinedNodes(reviewed, changesRequested);

  const hasNext = hasNextReviewed || hasNextChangesRequested;
  const isLoadingNext = isLoadingNextReviewed || isLoadingNextChangesRequested;

  const loadNext = () => {
    if (hasNextReviewed) loadNextReviewed(10);
    if (hasNextChangesRequested) loadNextChangesRequested(10);
  };

  return (
    <PrList title="Reviewed">
      {nodes.map((pr) => (
        <Pr key={pr.id} prKey={pr.pr_pullRequest!} />
      ))}
      {hasNext && (
        <LoadMoreButton disabled={isLoadingNext} onClick={loadNext} />
      )}
    </PrList>
  );
};

const usePaginationReviewed = (key: reviewedPrList_reviewed$key) =>
  usePaginationFragment<
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
                ...pr_pullRequest @alias
              }
            }
          }
        }
      }
    `,
    key
  );

const usePaginationChangesRequested = (
  key: reviewedPrList_changesRequested$key
) =>
  usePaginationFragment<
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
                ...pr_pullRequest @alias
              }
            }
          }
        }
      }
    `,
    key
  );

// Reviewed PRs plus PRs where someone requested changes, deduped by id
const useCombinedNodes = (
  reviewed: reviewedPrList_reviewed$data['reviewed'],
  changesRequested: reviewedPrList_changesRequested$data['changesRequested']
) => {
  const reviewedNodes = nonnull(reviewed.edges?.map((e) => e?.node));
  const changesRequestedNodes = nonnull(
    changesRequested.edges?.map((e) => e?.node)
  ).filter((pr) => pr.reviewDecision === 'CHANGES_REQUESTED');

  const seen = new Set<string>();
  return [...reviewedNodes, ...changesRequestedNodes].filter((pr) => {
    if (!pr.id) return false;
    if (seen.has(pr.id)) return false;
    seen.add(pr.id);
    return true;
  });
};
