import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type { myPrList_search$key } from 'components/__generated__/myPrList_search.graphql';
import type { MyPrListPaginationQuery } from 'components/__generated__/MyPrListPaginationQuery.graphql';
import type { myPrListQuery } from 'components/__generated__/myPrListQuery.graphql';
import { LoadMoreButton } from 'components/load-more-button';
import { Pr } from 'components/pr';
import { PrList } from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const MyPrListQuery = graphql`
  query myPrListQuery {
    ...myPrList_search
  }
`;

type Props = {
  queryRef: PreloadedQuery<myPrListQuery, Record<string, unknown>>;
};

export const MyPrList = ({ queryRef }: Props) => {
  const data = usePreloadedQuery<myPrListQuery>(MyPrListQuery, queryRef);
  const {
    data: { search },
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<MyPrListPaginationQuery, myPrList_search$key>(
    graphql`
      fragment myPrList_search on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      )
      @refetchable(queryName: "MyPrListPaginationQuery") {
        search(
          query: "author:@me is:pr is:open sort:updated"
          type: ISSUE
          first: $count
          after: $cursor
        ) @connection(key: "myPrList_search") @required(action: THROW) {
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
    <PrList title="My PRs">
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
