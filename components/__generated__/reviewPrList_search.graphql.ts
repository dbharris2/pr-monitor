/**
 * @generated SignedSource<<c03b53feae9b27e98c1f551d72acfed3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewPrList_search$data = {
  readonly search: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id?: string;
        readonly " $fragmentSpreads": FragmentRefs<"pr_pullRequest">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "reviewPrList_search";
};
export type reviewPrList_search$key = {
  readonly " $data"?: reviewPrList_search$data;
  readonly " $fragmentSpreads": FragmentRefs<"reviewPrList_search">;
};

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
      "operation": require('./ReviewPrListPaginationQuery.graphql')
    }
  },
  "name": "reviewPrList_search",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": "search",
        "args": [
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
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "__reviewPrList_search_connection",
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
                        "args": null,
                        "kind": "FragmentSpread",
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
        "storageKey": "__reviewPrList_search_connection(query:\"-author:@me -is:draft is:open is:pr review-requested:@me -review:approved\",type:\"ISSUE\")"
      },
      "action": "THROW",
      "path": "search"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "591212d47282709bb447cb8bb2500646";

export default node;
