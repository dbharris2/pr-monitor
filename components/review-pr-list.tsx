import { memo } from 'react';
import type { PreloadedQuery } from 'react-relay';
import { graphql, usePreloadedQuery } from 'react-relay';

import PrList from './pr-list';

import type { reviewPrListQuery } from 'components/__generated__/reviewPrListQuery.graphql';
import Pr from 'components/pr';
import nonnull from 'utils/nonnull';

export const ReviewPrListQuery = graphql`
  query reviewPrListQuery {
    search(
      query: "-author:@me -is:draft is:open is:pr review-requested:@me -review:approved"
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
  queryRef: PreloadedQuery<reviewPrListQuery, Record<string, unknown>>;
};

const ReviewPrList = ({ queryRef }: Props) => {
  const { search } = usePreloadedQuery<reviewPrListQuery>(
    ReviewPrListQuery,
    queryRef
  );

  return (
    <PrList title="Review Requested">
      {nonnull(search.nodes).map((pr) => (
        <Pr key={pr!.id} prKey={pr!} />
      ))}
    </PrList>
  );
};

export default memo(ReviewPrList);
