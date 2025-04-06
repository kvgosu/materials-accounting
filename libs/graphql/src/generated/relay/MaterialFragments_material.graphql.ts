/**
 * @generated SignedSource<<14ee749bb3bf6894151c2ea77011769a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MaterialFragments_material$data = {
  readonly description: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly unit: string;
  readonly " $fragmentType": "MaterialFragments_material";
};
export type MaterialFragments_material$key = {
  readonly " $data"?: MaterialFragments_material$data;
  readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_material">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MaterialFragments_material",
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
    }
  ],
  "type": "Material",
  "abstractKey": null
};

(node as any).hash = "54089e522a1bf629d877b67a702c246b";

export default node;
