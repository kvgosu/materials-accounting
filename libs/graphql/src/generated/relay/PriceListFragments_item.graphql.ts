/**
 * @generated SignedSource<<0c52a43318ab25125f52fdc11d7db520>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListFragments_item$data = {
  readonly created_at: string | null | undefined;
  readonly date: string;
  readonly file_name: string | null | undefined;
  readonly id: string;
  readonly is_active: boolean;
  readonly supplier: {
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
  };
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "PriceListFragments_item";
};
export type PriceListFragments_item$key = {
  readonly " $data"?: PriceListFragments_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceListFragments_item",
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

(node as any).hash = "b24260bf0c12dfd62f0bdd0fee036ad2";

export default node;
