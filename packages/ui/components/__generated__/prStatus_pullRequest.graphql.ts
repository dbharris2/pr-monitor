/**
 * @generated SignedSource<<8d646613bf0166eba403111cbba16ecb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type PullRequestReviewDecision = "APPROVED" | "CHANGES_REQUESTED" | "REVIEW_REQUIRED" | "%future added value";
export type StatusState = "ERROR" | "EXPECTED" | "FAILURE" | "PENDING" | "SUCCESS" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type prStatus_pullRequest$data = {
  readonly isDraft: boolean;
  readonly isInMergeQueue: boolean;
  readonly merged: boolean;
  readonly reviewDecision: PullRequestReviewDecision | null | undefined;
  readonly statusCheckRollup: {
    readonly state: StatusState;
  } | null | undefined;
  readonly " $fragmentType": "prStatus_pullRequest";
};
export type prStatus_pullRequest$key = {
  readonly " $data"?: prStatus_pullRequest$data;
  readonly " $fragmentSpreads": FragmentRefs<"prStatus_pullRequest">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "prStatus_pullRequest",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDraft",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isInMergeQueue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "merged",
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
      "alias": null,
      "args": null,
      "concreteType": "StatusCheckRollup",
      "kind": "LinkedField",
      "name": "statusCheckRollup",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "state",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PullRequest",
  "abstractKey": null
};

(node as any).hash = "f2e5c8ba86779bc26d591ad2a988f420";

export default node;
