import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type { reviewedPrList_search$key } from 'components/__generated__/reviewedPrList_search.graphql';
import type { ReviewedPrListPaginationQuery } from 'components/__generated__/ReviewedPrListPaginationQuery.graphql';
import type { reviewedPrListQuery } from 'components/__generated__/reviewedPrListQuery.graphql';
import { LoadMoreButton } from 'components/load-more-button';
import { Pr } from 'components/pr';
import { PrList } from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const ReviewedPrListQuery = graphql`
  query reviewedPrListQuery {
    ...reviewedPrList_search
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
  const {
    data: { search },
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<
    ReviewedPrListPaginationQuery,
    reviewedPrList_search$key
  >(
    graphql`
      fragment reviewedPrList_search on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      )
      @refetchable(queryName: "ReviewedPrListPaginationQuery") {
        search(
          query: "-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved sort:updated"
          type: ISSUE
          first: $count
          after: $cursor
        ) @connection(key: "reviewedPrList_search") @required(action: THROW) {
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

  return (
    <PrList title="Reviewed">
      {nonnull(search.edges)
        .map(({ node }) => node)
        .map((pr) => (
          <Pr key={pr!.id} prKey={pr!} />
        ))}
      {hasNext && (
        <LoadMoreButton disabled={isLoadingNext} onClick={() => loadNext(10)} />
      )}
    </PrList>
  );
};
