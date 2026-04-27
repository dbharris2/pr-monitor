import { graphql, useFragment } from 'react-relay';

import type { reviewerAvatars_pullRequest$key } from 'components/__generated__/reviewerAvatars_pullRequest.graphql';
import { Avatar } from 'components/avatar';
import nonnull from 'utils/nonnull';

type Props = {
  prKey: reviewerAvatars_pullRequest$key;
};

export const ReviewerAvatars = ({ prKey }: Props) => {
  const pr = useFragment<reviewerAvatars_pullRequest$key>(
    graphql`
      fragment reviewerAvatars_pullRequest on PullRequest {
        author @required(action: THROW) {
          avatarUrl
        }
        reviewRequests(first: 10) @required(action: THROW) {
          nodes @required(action: THROW) {
            requestedReviewer {
              ... on User {
                avatarUrl
              }
              ... on Team {
                teamAvatarUrl: avatarUrl
              }
              ... on Bot {
                avatarUrl
              }
              ... on Mannequin {
                avatarUrl
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

  const reviewers = new Map<string, 'circle' | 'rounded'>();
  for (const { requestedReviewer } of nonnull(pr.reviewRequests.nodes)) {
    if (requestedReviewer?.teamAvatarUrl) {
      reviewers.set(requestedReviewer.teamAvatarUrl, 'rounded');
    } else if (requestedReviewer?.avatarUrl) {
      reviewers.set(requestedReviewer.avatarUrl, 'circle');
    }
  }
  for (const { author } of nonnull(pr?.reviews?.nodes)) {
    if (author?.avatarUrl) {
      reviewers.set(author.avatarUrl, 'circle');
    }
  }
  reviewers.delete(pr.author.avatarUrl);

  if (reviewers.size === 0) {
    return null;
  }

  return (
    <div className="flex gap-0.5">
      {Array.from(reviewers).map(([avatarUrl, shape], index) => (
        <Avatar key={index} shape={shape} src={avatarUrl} />
      ))}
    </div>
  );
};
