/**
 * @generated SignedSource<<64ba0564dc84c4674682d57186ee2483>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type mentionedPrList_search$data = {
  readonly search: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id?: string;
        readonly pr_pullRequest?: {
          readonly " $fragmentSpreads": FragmentRefs<"pr_pullRequest">;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "mentionedPrList_search";
};
export type mentionedPrList_search$key = {
  readonly " $data"?: mentionedPrList_search$data;
  readonly " $fragmentSpreads": FragmentRefs<"mentionedPrList_search">;
};

import MentionedPrListPaginationQuery_graphql from './MentionedPrListPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "search"
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
      "operation": MentionedPrListPaginationQuery_graphql
    }
  },
  "name": "mentionedPrList_search",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": "search",
        "args": [
          {
            "kind": "Literal",
            "name": "query",
            "value": "-author:@me is:open is:pr -review-requested:@me mentions:@me sort:updated"
          },
          {
            "kind": "Literal",
            "name": "type",
            "value": "ISSUE"
          }
        ],
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "__mentionedPrList_search_connection",
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
        "storageKey": "__mentionedPrList_search_connection(query:\"-author:@me is:open is:pr -review-requested:@me mentions:@me sort:updated\",type:\"ISSUE\")"
      },
      "action": "THROW"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "86f4199fc922228f199f9672a95366d5";

export default node;
