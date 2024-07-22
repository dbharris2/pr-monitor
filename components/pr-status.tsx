import React, { memo } from 'react';
import { graphql, useFragment } from 'react-relay';

import {
  BeakerIcon,
  CheckIcon,
  CodeReviewIcon,
  FileDiffIcon,
  GitMergeIcon,
  GitPullRequestDraftIcon,
} from '@primer/octicons-react';

import type { prStatus_pullRequest$key } from 'components/__generated__/prStatus_pullRequest.graphql';
import cn from 'utils/cn';

type BadgeProps = {
  icon: React.ReactNode;
  isApproved?: boolean;
  isDraft?: boolean;
  isMerged?: boolean;
  isPending?: boolean;
  isReviewRequested?: boolean;
  isRevisionRequested?: boolean;
};

const Badge = ({
  icon,
  isApproved,
  isDraft,
  isMerged,
  isPending,
  isReviewRequested,
  isRevisionRequested,
}: BadgeProps) => (
  <span
    className={cn(
      'flex items-center whitespace-nowrap rounded-full bg-gray-600 px-2 py-1 text-xs font-semibold leading-none text-white',
      {
        'bg-green-600': isApproved,
        'bg-gray-600': isDraft,
        'bg-purple-500': isMerged,
        'bg-blue-500': isPending,
        'bg-orange-400': isReviewRequested,
        'bg-red-600': isRevisionRequested,
      }
    )}
  >
    {icon}
  </span>
);

const APPROVED = <Badge icon={<CheckIcon />} isApproved key="approved" />;
const CHANGES_REQUESTED = (
  <Badge icon={<FileDiffIcon />} isRevisionRequested key="needs-revision" />
);
const CHECK_STATUS_FAILED = (
  <Badge icon={<BeakerIcon />} isRevisionRequested key="tests-fail" />
);
const CHECK_STATUS_PASSED = (
  <Badge icon={<BeakerIcon />} isApproved key="tests-pass" />
);
const CHECK_STATUS_PENDING = (
  <Badge icon={<BeakerIcon />} isPending key="tests-pending" />
);
const DRAFT = <Badge icon={<GitPullRequestDraftIcon />} isDraft key="draft" />;
const MERGED = <Badge icon={<GitMergeIcon />} isMerged key="merged" />;
const NEEDS_REVIEW = (
  <Badge icon={<CodeReviewIcon />} isReviewRequested key="needs-review" />
);

type Props = {
  prKey: prStatus_pullRequest$key;
};

const PrStatus = ({ prKey }: Props) => {
  const pr = useFragment<prStatus_pullRequest$key>(
    graphql`
      fragment prStatus_pullRequest on PullRequest {
        isDraft
        reviewDecision
        merged
        statusCheckRollup @required(action: THROW) {
          state
        }
      }
    `,
    prKey
  );

  const badges = [];

  if (pr.merged) {
    badges.push(MERGED);
    return badges;
  } else if (pr.isDraft) {
    badges.push(DRAFT);
  } else if (pr.reviewDecision === 'APPROVED') {
    badges.push(APPROVED);
  } else if (pr.reviewDecision === 'CHANGES_REQUESTED') {
    badges.push(CHANGES_REQUESTED);
  } else {
    badges.push(NEEDS_REVIEW);
  }

  switch (pr.statusCheckRollup.state) {
    case 'PENDING':
      badges.push(CHECK_STATUS_PENDING);
      break;
    case 'SUCCESS':
      badges.push(CHECK_STATUS_PASSED);
      break;
    case 'FAILURE':
      badges.push(CHECK_STATUS_FAILED);
      break;
  }

  if (badges.length > 0) {
    return <div className="flex items-center gap-1">{badges}</div>;
  }
  return <></>;
};

export default memo(PrStatus);
