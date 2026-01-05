/**
 * @generated SignedSource<<2c2b4017d1d7dee0c78f8445c7589b4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type PullRequestReviewDecision = "APPROVED" | "CHANGES_REQUESTED" | "REVIEW_REQUIRED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type pr_pullRequest$data = {
  readonly additions: number;
  readonly author: {
    readonly avatarUrl: any;
  } | null | undefined;
  readonly changedFiles: number;
  readonly deletions: number;
  readonly mergedAt: any | null | undefined;
  readonly number: number;
  readonly permalink: any;
  readonly repository: {
    readonly nameWithOwner: string;
  };
  readonly reviewDecision: PullRequestReviewDecision | null | undefined;
  readonly title: string;
  readonly totalCommentsCount: number | null | undefined;
  readonly updatedAt: any;
  readonly " $fragmentSpreads": FragmentRefs<"prStatus_pullRequest" | "reviewerAvatars_pullRequest">;
  readonly " $fragmentType": "pr_pullRequest";
};
export type pr_pullRequest$key = {
  readonly " $data"?: pr_pullRequest$data;
  readonly " $fragmentSpreads": FragmentRefs<"pr_pullRequest">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "pr_pullRequest",
  "selections": [
    {
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
          "name": "avatarUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "additions",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "changedFiles",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deletions",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mergedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "number",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "permalink",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Repository",
      "kind": "LinkedField",
      "name": "repository",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "nameWithOwner",
          "storageKey": null
        }
      ],
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
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCommentsCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "prStatus_pullRequest"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "reviewerAvatars_pullRequest"
    }
  ],
  "type": "PullRequest",
  "abstractKey": null
};

(node as any).hash = "e5865e7f4415da47a679ca9cfbaffb94";

export default node;
