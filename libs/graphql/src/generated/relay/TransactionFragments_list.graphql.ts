/**
 * @generated SignedSource<<f265fe77ae0dae4771f3ae74f2572de4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TransactionType = "CLIENT_DEBT" | "CLIENT_PAYMENT" | "SUPPLIER_DEBT" | "SUPPLIER_PAYMENT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TransactionFragments_list$data = ReadonlyArray<{
  readonly amount: number;
  readonly client: {
    readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
  } | null | undefined;
  readonly created_at: string | null | undefined;
  readonly date: string;
  readonly description: string | null | undefined;
  readonly id: string;
  readonly supplier: {
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
  } | null | undefined;
  readonly type: TransactionType;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "TransactionFragments_list";
}>;
export type TransactionFragments_list$key = ReadonlyArray<{
  readonly " $data"?: TransactionFragments_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"TransactionFragments_list">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "TransactionFragments_list",
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
      "name": "type",
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
      "name": "date",
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
      "concreteType": "Client",
      "kind": "LinkedField",
      "name": "client",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClientFragments_client"
        }
      ],
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
    }
  ],
  "type": "Transaction",
  "abstractKey": null
};

(node as any).hash = "231274e6a6a4ce3e4ecc18f8f32ac145";

export default node;
