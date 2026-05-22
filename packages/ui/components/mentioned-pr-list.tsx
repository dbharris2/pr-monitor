import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type {
  mentionedPrList_search$data,
  mentionedPrList_search$key,
} from 'components/__generated__/mentionedPrList_search.graphql';
import type { MentionedPrListPaginationQuery } from 'components/__generated__/MentionedPrListPaginationQuery.graphql';
import type { mentionedPrListQuery } from 'components/__generated__/mentionedPrListQuery.graphql';
import { LoadMoreButton } from 'components/load-more-button';
import { Pr } from 'components/pr';
import { PrList } from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const MentionedPrListQuery = graphql`
  query mentionedPrListQuery {
    ...mentionedPrList_search
  }
`;

type Props = {
  queryRef: PreloadedQuery<mentionedPrListQuery>;
};

export const MentionedPrList = ({ queryRef }: Props) => {
  const data = usePreloadedQuery<mentionedPrListQuery>(
    MentionedPrListQuery,
    queryRef
  );
  const {
    data: { search },
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationSearch(data);
  const nodes = useNodes(search);

  return (
    <PrList title="Mentions">
      {nodes.map((pr) => (
        <Pr key={pr.id} prKey={pr.pr_pullRequest!} />
      ))}
      {hasNext && (
        <LoadMoreButton disabled={isLoadingNext} onClick={() => loadNext(10)} />
      )}
    </PrList>
  );
};

const usePaginationSearch = (searchKey: mentionedPrList_search$key) =>
  usePaginationFragment<
    MentionedPrListPaginationQuery,
    mentionedPrList_search$key
  >(
    graphql`
      fragment mentionedPrList_search on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      )
      @refetchable(queryName: "MentionedPrListPaginationQuery") {
        search(
          query: "-author:@me is:open is:pr -review-requested:@me mentions:@me sort:updated"
          type: ISSUE
          first: $count
          after: $cursor
        ) @connection(key: "mentionedPrList_search") @required(action: THROW) {
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
    searchKey
  );

const useNodes = (search: mentionedPrList_search$data['search']) =>
  nonnull(search.edges?.map((e) => e?.node));
