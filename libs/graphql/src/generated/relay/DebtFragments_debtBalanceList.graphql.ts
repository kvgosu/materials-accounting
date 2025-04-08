/**
 * @generated SignedSource<<9b0e61887f94f7806a113213a0aaf584>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type DebtDimension = "CLIENT_DEBT" | "SUPPLIER_DEBT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DebtFragments_debtBalanceList$data = ReadonlyArray<{
  readonly as_of_date: string;
  readonly balance: number;
  readonly client: {
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly dimension: DebtDimension;
  readonly id: string;
  readonly supplier: {
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly " $fragmentType": "DebtFragments_debtBalanceList";
}>;
export type DebtFragments_debtBalanceList$key = ReadonlyArray<{
  readonly " $data"?: DebtFragments_debtBalanceList$data;
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtBalanceList">;
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
  "name": "DebtFragments_debtBalanceList",
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
      "name": "balance",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "as_of_date",
      "storageKey": null
    }
  ],
  "type": "DebtBalance",
  "abstractKey": null
};
})();

(node as any).hash = "493c5329b73829cf3adb16bff924e537";

export default node;
