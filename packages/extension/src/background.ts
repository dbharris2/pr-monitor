import { getToken, TOKEN_KEY } from 'extension/src/token-storage';

const ALARM_NAME = 'pr-monitor-refresh';
const REVIEW_REQUESTED_SEARCH =
  '-author:@me -is:draft is:open is:pr review-requested:@me sort:updated';
const BADGE_BG = '#f38ba8';
const BADGE_TEXT_COLOR = '#11111b';

const REVIEW_REQUESTED_QUERY = `
  query ReviewRequestedCount($q: String!) {
    search(query: $q, type: ISSUE, first: 50) {
      edges {
        node {
          ... on PullRequest {
            reviewDecision
          }
        }
      }
    }
  }
`;

type SearchEdge = {
  node?: { reviewDecision?: string | null } | null;
};

async function fetchReviewRequestedCount(token: string): Promise<number> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: REVIEW_REQUESTED_QUERY,
      variables: { q: REVIEW_REQUESTED_SEARCH },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}`);
  }

  const body = (await response.json()) as {
    data?: { search?: { edges?: SearchEdge[] | null } | null };
  };
  const edges = body.data?.search?.edges ?? [];
  return edges.filter((edge) => {
    const decision = edge?.node?.reviewDecision;
    return decision !== 'APPROVED' && decision !== 'CHANGES_REQUESTED';
  }).length;
}

async function updateBadge() {
  const token = await getToken();
  if (!token) {
    await chrome.action.setBadgeText({ text: '' });
    return;
  }

  try {
    const count = await fetchReviewRequestedCount(token);
    await chrome.action.setBadgeBackgroundColor({ color: BADGE_BG });
    await chrome.action.setBadgeTextColor({ color: BADGE_TEXT_COLOR });
    await chrome.action.setBadgeText({ text: count > 0 ? String(count) : '' });
  } catch (e) {
    console.error('Failed to update PR badge', e);
  }
}

function ensureAlarm() {
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1 });
}

chrome.runtime.onInstalled.addListener(() => {
  ensureAlarm();
  void updateBadge();
});

chrome.runtime.onStartup.addListener(() => {
  ensureAlarm();
  void updateBadge();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) void updateBadge();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && TOKEN_KEY in changes) {
    void updateBadge();
  }
});
