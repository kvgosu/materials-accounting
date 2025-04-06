/**
 * @generated SignedSource<<f7e6b8980d543a79b54cd25ecfdbc83d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type DebtDimension = "CLIENT_DEBT" | "SUPPLIER_DEBT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DebtFragments_debtTurnoverList$data = ReadonlyArray<{
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
  readonly " $fragmentType": "DebtFragments_debtTurnoverList";
}>;
export type DebtFragments_debtTurnoverList$key = ReadonlyArray<{
  readonly " $data"?: DebtFragments_debtTurnoverList$data;
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtTurnoverList">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "DebtFragments_debtTurnoverList",
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

(node as any).hash = "2c71873d883a444d83fbacb115837548";

export default node;
