/**
 * @generated SignedSource<<ed6b79b5a1f90a163e48adfd77e49071>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListFragments_currentMaterialPrice$data = {
  readonly availability: number;
  readonly created_at: string | null | undefined;
  readonly id: string;
  readonly material: {
    readonly description: string | null | undefined;
    readonly id: string;
    readonly name: string;
    readonly unit: string;
  } | null | undefined;
  readonly price: number;
  readonly price_list: {
    readonly date: string;
    readonly id: string;
    readonly is_active: boolean;
    readonly supplier: {
      readonly id: string;
      readonly name: string;
    };
  };
  readonly supplier_code: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly vat_rate: number;
  readonly " $fragmentType": "PriceListFragments_currentMaterialPrice";
};
export type PriceListFragments_currentMaterialPrice$key = {
  readonly " $data"?: PriceListFragments_currentMaterialPrice$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_currentMaterialPrice">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceListFragments_currentMaterialPrice",
  "selections": [
    (v0/*: any*/),
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
      "name": "vat_rate",
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
      "name": "supplier_code",
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
      "concreteType": "SupplierPriceList",
      "kind": "LinkedField",
      "name": "price_list",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
          "name": "is_active",
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
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": null
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
        (v0/*: any*/),
        (v1/*: any*/),
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
      "storageKey": null
    }
  ],
  "type": "PriceListItem",
  "abstractKey": null
};
})();

(node as any).hash = "980e160e57091b9d8393d3d21c1da6a8";

export default node;
