/**
 * @generated SignedSource<<9a9a8f95c95f095b93849b8fab2c9f4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrgPrListPaginationQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  query: string;
};
export type OrgPrListPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"orgPrList_search">;
};
export type OrgPrListPaginationQuery = {
  response: OrgPrListPaginationQuery$data;
  variables: OrgPrListPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 100,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "query"
  }
],
v1 = {
  "kind": "Variable",
  "name": "query",
  "variableName": "query"
},
v2 = [
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
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "type",
    "value": "ISSUE"
  }
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
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
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
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "login",
      "storageKey": null
    },
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v8 = [
  (v6/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrgPrListPaginationQuery",
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
          },
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "orgPrList_search"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrgPrListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          (v7/*: any*/)
                        ],
                        "concreteType": "IssueCommentConnection",
                        "kind": "LinkedField",
                        "name": "comments",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "IssueCommentEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "IssueComment",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "comments(first:10)"
                      },
                      {
                        "alias": null,
                        "args": [
                          (v7/*: any*/),
                          {
                            "kind": "Literal",
                            "name": "states",
                            "value": [
                              "APPROVED",
                              "CHANGES_REQUESTED"
                            ]
                          }
                        ],
                        "concreteType": "PullRequestReviewConnection",
                        "kind": "LinkedField",
                        "name": "reviews",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PullRequestReviewEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "PullRequestReview",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "reviews(first:10,states:[\"APPROVED\",\"CHANGES_REQUESTED\"])"
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
        "args": (v2/*: any*/),
        "filters": [
          "query",
          "type"
        ],
        "handle": "connection",
        "key": "orgPrList_search",
        "kind": "LinkedHandle",
        "name": "search"
      }
    ]
  },
  "params": {
    "cacheID": "f69a10b27afce2618f104c034e44c52e",
    "id": null,
    "metadata": {},
    "name": "OrgPrListPaginationQuery",
    "operationKind": "query",
    "text": "query OrgPrListPaginationQuery(\n  $count: Int = 100\n  $cursor: String\n  $query: String!\n) {\n  ...orgPrList_search_1jWD3d\n}\n\nfragment orgPrList_search_1jWD3d on Query {\n  search(query: $query, type: ISSUE, first: $count, after: $cursor) {\n    edges {\n      node {\n        __typename\n        ... on PullRequest {\n          author {\n            __typename\n            login\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n          comments(first: 10) {\n            edges {\n              node {\n                author {\n                  __typename\n                  login\n                  ... on Node {\n                    __isNode: __typename\n                    id\n                  }\n                }\n                id\n              }\n            }\n          }\n          reviews(first: 10, states: [APPROVED, CHANGES_REQUESTED]) {\n            edges {\n              node {\n                author {\n                  __typename\n                  login\n                  ... on Node {\n                    __isNode: __typename\n                    id\n                  }\n                }\n                id\n              }\n            }\n          }\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e7c215a1f317412e7640e376d20ad62c";

export default node;
