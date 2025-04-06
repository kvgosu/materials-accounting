/**
 * @generated SignedSource<<a601b4cc4093e04b8d798d41703a3532>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type DebtDimension = "CLIENT_DEBT" | "SUPPLIER_DEBT" | "%future added value";
export type DebtDirection = "CREDIT" | "DEBIT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DebtFragments_debtMovement$data = {
  readonly amount: number;
  readonly client: {
    readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
  } | null | undefined;
  readonly created_at: string;
  readonly dimension: DebtDimension;
  readonly direction: DebtDirection;
  readonly document_id: string;
  readonly document_type: string;
  readonly id: string;
  readonly period: string;
  readonly supplier: {
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
  } | null | undefined;
  readonly " $fragmentType": "DebtFragments_debtMovement";
};
export type DebtFragments_debtMovement$key = {
  readonly " $data"?: DebtFragments_debtMovement$data;
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtMovement">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DebtFragments_debtMovement",
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
      "name": "period",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "document_id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "document_type",
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
      "name": "direction",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dimension",
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
    }
  ],
  "type": "DebtMovement",
  "abstractKey": null
};

(node as any).hash = "1fd757e0c02ec335783ab3fd402983b4";

export default node;
