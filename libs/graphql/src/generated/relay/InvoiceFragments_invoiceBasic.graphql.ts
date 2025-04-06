/**
 * @generated SignedSource<<014b5b966e81170d4219d32ce3c416ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type InvoiceStatus = "CLOSED" | "CREATED" | "PROCESSED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type InvoiceFragments_invoiceBasic$data = {
  readonly date: string;
  readonly id: string;
  readonly number: string;
  readonly status: InvoiceStatus;
  readonly total_amount: number;
  readonly total_with_markup: number;
  readonly " $fragmentType": "InvoiceFragments_invoiceBasic";
};
export type InvoiceFragments_invoiceBasic$key = {
  readonly " $data"?: InvoiceFragments_invoiceBasic$data;
  readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_invoiceBasic">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InvoiceFragments_invoiceBasic",
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
      "name": "number",
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
      "name": "total_amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "total_with_markup",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "Invoice",
  "abstractKey": null
};

(node as any).hash = "29c53c9c7289fd7b0a0f8d033b41d04b";

export default node;
