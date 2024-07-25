import { memo } from 'react';
import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type { mentionedPrList_search$key } from 'components/__generated__/mentionedPrList_search.graphql';
import type { MentionedPrListPaginationQuery } from 'components/__generated__/MentionedPrListPaginationQuery.graphql';
import type { mentionedPrListQuery } from 'components/__generated__/mentionedPrListQuery.graphql';
import LoadMoreButton from 'components/load-more-button';
import Pr from 'components/pr';
import PrList from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const MentionedPrListQuery = graphql`
  query mentionedPrListQuery {
    ...mentionedPrList_search
  }
`;

type Props = {
  queryRef: PreloadedQuery<mentionedPrListQuery, Record<string, unknown>>;
};

const MentionedPrList = ({ queryRef }: Props) => {
  const data = usePreloadedQuery<mentionedPrListQuery>(
    MentionedPrListQuery,
    queryRef
  );
  const {
    data: { search },
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<
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
    <PrList title="PRs I'm mentioned in">
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

export default memo(MentionedPrList);
