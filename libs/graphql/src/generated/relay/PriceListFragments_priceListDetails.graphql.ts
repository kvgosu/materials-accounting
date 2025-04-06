/**
 * @generated SignedSource<<3ab9eb29dbeb7ff82881540ba036802e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListFragments_priceListDetails$data = {
  readonly supplier: {
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceList">;
  readonly " $fragmentType": "PriceListFragments_priceListDetails";
};
export type PriceListFragments_priceListDetails$key = {
  readonly " $data"?: PriceListFragments_priceListDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceListDetails">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceListFragments_priceListDetails",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PriceListFragments_priceList"
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

(node as any).hash = "7617425ecb62d3561a60e08cf8cb1505";

export default node;
