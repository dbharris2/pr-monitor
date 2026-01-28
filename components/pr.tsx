import { graphql, useFragment } from 'react-relay';

import { CommentIcon } from '@primer/octicons-react';
import type { pr_pullRequest$key } from 'components/__generated__/pr_pullRequest.graphql';
import { Avatar } from 'components/avatar';
import { useDisplayMode } from 'components/display-mode-context';
import { PrStatus } from 'components/pr-status';
import { ReviewerAvatars } from 'components/reviewer-avatars';
import cn from 'utils/cn';
import { formatRelativeTime } from 'utils/format-relative-time';

type Props = {
  prKey: pr_pullRequest$key;
};

export const Pr = ({ prKey }: Props) => {
  const { displayMode } = useDisplayMode();
  const isCompact = displayMode === 'compact';

  const pr = useFragment<pr_pullRequest$key>(
    graphql`
      fragment pr_pullRequest on PullRequest {
        author {
          avatarUrl
        }
        additions
        changedFiles
        deletions
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

  if (isCompact) {
    return (
      <a
        className={cn(
          'flex cursor-pointer items-center gap-2 border-b border-solid bg-white px-2 py-1 first:rounded-t-lg last:rounded-b-lg last:border-none hover:bg-purple-300 dark:bg-catppuccin-surface0 dark:hover:bg-catppuccin-mauve/50',
          {
            'bg-red-300 dark:bg-catppuccin-red/50':
              pr.reviewDecision === 'CHANGES_REQUESTED',
            'bg-green-300 dark:bg-catppuccin-green/50':
              pr.reviewDecision === 'APPROVED' && !pr.mergedAt,
          }
        )}
        href={pr.permalink}
        key={pr.number}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Avatar className="!size-6 shrink-0" src={pr.author?.avatarUrl ?? ''} />
        <span className="truncate text-sm text-black dark:text-catppuccin-text">
          {pr.title}
        </span>
        <span className="ml-auto shrink-0 text-xs text-slate-600 dark:text-catppuccin-subtext0">
          {formatRelativeTime(pr.mergedAt ?? pr.updatedAt)}
        </span>
        <PrStatus prKey={pr} />
      </a>
    );
  }

  return (
    <a
      className={cn(
        'flex cursor-pointer border-b border-solid bg-white p-2 first:rounded-t-lg last:rounded-b-lg last:border-none hover:bg-purple-300 dark:bg-catppuccin-surface0 dark:hover:bg-catppuccin-mauve/50',
        {
          'bg-red-300 dark:bg-catppuccin-red/50':
            pr.reviewDecision === 'CHANGES_REQUESTED',
          'bg-green-300 dark:bg-catppuccin-green/50':
            pr.reviewDecision === 'APPROVED' && !pr.mergedAt,
        }
      )}
      href={pr.permalink}
      key={pr.number}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Avatar
        className="!size-10 shrink-0 self-center"
        src={pr.author?.avatarUrl ?? ''}
      />
      <div className="ml-2 flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="truncate text-black dark:text-catppuccin-text">
              {pr.title}
            </div>
          </div>
          <div className="flex shrink-0 pl-2">
            {formatRelativeTime(pr.mergedAt ?? pr.updatedAt)}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex grow flex-wrap gap-2 text-slate-600 dark:text-catppuccin-subtext0">
            {pr.repository.nameWithOwner} #{pr.number}
            <div className="flex gap-1">
              <div className="text-green-600 dark:text-catppuccin-green">
                +{pr.additions}
              </div>
              <div className="text-red-600 dark:text-catppuccin-red">
                -{pr.deletions}
              </div>
              @{pr.changedFiles}
              <div className="ml-1 flex items-center gap-1">
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
