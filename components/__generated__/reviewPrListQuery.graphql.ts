/**
 * @generated SignedSource<<f839e7c72d0c0b3ff21d248630bdfdfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewPrListQuery$variables = Record<PropertyKey, never>;
export type reviewPrListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"reviewPrList_search">;
};
export type reviewPrListQuery = {
  response: reviewPrListQuery$data;
  variables: reviewPrListQuery$variables;
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
    "value": "-author:@me -is:draft is:open is:pr review-requested:@me -review:approved"
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "reviewPrListQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "reviewPrList_search"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "reviewPrListQuery",
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
                          (v0/*: any*/)
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
        "storageKey": "search(first:10,query:\"-author:@me -is:draft is:open is:pr review-requested:@me -review:approved\",type:\"ISSUE\")"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "query",
          "type"
        ],
        "handle": "connection",
        "key": "reviewPrList_search",
        "kind": "LinkedHandle",
        "name": "search"
      }
    ]
  },
  "params": {
    "cacheID": "50dd165873b6c0835ddf6d2a1dd35463",
    "id": null,
    "metadata": {},
    "name": "reviewPrListQuery",
    "operationKind": "query",
    "text": "query reviewPrListQuery {\n  ...reviewPrList_search\n}\n\nfragment prStatus_pullRequest on PullRequest {\n  isDraft\n  reviewDecision\n  merged\n  statusCheckRollup {\n    state\n    id\n  }\n}\n\nfragment pr_pullRequest on PullRequest {\n  author {\n    __typename\n    avatarUrl\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  additions\n  changedFiles\n  deletions\n  repository {\n    owner {\n      __typename\n      login\n      id\n    }\n    id\n  }\n  merged\n  number\n  permalink\n  reviewDecision\n  title\n  totalCommentsCount\n  updatedAt\n  ...prStatus_pullRequest\n  ...reviewerAvatars_pullRequest\n}\n\nfragment reviewPrList_search on Query {\n  search(query: \"-author:@me -is:draft is:open is:pr review-requested:@me -review:approved\", type: ISSUE, first: 10) {\n    edges {\n      node {\n        __typename\n        ... on PullRequest {\n          id\n          ...pr_pullRequest\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment reviewerAvatars_pullRequest on PullRequest {\n  reviewRequests(first: 10) {\n    nodes {\n      requestedReviewer {\n        __typename\n        ... on User {\n          avatarUrl\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4c0eebab5942261328da0752979ea153";

export default node;
