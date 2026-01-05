/**
 * @generated SignedSource<<0df8587f0a209db7232323cf26032db4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewedPrListQuery$variables = Record<PropertyKey, never>;
export type reviewedPrListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"reviewedPrList_search">;
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
v1 = [
  (v0/*: any*/),
  {
    "kind": "Literal",
    "name": "query",
    "value": "-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved sort:updated"
  },
  {
    "kind": "Literal",
    "name": "type",
    "value": "ISSUE"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = [
  (v0/*: any*/)
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
        "name": "reviewedPrList_search"
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
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v3/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "additions",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "changedFiles",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "deletions",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mergedAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "number",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "permalink",
                        "storageKey": null
                      },
                      {
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
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "reviewDecision",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "totalCommentsCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "updatedAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isDraft",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isInMergeQueue",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "merged",
                        "storageKey": null
                      },
                      {
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
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v7/*: any*/),
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
                                  (v2/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v4/*: any*/)
                                    ],
                                    "type": "User",
                                    "abstractKey": null
                                  },
                                  (v5/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "reviewRequests(first:10)"
                      },
                      {
                        "alias": null,
                        "args": (v7/*: any*/),
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
                              (v6/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "reviews(first:10)"
                      }
                    ],
                    "type": "PullRequest",
                    "abstractKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
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
          }
        ],
        "storageKey": "search(first:10,query:\"-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved sort:updated\",type:\"ISSUE\")"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "query",
          "type"
        ],
        "handle": "connection",
        "key": "reviewedPrList_search",
        "kind": "LinkedHandle",
        "name": "search"
      }
    ]
  },
  "params": {
    "cacheID": "54ff74c6d50493048183af380220ac7d",
    "id": null,
    "metadata": {},
    "name": "reviewedPrListQuery",
    "operationKind": "query",
    "text": "query reviewedPrListQuery {\n  ...reviewedPrList_search\n}\n\nfragment prStatus_pullRequest on PullRequest {\n  isDraft\n  isInMergeQueue\n  merged\n  reviewDecision\n  statusCheckRollup {\n    state\n    id\n  }\n}\n\nfragment pr_pullRequest on PullRequest {\n  author {\n    __typename\n    avatarUrl\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  additions\n  changedFiles\n  deletions\n  mergedAt\n  number\n  permalink\n  repository {\n    nameWithOwner\n    id\n  }\n  reviewDecision\n  title\n  totalCommentsCount\n  updatedAt\n  ...prStatus_pullRequest\n  ...reviewerAvatars_pullRequest\n}\n\nfragment reviewedPrList_search on Query {\n  search(query: \"-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved sort:updated\", type: ISSUE, first: 10) {\n    edges {\n      node {\n        __typename\n        ... on PullRequest {\n          id\n          ...pr_pullRequest\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment reviewerAvatars_pullRequest on PullRequest {\n  author {\n    __typename\n    avatarUrl\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  reviewRequests(first: 10) {\n    nodes {\n      requestedReviewer {\n        __typename\n        ... on User {\n          avatarUrl\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n  }\n  reviews(first: 10) {\n    nodes {\n      author {\n        __typename\n        avatarUrl\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5f0998dff0ec9796d2496d2b0f1583fa";

export default node;
