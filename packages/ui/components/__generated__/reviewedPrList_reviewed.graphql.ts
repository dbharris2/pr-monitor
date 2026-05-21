/**
 * @generated SignedSource<<64b5e9acea9535c94ded8b46950ebbfe>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewedPrList_reviewed$data = {
  readonly reviewed: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id?: string;
        readonly pr_pullRequest?: {
          readonly " $fragmentSpreads": FragmentRefs<"pr_pullRequest">;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "reviewedPrList_reviewed";
};
export type reviewedPrList_reviewed$key = {
  readonly " $data"?: reviewedPrList_reviewed$data;
  readonly " $fragmentSpreads": FragmentRefs<"reviewedPrList_reviewed">;
};

import ReviewedPrListPaginationQuery_graphql from './ReviewedPrListPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "reviewed"
];
return {
  "argumentDefinitions": [
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
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*:: as any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*:: as any*/)
      },
      "fragmentPathInResult": [],
      "operation": ReviewedPrListPaginationQuery_graphql
    }
  },
  "name": "reviewedPrList_reviewed",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": "reviewed",
        "args": [
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
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "__reviewedPrList_reviewed_connection",
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
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "fragment": {
                          "kind": "InlineFragment",
                          "selections": [
                            {
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "pr_pullRequest"
                            }
                          ],
                          "type": "PullRequest",
                          "abstractKey": null
                        },
                        "kind": "AliasedInlineFragmentSpread",
                        "name": "pr_pullRequest"
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
        "storageKey": "__reviewedPrList_reviewed_connection(query:\"-author:@me -is:draft is:open is:pr reviewed-by:@me -review:approved sort:updated\",type:\"ISSUE\")"
      },
      "action": "THROW"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "9d1a3d003e081b60888470ca40e84ab4";

export default node;
