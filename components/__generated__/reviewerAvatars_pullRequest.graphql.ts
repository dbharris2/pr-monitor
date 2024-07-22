/**
 * @generated SignedSource<<484a4fb72ccaa627287defc7bf2dcad1>>
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
  readonly " $fragmentType": "reviewerAvatars_pullRequest";
};
export type reviewerAvatars_pullRequest$key = {
  readonly " $data"?: reviewerAvatars_pullRequest$data;
  readonly " $fragmentSpreads": FragmentRefs<"reviewerAvatars_pullRequest">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "reviewerAvatars_pullRequest",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 10
          }
        ],
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
                            "field": {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "avatarUrl",
                              "storageKey": null
                            },
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
    }
  ],
  "type": "PullRequest",
  "abstractKey": null
};

(node as any).hash = "3d138ef375649346132e1dffe1c4de77";

export default node;
