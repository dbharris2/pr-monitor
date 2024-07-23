/**
 * @generated SignedSource<<8a1217a71737c74c93b797a004c2f1e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type orgPrList_search$data = {
  readonly search: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly author?: {
          readonly login: string;
        } | null | undefined;
        readonly comments?: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly author: {
                readonly login: string;
              } | null | undefined;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        };
        readonly reviews?: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly author: {
                readonly login: string;
              } | null | undefined;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined>;
  };
  readonly " $fragmentType": "orgPrList_search";
};
export type orgPrList_search$key = {
  readonly " $data"?: orgPrList_search$data;
  readonly " $fragmentSpreads": FragmentRefs<"orgPrList_search">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "search"
],
v1 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "login",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v2 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v3 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [
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
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./OrgPrListPaginationQuery.graphql')
    }
  },
  "name": "orgPrList_search",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": "search",
        "args": [
          {
            "kind": "Variable",
            "name": "query",
            "variableName": "query"
          },
          {
            "kind": "Literal",
            "name": "type",
            "value": "ISSUE"
          }
        ],
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "__orgPrList_search_connection",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": {
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
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        (v1/*: any*/),
                        {
                          "alias": null,
                          "args": [
                            (v2/*: any*/)
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
                                  "selections": (v3/*: any*/),
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
                            (v2/*: any*/),
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
                                  "selections": (v3/*: any*/),
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__typename",
                      "storageKey": null
                    }
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
            "action": "THROW",
            "path": "search.edges"
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
      "action": "THROW",
      "path": "search"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "e7c215a1f317412e7640e376d20ad62c";

export default node;
