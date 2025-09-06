import { memo } from 'react';
import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type { repoPrList_search$key } from 'components/__generated__/repoPrList_search.graphql';
import type { RepoPrListPaginationQuery } from 'components/__generated__/RepoPrListPaginationQuery.graphql';
import type { repoPrListQuery } from 'components/__generated__/repoPrListQuery.graphql';
import LoadMoreButton from 'components/load-more-button';
import Pr from 'components/pr';
import PrList from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const RepoPrListQuery = graphql`
  query repoPrListQuery($query: String!) {
    ...repoPrList_search @arguments(query: $query)
  }
`;

type Props = {
  queryRef: PreloadedQuery<repoPrListQuery, Record<string, unknown>>;
  title: string;
};

const RepoPrList = ({ queryRef, title }: Props) => {
  const data = usePreloadedQuery<repoPrListQuery>(RepoPrListQuery, queryRef);
  const {
    data: { search },
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<RepoPrListPaginationQuery, repoPrList_search$key>(
    graphql`
      fragment repoPrList_search on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
        query: { type: "String!" }
      )
      @refetchable(queryName: "RepoPrListPaginationQuery") {
        search(query: $query, type: ISSUE, first: $count, after: $cursor)
          @connection(key: "repoPrList_search")
          @required(action: THROW) {
          edges {
            node {
              ... on PullRequest {
                id
                mergedAt
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
    <PrList title={title}>
      {nonnull(search.edges)
        .sort((a, b) => (a.node!.mergedAt > b.node!.mergedAt ? -1 : 1))
        .map(({ node }) => (
          <Pr key={node!.id} prKey={node!} />
        ))}
      {hasNext && (
        <LoadMoreButton disabled={isLoadingNext} onClick={() => loadNext(10)} />
      )}
    </PrList>
  );
};

export default memo(RepoPrList);
