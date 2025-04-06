/**
 * @generated SignedSource<<3d6e28720f094a7833473168b6013d32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClientFragments_clientDetails$data = {
  readonly created_at: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
  readonly " $fragmentType": "ClientFragments_clientDetails";
};
export type ClientFragments_clientDetails$key = {
  readonly " $data"?: ClientFragments_clientDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_clientDetails">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClientFragments_clientDetails",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClientFragments_client"
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
  "type": "Client",
  "abstractKey": null
};

(node as any).hash = "285adb905827d57dc56693ddbf3d6052";

export default node;
