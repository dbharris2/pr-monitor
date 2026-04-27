/**
 * @generated SignedSource<<8e40318c5485ef155ef05a81ce429907>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewerAvatars_pullRequest$data = {
  readonly author: {
    readonly avatarUrl: any;
  };
  readonly reviewRequests: {
    readonly nodes: ReadonlyArray<{
      readonly requestedReviewer: {
        readonly avatarUrl?: any;
        readonly teamAvatarUrl?: any | null | undefined;
      } | null | undefined;
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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "avatarUrl",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": (v0/*: any*/),
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "reviewerAvatars_pullRequest",
  "selections": [
    {
      "kind": "RequiredField",
      "field": (v1/*: any*/),
      "action": "THROW"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": (v2/*: any*/),
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
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "requestedReviewer",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "selections": (v0/*: any*/),
                      "type": "User",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": "teamAvatarUrl",
                          "args": null,
                          "kind": "ScalarField",
                          "name": "avatarUrl",
                          "storageKey": null
                        }
                      ],
                      "type": "Team",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": (v0/*: any*/),
                      "type": "Bot",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": (v0/*: any*/),
                      "type": "Mannequin",
                      "abstractKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            "action": "THROW"
          }
        ],
        "storageKey": "reviewRequests(first:10)"
      },
      "action": "THROW"
    },
    {
      "alias": null,
      "args": (v2/*: any*/),
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
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          "action": "THROW"
        }
      ],
      "storageKey": "reviews(first:10)"
    }
  ],
  "type": "PullRequest",
  "abstractKey": null
};
})();

(node as any).hash = "b864f7c53258dda8d90ca8088db6406d";

export default node;
