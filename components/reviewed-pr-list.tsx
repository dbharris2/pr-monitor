import { memo } from 'react';
import type { PreloadedQuery } from 'react-relay';
import { graphql, usePreloadedQuery } from 'react-relay';

import type { reviewedPrListQuery } from 'components/__generated__/reviewedPrListQuery.graphql';
import Pr from 'components/pr';
import PrList from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const ReviewedPrListQuery = graphql`
  query reviewedPrListQuery {
    search(
      query: "-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved"
      type: ISSUE
      first: 30
    ) @required(action: THROW) {
      nodes @required(action: THROW) {
        ... on PullRequest {
          id
          ...pr_pullRequest
        }
      }
    }
  }
`;

type Props = {
  queryRef: PreloadedQuery<reviewedPrListQuery, Record<string, unknown>>;
};

const ReviewedPrList = ({ queryRef }: Props) => {
  const { search } = usePreloadedQuery<reviewedPrListQuery>(
    ReviewedPrListQuery,
    queryRef
  );

  return (
    <PrList title="Reviewed">
      {nonnull(search.nodes).map((pr) => (
        <Pr key={pr!.id} prKey={pr!} />
      ))}
    </PrList>
  );
};

export default memo(ReviewedPrList);
