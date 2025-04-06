/**
 * @generated SignedSource<<caca9831f0448d586333a04df3723ef5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListFragments_list$data = ReadonlyArray<{
  readonly created_at: string | null | undefined;
  readonly date: string;
  readonly file_name: string | null | undefined;
  readonly id: string;
  readonly is_active: boolean;
  readonly supplier: {
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
  };
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "PriceListFragments_list";
}>;
export type PriceListFragments_list$key = ReadonlyArray<{
  readonly " $data"?: PriceListFragments_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_list">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PriceListFragments_list",
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
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "file_name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "is_active",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Supplier",
      "kind": "LinkedField",
      "name": "supplier",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SupplierFragments_supplier"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SupplierPriceList",
  "abstractKey": null
};

(node as any).hash = "8aedbdc796b827bb03378f3cd0d7fc63";

export default node;
