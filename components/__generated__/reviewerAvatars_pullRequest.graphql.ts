/**
 * @generated SignedSource<<82fd72bd157df8c4f92615783e04e35e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewerAvatars_pullRequest$data = {
  readonly reviewRequests: {
    readonly nodes: ReadonlyArray<{
      readonly requestedReviewer: {
        readonly avatarUrl?: any;
      };
    } | null | undefined>;
  };
  readonly reviews: {
    readonly nodes: ReadonlyArray<{
      readonly author: {
        readonly avatarUrl: any;
      } | null | undefined;
    } | null | undefined>;
  } | null | undefined;
  readonly " $fragmentType": "reviewerAvatars_pullRequest";
};
export type reviewerAvatars_pullRequest$key = {
  readonly " $data"?: reviewerAvatars_pullRequest$data;
  readonly " $fragmentSpreads": FragmentRefs<"reviewerAvatars_pullRequest">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "reviewerAvatars_pullRequest",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ReviewRequestConnection",
        "kind": "LinkedField",
        "name": "reviewRequests",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "concreteType": "ReviewRequest",
              "kind": "LinkedField",
              "name": "nodes",
              "plural": true,
              "selections": [
                {
                  "kind": "RequiredField",
                  "field": {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "requestedReviewer",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "kind": "RequiredField",
                            "field": (v1/*: any*/),
                            "action": "THROW",
                            "path": "reviewRequests.nodes.requestedReviewer.avatarUrl"
                          }
                        ],
                        "type": "User",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  "action": "THROW",
                  "path": "reviewRequests.nodes.requestedReviewer"
                }
              ],
              "storageKey": null
            },
            "action": "THROW",
            "path": "reviewRequests.nodes"
          }
        ],
        "storageKey": "reviewRequests(first:10)"
      },
      "action": "THROW",
      "path": "reviewRequests"
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "PullRequestReviewConnection",
      "kind": "LinkedField",
      "name": "reviews",
      "plural": false,
      "selections": [
        {
          "kind": "RequiredField",
          "field": {
            "alias": null,
            "args": null,
            "concreteType": "PullRequestReview",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "author",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          "action": "THROW",
          "path": "reviews.nodes"
        }
      ],
      "storageKey": "reviews(first:10)"
    }
  ],
  "type": "PullRequest",
  "abstractKey": null
};
})();

(node as any).hash = "9803debb3341fe1558bdd5f397b26706";

export default node;
