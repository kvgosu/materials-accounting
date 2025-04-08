/**
 * @generated SignedSource<<be85570485d32fe839e45af25a9f6547>>
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
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly credit: number;
  readonly debit: number;
  readonly dimension: DebtDimension;
  readonly end_date: string;
  readonly id: string;
  readonly start_date: string;
  readonly supplier: {
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly " $fragmentType": "DebtFragments_debtTurnoverList";
}>;
export type DebtFragments_debtTurnoverList$key = ReadonlyArray<{
  readonly " $data"?: DebtFragments_debtTurnoverList$data;
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtTurnoverList">;
}>;

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "DebtFragments_debtTurnoverList",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Client",
      "kind": "LinkedField",
      "name": "client",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Supplier",
      "kind": "LinkedField",
      "name": "supplier",
      "plural": false,
      "selections": (v1/*: any*/),
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
})();

(node as any).hash = "2422731727ba98a572b4497da37b9c98";

export default node;
