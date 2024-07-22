/**
 * @generated SignedSource<<3f1a17b5594dcd3eb2a0e74c17673f22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReviewedPrListPaginationQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
};
export type ReviewedPrListPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"reviewedPrList_search">;
};
export type ReviewedPrListPaginationQuery = {
  response: ReviewedPrListPaginationQuery$data;
  variables: ReviewedPrListPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  {
    "kind": "Literal",
    "name": "query",
    "value": "-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ReviewedPrListPaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          }
        ],
        "kind": "FragmentSpread",
        "name": "reviewedPrList_search"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ReviewedPrListPaginationQuery",
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
                      {
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
                        "concreteType": "Repository",
                        "kind": "LinkedField",
                        "name": "repository",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "owner",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "login",
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
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
                        "name": "merged",
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
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 10
                          }
                        ],
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
        "storageKey": null
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
    "cacheID": "e9eab1e758285ce97f5b9a666066d5ef",
    "id": null,
    "metadata": {},
    "name": "ReviewedPrListPaginationQuery",
    "operationKind": "query",
    "text": "query ReviewedPrListPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n) {\n  ...reviewedPrList_search_1G22uz\n}\n\nfragment prStatus_pullRequest on PullRequest {\n  isDraft\n  reviewDecision\n  merged\n  statusCheckRollup {\n    state\n    id\n  }\n}\n\nfragment pr_pullRequest on PullRequest {\n  author {\n    __typename\n    avatarUrl\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  additions\n  changedFiles\n  deletions\n  repository {\n    owner {\n      __typename\n      login\n      id\n    }\n    id\n  }\n  merged\n  number\n  permalink\n  reviewDecision\n  title\n  totalCommentsCount\n  updatedAt\n  ...prStatus_pullRequest\n  ...reviewerAvatars_pullRequest\n}\n\nfragment reviewedPrList_search_1G22uz on Query {\n  search(query: \"-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved\", type: ISSUE, first: $count, after: $cursor) {\n    edges {\n      node {\n        __typename\n        ... on PullRequest {\n          id\n          ...pr_pullRequest\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment reviewerAvatars_pullRequest on PullRequest {\n  reviewRequests(first: 10) {\n    nodes {\n      requestedReviewer {\n        __typename\n        ... on User {\n          avatarUrl\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1e4d97b097ae75a0b44f57ef0632e6ef";

export default node;
