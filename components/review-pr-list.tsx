import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type { reviewPrList_search$key } from 'components/__generated__/reviewPrList_search.graphql';
import type { ReviewPrListPaginationQuery } from 'components/__generated__/ReviewPrListPaginationQuery.graphql';
import type { reviewPrListQuery } from 'components/__generated__/reviewPrListQuery.graphql';
import { LoadMoreButton } from 'components/load-more-button';
import { Pr } from 'components/pr';
import { PrList } from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const ReviewPrListQuery = graphql`
  query reviewPrListQuery {
    ...reviewPrList_search
  }
`;

type Props = {
  queryRef: PreloadedQuery<reviewPrListQuery, Record<string, unknown>>;
};

export const ReviewPrList = ({ queryRef }: Props) => {
  const data = usePreloadedQuery<reviewPrListQuery>(
    ReviewPrListQuery,
    queryRef
  );
  const {
    data: { search },
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<
    ReviewPrListPaginationQuery,
    reviewPrList_search$key
  >(
    graphql`
      fragment reviewPrList_search on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      )
      @refetchable(queryName: "ReviewPrListPaginationQuery") {
        search(
          query: "-author:@me -is:draft is:open is:pr review-requested:@me sort:updated"
          type: ISSUE
          first: $count
          after: $cursor
        ) @connection(key: "reviewPrList_search") @required(action: THROW) {
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

  // Filter out PRs that are approved or have changes requested (matches Mac app behavior)
  const prs = nonnull(search.edges)
    .map(({ node }) => node)
    .filter(
      (pr) =>
        pr?.reviewDecision !== 'APPROVED' &&
        pr?.reviewDecision !== 'CHANGES_REQUESTED'
    );

  return (
    <PrList title="Review requested">
      {prs.map((pr) => (
        <Pr key={pr!.id} prKey={pr!} />
      ))}
      {hasNext && (
        <LoadMoreButton disabled={isLoadingNext} onClick={() => loadNext(10)} />
      )}
    </PrList>
  );
};
