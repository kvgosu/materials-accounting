/**
 * @generated SignedSource<<f395bf55b01f1703490a4dcfb27d155e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListFragments_priceListItemDetails$data = {
  readonly material: {
    readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_material">;
  } | null | undefined;
  readonly price_list: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceList">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceListItem">;
  readonly " $fragmentType": "PriceListFragments_priceListItemDetails";
};
export type PriceListFragments_priceListItemDetails$key = {
  readonly " $data"?: PriceListFragments_priceListItemDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceListItemDetails">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceListFragments_priceListItemDetails",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PriceListFragments_priceListItem"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SupplierPriceList",
      "kind": "LinkedField",
      "name": "price_list",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PriceListFragments_priceList"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Material",
      "kind": "LinkedField",
      "name": "material",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MaterialFragments_material"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PriceListItem",
  "abstractKey": null
};

(node as any).hash = "26298b0eb089a2970e8a31fe212fbe23";

export default node;
