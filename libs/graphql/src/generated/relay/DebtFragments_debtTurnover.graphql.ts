/**
 * @generated SignedSource<<93416f59e463f5a1fb4a6250c4903bba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type DebtDimension = "CLIENT_DEBT" | "SUPPLIER_DEBT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DebtFragments_debtTurnover$data = {
  readonly balance: number;
  readonly client: {
    readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
  } | null | undefined;
  readonly credit: number;
  readonly debit: number;
  readonly dimension: DebtDimension;
  readonly end_date: string;
  readonly id: string;
  readonly start_date: string;
  readonly supplier: {
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
  } | null | undefined;
  readonly " $fragmentType": "DebtFragments_debtTurnover";
};
export type DebtFragments_debtTurnover$key = {
  readonly " $data"?: DebtFragments_debtTurnover$data;
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtTurnover">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DebtFragments_debtTurnover",
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
      "name": "dimension",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "debit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "credit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "balance",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "start_date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "end_date",
      "storageKey": null
    }
  ],
  "type": "DebtTurnover",
  "abstractKey": null
};

(node as any).hash = "7fc1a9b31b4684837bf9085d0d4d1081";

export default node;
