/**
 * @generated SignedSource<<9acc85958adf41e589da72c2ae64b5f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupplierFragments_list$data = ReadonlyArray<{
  readonly address: string | null | undefined;
  readonly contact_person: string | null | undefined;
  readonly created_at: string | null | undefined;
  readonly email: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly phone: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "SupplierFragments_list";
}>;
export type SupplierFragments_list$key = ReadonlyArray<{
  readonly " $data"?: SupplierFragments_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_list">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "SupplierFragments_list",
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
      "name": "contact_person",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phone",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address",
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
  "type": "Supplier",
  "abstractKey": null
};

(node as any).hash = "5ead6a0af9866e686f4d3039cd461b28";

export default node;
