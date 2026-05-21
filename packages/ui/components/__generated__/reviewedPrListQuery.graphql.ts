/**
 * @generated SignedSource<<fceda3742b19f880b1125249470aeb76>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewedPrListQuery$variables = Record<PropertyKey, never>;
export type reviewedPrListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"reviewedPrList_changesRequested" | "reviewedPrList_reviewed">;
};
export type reviewedPrListQuery = {
  response: reviewedPrListQuery$data;
  variables: reviewedPrListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v1 = {
  "kind": "Literal",
  "name": "type",
  "value": "ISSUE"
},
v2 = [
  (v0/*:: as any*/),
  {
    "kind": "Literal",
    "name": "query",
    "value": "-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved sort:updated"
  },
  (v1/*:: as any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*:: as any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": [
    (v3/*:: as any*/),
    (v5/*:: as any*/),
    (v6/*:: as any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "additions",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "changedFiles",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deletions",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mergedAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "permalink",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Repository",
  "kind": "LinkedField",
  "name": "repository",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nameWithOwner",
      "storageKey": null
    },
    (v4/*:: as any*/)
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reviewDecision",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCommentsCount",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDraft",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInMergeQueue",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "merged",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "StatusCheckRollup",
  "kind": "LinkedField",
  "name": "statusCheckRollup",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    (v4/*:: as any*/)
  ],
  "storageKey": null
},
v23 = [
  (v0/*:: as any*/)
],
v24 = [
  (v5/*:: as any*/)
],
v25 = {
  "alias": null,
  "args": (v23/*:: as any*/),
  "concreteType": "ReviewRequestConnection",
  "kind": "LinkedField",
  "name": "reviewRequests",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ReviewRequest",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "requestedReviewer",
          "plural": false,
          "selections": [
            (v3/*:: as any*/),
            {
              "kind": "InlineFragment",
              "selections": (v24/*:: as any*/),
              "type": "User",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": "teamAvatarUrl",
                  "args": null,
                  "kind": "ScalarField",
                  "name": "avatarUrl",
                  "storageKey": null
                }
              ],
              "type": "Team",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v24/*:: as any*/),
              "type": "Bot",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v24/*:: as any*/),
              "type": "Mannequin",
              "abstractKey": null
            },
            (v6/*:: as any*/)
          ],
          "storageKey": null
        },
        (v4/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": "reviewRequests(first:10)"
},
v26 = {
  "alias": null,
  "args": (v23/*:: as any*/),
  "concreteType": "PullRequestReviewConnection",
  "kind": "LinkedField",
  "name": "reviews",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PullRequestReview",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        (v7/*:: as any*/),
        (v4/*:: as any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": "reviews(first:10)"
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v29 = [
  "query",
  "type"
],
v30 = [
  (v0/*:: as any*/),
  {
    "kind": "Literal",
    "name": "query",
    "value": "-author:@me -is:draft is:open is:pr review-requested:@me sort:updated"
  },
  (v1/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "reviewedPrListQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "reviewedPrList_reviewed"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "reviewedPrList_changesRequested"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "reviewedPrListQuery",
    "selections": [
      {
        "alias": "reviewed",
        "args": (v2/*:: as any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchResultItemEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*:: as any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*:: as any*/),
                      (v7/*:: as any*/),
                      (v8/*:: as any*/),
                      (v9/*:: as any*/),
                      (v10/*:: as any*/),
                      (v11/*:: as any*/),
                      (v12/*:: as any*/),
                      (v13/*:: as any*/),
                      (v14/*:: as any*/),
                      (v15/*:: as any*/),
                      (v16/*:: as any*/),
                      (v17/*:: as any*/),
                      (v18/*:: as any*/),
                      (v19/*:: as any*/),
                      (v20/*:: as any*/),
                      (v21/*:: as any*/),
                      (v22/*:: as any*/),
                      (v25/*:: as any*/),
                      (v26/*:: as any*/)
                    ],
                    "type": "PullRequest",
                    "abstractKey": null
                  },
                  (v6/*:: as any*/)
                ],
                "storageKey": null
              },
              (v27/*:: as any*/)
            ],
            "storageKey": null
          },
          (v28/*:: as any*/)
        ],
        "storageKey": "search(first:10,query:\"-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved sort:updated\",type:\"ISSUE\")"
      },
      {
        "alias": "reviewed",
        "args": (v2/*:: as any*/),
        "filters": (v29/*:: as any*/),
        "handle": "connection",
        "key": "reviewedPrList_reviewed",
        "kind": "LinkedHandle",
        "name": "search"
      },
      {
        "alias": "changesRequested",
        "args": (v30/*:: as any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchResultItemEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*:: as any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*:: as any*/),
                      (v15/*:: as any*/),
                      (v7/*:: as any*/),
                      (v8/*:: as any*/),
                      (v9/*:: as any*/),
                      (v10/*:: as any*/),
                      (v11/*:: as any*/),
                      (v12/*:: as any*/),
                      (v13/*:: as any*/),
                      (v14/*:: as any*/),
                      (v16/*:: as any*/),
                      (v17/*:: as any*/),
                      (v18/*:: as any*/),
                      (v19/*:: as any*/),
                      (v20/*:: as any*/),
                      (v21/*:: as any*/),
                      (v22/*:: as any*/),
                      (v25/*:: as any*/),
                      (v26/*:: as any*/)
                    ],
                    "type": "PullRequest",
                    "abstractKey": null
                  },
                  (v6/*:: as any*/)
                ],
                "storageKey": null
              },
              (v27/*:: as any*/)
            ],
            "storageKey": null
          },
          (v28/*:: as any*/)
        ],
        "storageKey": "search(first:10,query:\"-author:@me -is:draft is:open is:pr review-requested:@me sort:updated\",type:\"ISSUE\")"
      },
      {
        "alias": "changesRequested",
        "args": (v30/*:: as any*/),
        "filters": (v29/*:: as any*/),
        "handle": "connection",
        "key": "reviewedPrList_changesRequested",
        "kind": "LinkedHandle",
        "name": "search"
      }
    ]
  },
  "params": {
    "cacheID": "215645a3ff59624e2c5c12ae3edeeee5",
    "id": null,
    "metadata": {},
    "name": "reviewedPrListQuery",
    "operationKind": "query",
    "text": "query reviewedPrListQuery {\n  ...reviewedPrList_reviewed\n  ...reviewedPrList_changesRequested\n}\n\nfragment prStatus_pullRequest on PullRequest {\n  isDraft\n  isInMergeQueue\n  merged\n  reviewDecision\n  statusCheckRollup {\n    state\n    id\n  }\n}\n\nfragment pr_pullRequest on PullRequest {\n  author {\n    __typename\n    avatarUrl\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  additions\n  changedFiles\n  deletions\n  mergedAt\n  number\n  permalink\n  repository {\n    nameWithOwner\n    id\n  }\n  reviewDecision\n  title\n  totalCommentsCount\n  updatedAt\n  ...prStatus_pullRequest\n  ...reviewerAvatars_pullRequest\n}\n\nfragment reviewedPrList_changesRequested on Query {\n  changesRequested: search(query: \"-author:@me -is:draft is:open is:pr review-requested:@me sort:updated\", type: ISSUE, first: 10) {\n    edges {\n      node {\n        __typename\n        ... on PullRequest {\n          id\n          reviewDecision\n          ...pr_pullRequest\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment reviewedPrList_reviewed on Query {\n  reviewed: search(query: \"-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved sort:updated\", type: ISSUE, first: 10) {\n    edges {\n      node {\n        __typename\n        ... on PullRequest {\n          id\n          ...pr_pullRequest\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment reviewerAvatars_pullRequest on PullRequest {\n  author {\n    __typename\n    avatarUrl\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  reviewRequests(first: 10) {\n    nodes {\n      requestedReviewer {\n        __typename\n        ... on User {\n          avatarUrl\n        }\n        ... on Team {\n          teamAvatarUrl: avatarUrl\n        }\n        ... on Bot {\n          avatarUrl\n        }\n        ... on Mannequin {\n          avatarUrl\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n  }\n  reviews(first: 10) {\n    nodes {\n      author {\n        __typename\n        avatarUrl\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e9455001f568bda903e7bbf9a367d9cb";

export default node;
