/**
 * @generated SignedSource<<7036560c5dd92987819eabc9a8ff44db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type orgPrTableQuery$variables = {
  query: string;
};
export type orgPrTableQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"orgPrTable_search">;
};
export type orgPrTableQuery = {
  response: orgPrTableQuery$data;
  variables: orgPrTableQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
    "kind": "Literal",
    "name": "first",
    "value": 100
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
    "name": "orgPrTableQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "orgPrTable_search"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "orgPrTableQuery",
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
        "key": "orgPrTable_search",
        "kind": "LinkedHandle",
        "name": "search"
      }
    ]
  },
  "params": {
    "cacheID": "afa1c885c368ed232b03d0f36a2691e1",
    "id": null,
    "metadata": {},
    "name": "orgPrTableQuery",
    "operationKind": "query",
    "text": "query orgPrTableQuery(\n  $query: String!\n) {\n  ...orgPrTable_search_1Qr5xf\n}\n\nfragment orgPrTable_search_1Qr5xf on Query {\n  search(query: $query, type: ISSUE, first: 100) {\n    edges {\n      node {\n        __typename\n        ... on PullRequest {\n          author {\n            __typename\n            login\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n          comments(first: 10) {\n            edges {\n              node {\n                author {\n                  __typename\n                  login\n                  ... on Node {\n                    __isNode: __typename\n                    id\n                  }\n                }\n                id\n              }\n            }\n          }\n          reviews(first: 10, states: [APPROVED, CHANGES_REQUESTED]) {\n            edges {\n              node {\n                author {\n                  __typename\n                  login\n                  ... on Node {\n                    __isNode: __typename\n                    id\n                  }\n                }\n                id\n              }\n            }\n          }\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "95fe64b318fce38979e161c7ee31ca60";

export default node;
