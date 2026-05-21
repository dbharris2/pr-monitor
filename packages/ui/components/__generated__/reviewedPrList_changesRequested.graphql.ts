/**
 * @generated SignedSource<<89ce679fdbc1e16ababe8b8833c4609a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type PullRequestReviewDecision = "APPROVED" | "CHANGES_REQUESTED" | "REVIEW_REQUIRED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type reviewedPrList_changesRequested$data = {
  readonly changesRequested: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id?: string;
        readonly reviewDecision?: PullRequestReviewDecision | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"pr_pullRequest">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "reviewedPrList_changesRequested";
};
export type reviewedPrList_changesRequested$key = {
  readonly " $data"?: reviewedPrList_changesRequested$data;
  readonly " $fragmentSpreads": FragmentRefs<"reviewedPrList_changesRequested">;
};

import ReviewedPrListChangesRequestedPaginationQuery_graphql from './ReviewedPrListChangesRequestedPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "changesRequested"
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
      "operation": ReviewedPrListChangesRequestedPaginationQuery_graphql
    }
  },
  "name": "reviewedPrList_changesRequested",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": "changesRequested",
        "args": [
          {
            "kind": "Literal",
            "name": "query",
            "value": "-author:@me -is:draft is:open is:pr review-requested:@me sort:updated"
          },
          {
            "kind": "Literal",
            "name": "type",
            "value": "ISSUE"
          }
        ],
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "__reviewedPrList_changesRequested_connection",
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "reviewDecision",
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
        "storageKey": "__reviewedPrList_changesRequested_connection(query:\"-author:@me -is:draft is:open is:pr review-requested:@me sort:updated\",type:\"ISSUE\")"
      },
      "action": "THROW"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "e5f626be75366815c23fcf78887dd5e1";

export default node;
