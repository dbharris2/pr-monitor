import { memo, useEffect, useMemo, useState } from 'react';
import type { PreloadedQuery } from 'react-relay';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';

import type { orgPrTable_search$data } from 'components/__generated__/orgPrTable_search.graphql';
import type { prTable_search$key } from 'components/__generated__/prTable_search.graphql';
import type { PrTablePaginationQuery } from 'components/__generated__/PrTablePaginationQuery.graphql';
import type { prTableQuery } from 'components/__generated__/prTableQuery.graphql';
import nonnull from 'utils/nonnull';

type Stats = { prs: number; reviews: number; comments: number };

export const PrTableQuery = graphql`
  query prTableQuery($query: String!) {
    ...prTable_search @arguments(query: $query)
  }
`;

type Props = {
  queryRef: PreloadedQuery<prTableQuery, Record<string, unknown>>;
};

const PrTable = ({ queryRef }: Props) => {
  const data = usePreloadedQuery<prTableQuery>(PrTableQuery, queryRef);
  const {
    data: { search },
    hasNext,
    loadNext,
  } = usePaginationFragment<PrTablePaginationQuery, prTable_search$key>(
    graphql`
      fragment prTable_search on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 100 }
        query: { type: "String!" }
      )
      @refetchable(queryName: "PrTablePaginationQuery") {
        search(query: $query, type: ISSUE, first: $count, after: $cursor)
          @connection(key: "prTable_search")
          @required(action: THROW) {
          edges @required(action: THROW) {
            node {
              ... on PullRequest {
                author {
                  login
                }
                comments(first: 10) {
                  edges {
                    node {
                      author {
                        login
                      }
                    }
                  }
                }
                reviews(first: 10, states: [APPROVED, CHANGES_REQUESTED]) {
                  edges {
                    node {
                      author {
                        login
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    data
  );

  const [statsMap, setStatsMap] = useState(new Map());

  const sm = useMemo(
    () => getStatsMap(nonnull(search.edges).map(({ node }) => node) as Pr[]),
    [search.edges]
  );

  useEffect(() => {
    setStatsMap(sm);
    const timerId = setInterval(() => hasNext && loadNext(100), 500);
    return () => clearInterval(timerId);
  }, [hasNext, loadNext, search.edges, sm, statsMap]);

  return (
    <div>
      {hasNext && 'Still loading...'}
      {statsMap?.size > 0 && (
        <StatsTable>
          {Array.from(statsMap.entries())
            .sort(([_, stats], [_2, stats2]) => stats2.prs - stats.prs)
            .map(([login, stats]) => (
              <StatsRow key={login} name={login} stats={stats} />
            ))}
        </StatsTable>
      )}
    </div>
  );
};

const StatsTable = ({ children }: { children: React.ReactNode }) => (
  <table>
    <tbody>
      <tr>
        <th className="w-48">Name</th>
        <th className="w-24">PRs</th>
        <th className="w-24">Reviews</th>
        <th className="w-24">Comments</th>
      </tr>
      {children}
    </tbody>
  </table>
);

const StatsRow = ({ name, stats }: { name: string; stats: Stats }) => (
  <tr>
    <td>{name}</td>
    <td className="text-center">{stats.prs}</td>
    <td className="text-center">{stats.reviews}</td>
    <td className="text-center">{stats.comments}</td>
  </tr>
);

type PrEdges = NonNullable<orgPrTable_search$data['search']['edges']>[number];
type PrNode = NonNullable<PrEdges>['node'];
type Pr = NonNullable<PrNode>;

const getStatsMap = (prs: Pr[]) => {
  const stats = new Map();
  nonnull(prs).forEach((pr: Pr) => {
    const reviewsMap = new Map();
    for (const review of nonnull(pr.reviews?.edges).map(({ node }) => node)) {
      const stats = reviewsMap.get(review?.author?.login);
      if (stats == null) {
        reviewsMap.set(review?.author?.login, [review]);
      } else {
        stats.push(review);
      }
    }

    const commentsMap = new Map();
    for (const comment of nonnull(pr.comments?.edges).map(({ node }) => node)) {
      const stats = commentsMap.get(comment?.author?.login);
      if (stats == null) {
        commentsMap.set(comment?.author?.login, [comment]);
      } else {
        stats.push(comment);
      }
    }

    const accumulatePrs = stats.get(pr.author?.login)?.prs ?? 0;

    stats.set(pr.author?.login, {
      prs: accumulatePrs + 1,
      reviews: stats.get(pr.author?.login)?.reviews ?? 0,
      comments: stats.get(pr.author?.login)?.comments ?? 0,
    });

    Array.from(reviewsMap.entries() ?? []).forEach(([login, reviews]) => {
      stats.set(login, {
        prs: stats.get(login)?.prs ?? 0,
        reviews: (stats.get(login)?.reviews ?? 0) + reviews?.length,
        comments: stats.get(login)?.comments ?? 0,
      });
    });

    Array.from(commentsMap.entries() ?? []).forEach(([login, comments]) => {
      stats.set(login, {
        prs: stats.get(login)?.prs ?? 0,
        reviews: stats.get(login)?.reviews ?? 0,
        comments: (stats.get(login)?.comments ?? 0) + comments?.length,
      });
    });
  });
  return stats;
};

export default memo(PrTable);
