import { memo } from 'react';
import type { PreloadedQuery } from 'react-relay';
import { graphql, usePreloadedQuery } from 'react-relay';

import type { myPrListQuery } from 'components/__generated__/myPrListQuery.graphql';
import Pr from 'components/pr';
import PrList from 'components/pr-list';
import nonnull from 'utils/nonnull';

export const MyPrListQuery = graphql`
  query myPrListQuery {
    search(query: "author:@me is:pr is:open", type: ISSUE, first: 30)
      @required(action: THROW) {
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
  queryRef: PreloadedQuery<myPrListQuery, Record<string, unknown>>;
};

const MyPrList = ({ queryRef }: Props) => {
  const { search } = usePreloadedQuery<myPrListQuery>(MyPrListQuery, queryRef);

  return (
    <PrList title="My PRs">
      {nonnull(search.nodes).map((pr) => (
        <Pr key={pr!.id} prKey={pr!} />
      ))}
    </PrList>
  );
};

export default memo(MyPrList);
