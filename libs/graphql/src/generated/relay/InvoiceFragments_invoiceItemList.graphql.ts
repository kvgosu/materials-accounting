/**
 * @generated SignedSource<<d0781d7a30a3623310b120ece5e1c885>>
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

(node as any).hash = "7ad1085b663cdcef5fd5a6d987f9870a";

export default node;
