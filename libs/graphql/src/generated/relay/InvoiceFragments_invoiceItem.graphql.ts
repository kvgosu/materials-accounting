/**
 * @generated SignedSource<<b3e7337894c163aa59eaa4fce0679cb0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoiceFragments_invoiceItem$data = {
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
  readonly " $fragmentType": "InvoiceFragments_invoiceItem";
};
export type InvoiceFragments_invoiceItem$key = {
  readonly " $data"?: InvoiceFragments_invoiceItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_invoiceItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InvoiceFragments_invoiceItem",
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

(node as any).hash = "ad239b0fe9629b456b402308e8cb0f36";

export default node;
