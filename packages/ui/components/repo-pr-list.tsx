import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type {
  repoPrList_search$data,
  repoPrList_search$key,
} from 'components/__generated__/repoPrList_search.graphql';
import type { RepoPrListPaginationQuery } from 'components/__generated__/RepoPrListPaginationQuery.graphql';
import type { repoPrListQuery } from 'components/__generated__/repoPrListQuery.graphql';
import { LoadMoreButton } from 'components/load-more-button';
import { Pr } from 'components/pr';
import { PrList } from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const RepoPrListQuery = graphql`
  query repoPrListQuery($query: String!) {
    ...repoPrList_search @arguments(query: $query)
  }
`;

type Props = {
  queryRef: PreloadedQuery<repoPrListQuery>;
  title: string;
};

export const RepoPrList = ({ queryRef, title }: Props) => {
  const data = usePreloadedQuery<repoPrListQuery>(RepoPrListQuery, queryRef);
  const {
    data: { search },
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationSearch(data);
  const nodes = useSortedNodes(search);

  return (
    <PrList title={title}>
      {nodes.map((node) => (
        <Pr key={node.id} prKey={node.pr_pullRequest!} />
      ))}
      {hasNext && (
        <LoadMoreButton disabled={isLoadingNext} onClick={() => loadNext(10)} />
      )}
    </PrList>
  );
};

const usePaginationSearch = (searchKey: repoPrList_search$key) =>
  usePaginationFragment<RepoPrListPaginationQuery, repoPrList_search$key>(
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
                ...pr_pullRequest @alias
              }
            }
          }
        }
      }
    `,
    searchKey
  );

const useSortedNodes = (search: repoPrList_search$data['search']) =>
  nonnull(search.edges?.map((e) => e?.node)).sort((a, b) =>
    a.mergedAt > b.mergedAt ? -1 : 1
  );
