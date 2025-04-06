/**
 * @generated SignedSource<<540f03b3849c81b0af0a14af022144bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MaterialFragments_materialDetails$data = {
  readonly created_at: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_material">;
  readonly " $fragmentType": "MaterialFragments_materialDetails";
};
export type MaterialFragments_materialDetails$key = {
  readonly " $data"?: MaterialFragments_materialDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_materialDetails">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MaterialFragments_materialDetails",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MaterialFragments_material"
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

(node as any).hash = "53cc806f4ee887b576a49e80c32cdf53";

export default node;
