/**
 * @generated SignedSource<<6e18e4d43905d40f3427fec9017ad07f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListFragments_priceListItemList$data = ReadonlyArray<{
  readonly article: string | null | undefined;
  readonly availability: number;
  readonly barcode: string | null | undefined;
  readonly created_at: string | null | undefined;
  readonly description: string | null | undefined;
  readonly id: string;
  readonly material: {
    readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_material">;
  } | null | undefined;
  readonly name: string;
  readonly price: number;
  readonly supplier_code: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly vat_rate: number;
  readonly " $fragmentType": "PriceListFragments_priceListItemList";
}>;
export type PriceListFragments_priceListItemList$key = ReadonlyArray<{
  readonly " $data"?: PriceListFragments_priceListItemList$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceListItemList">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PriceListFragments_priceListItemList",
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
      "name": "supplier_code",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "barcode",
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
      "name": "article",
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
      "name": "vat_rate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "price",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "availability",
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

(node as any).hash = "77d55f5b34ff3bf590a77ee6af6ae517";

export default node;
