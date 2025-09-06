import { memo } from 'react';
import { graphql, useFragment } from 'react-relay';

import { CommentIcon } from '@primer/octicons-react';

import type { pr_pullRequest$key } from 'components/__generated__/pr_pullRequest.graphql';
import Avatar from 'components/avatar';
import PrStatus from 'components/pr-status';
import ReviewerAvatars from 'components/reviewer-avatars';
import moment from 'moment';
import cn from 'utils/cn';

type Props = {
  prKey: pr_pullRequest$key;
};

const Pr = ({ prKey }: Props) => {
  const pr = useFragment<pr_pullRequest$key>(
    graphql`
      fragment pr_pullRequest on PullRequest {
        author {
          avatarUrl
        }
        additions
        changedFiles
        deletions
        merged
        mergedAt
        number
        permalink
        repository {
          nameWithOwner
        }
        reviewDecision
        title
        totalCommentsCount
        updatedAt
        ...prStatus_pullRequest
        ...reviewerAvatars_pullRequest
      }
    `,
    prKey
  );
  return (
    <a
      className={cn(
        'flex cursor-pointer border-b border-solid bg-white dark:bg-sky-950 p-2 first:rounded-t-lg last:rounded-b-lg last:border-none hover:bg-purple-300 dark:hover:bg-purple-950',
        { 'bg-red-300 dark:bg-red-950': pr.reviewDecision === 'CHANGES_REQUESTED' },
        { 'bg-green-300 dark:bg-green-900': pr.reviewDecision === 'APPROVED' && !pr.merged }
      )}
      href={pr.permalink}
      key={pr.number}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <Avatar src={pr.author?.avatarUrl ?? ''} />
            <div className="truncate dark:text-blue-200">
              {pr.title} (#{pr.number})
            </div>
          </div>
          <div className="flex shrink-0 pl-2">
            {moment(pr.mergedAt ?? pr.updatedAt).format('MM/DD HH:mm')}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex grow flex-wrap gap-2 dark:text-blue-200">
            {pr.repository.nameWithOwner}
            <div className="flex gap-1">
              <div className="text-green-600 dark:text-green-700">+{pr.additions}</div>
              <div className="text-red-600 dark:text-red-700">-{pr.deletions}</div>@
              {pr.changedFiles}
              <div className="ml-1">
                <CommentIcon /> {pr.totalCommentsCount}
              </div>
            </div>
            <ReviewerAvatars prKey={pr} />
          </div>
          <PrStatus prKey={pr} />
        </div>
      </div>
    </a>
  );
};

export default memo(Pr);
