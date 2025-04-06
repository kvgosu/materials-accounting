/**
 * @generated SignedSource<<d5d48da4ce2081c3a74dc861b3471637>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoiceFragments_invoiceItemList$data = ReadonlyArray<{
  readonly amount: number;
  readonly amount_with_markup: number;
  readonly id: string;
  readonly material: {
    readonly name: string;
    readonly unit: string;
    readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_material">;
  };
  readonly price: number;
  readonly quantity: number;
  readonly " $fragmentType": "InvoiceFragments_invoiceItemList";
}>;
export type InvoiceFragments_invoiceItemList$key = ReadonlyArray<{
  readonly " $data"?: InvoiceFragments_invoiceItemList$data;
  readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_invoiceItemList">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "InvoiceFragments_invoiceItemList",
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
      "name": "quantity",
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
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount_with_markup",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "MaterialFragments_material"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "InvoiceItem",
  "abstractKey": null
};

(node as any).hash = "927dfe20fac787ba1d5cd4462a215c21";

export default node;
