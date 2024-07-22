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
        reviews(first: 10) {
          nodes @required(action: THROW) {
            author {
              avatarUrl
            }
          }
        }
      }
    `,
    prKey
  );

  const avatarUrls = Array.from(
    new Set(
      nonnull(pr.reviewRequests.nodes)
        .map(({ requestedReviewer }) => requestedReviewer.avatarUrl)
        .concat(
          nonnull(pr?.reviews?.nodes).map(({ author }) => author?.avatarUrl)
        )
    )
  );

  if (avatarUrls.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-0.5">
      {avatarUrls.map((avatarUrl, index) => (
        <Avatar key={index} src={avatarUrl} />
      ))}
    </div>
  );
};

export default memo(ReviewerAvatars);
