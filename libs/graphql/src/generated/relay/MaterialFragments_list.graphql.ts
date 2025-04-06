/**
 * @generated SignedSource<<e382027a4f05509efa8541d2e0972a3e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MaterialFragments_list$data = ReadonlyArray<{
  readonly created_at: string | null | undefined;
  readonly description: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly unit: string;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "MaterialFragments_list";
}>;
export type MaterialFragments_list$key = ReadonlyArray<{
  readonly " $data"?: MaterialFragments_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_list">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "MaterialFragments_list",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "created_at",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updated_at",
      "storageKey": null
    }
  ],
  "type": "Material",
  "abstractKey": null
};

(node as any).hash = "e70c9fdf0ecdda0e5289ff2b3ddf0452";

export default node;
