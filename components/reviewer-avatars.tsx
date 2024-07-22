import { memo } from 'react';
import { graphql, useFragment } from 'react-relay';

import type { reviewerAvatars_pullRequest$key } from 'components/__generated__/reviewerAvatars_pullRequest.graphql';
import Avatar from 'components/avatar';
import nonnull from 'utils/nonnull';

type Props = {
  prKey: reviewerAvatars_pullRequest$key;
};

const ReviewerAvatars = ({ prKey }: Props) => {
  const pr = useFragment<reviewerAvatars_pullRequest$key>(
    graphql`
      fragment reviewerAvatars_pullRequest on PullRequest {
        reviewRequests(first: 10) @required(action: THROW) {
          nodes @required(action: THROW) {
            requestedReviewer @required(action: THROW) {
              ... on User {
                avatarUrl @required(action: THROW)
              }
            }
          }
        }
      }
    `,
    prKey
  );

  const requests = nonnull(pr.reviewRequests.nodes);
  if (requests.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-0.5">
      {requests.map(({ requestedReviewer }, index) => (
        <Avatar key={index} src={requestedReviewer.avatarUrl} />
      ))}
    </div>
  );
};

export default memo(ReviewerAvatars);
