/**
 * @generated SignedSource<<a7518f22c67dc77ae28866490cf7ca20>>
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
  readonly " $fragmentType": "DebtFragments_debtTurnover";
};
export type DebtFragments_debtTurnover$key = {
  readonly " $data"?: DebtFragments_debtTurnover$data;
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtTurnover">;
};

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
  "metadata": null,
  "name": "DebtFragments_debtTurnover",
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

(node as any).hash = "dc557d50352cbd5688d0fd154b8cf13f";

export default node;
