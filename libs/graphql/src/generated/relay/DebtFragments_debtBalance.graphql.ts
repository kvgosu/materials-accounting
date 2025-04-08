/**
 * @generated SignedSource<<2be7624c658ffbda17aa479a10bde3b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type DebtDimension = "CLIENT_DEBT" | "SUPPLIER_DEBT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DebtFragments_debtBalance$data = {
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
  readonly " $fragmentType": "DebtFragments_debtBalance";
};
export type DebtFragments_debtBalance$key = {
  readonly " $data"?: DebtFragments_debtBalance$data;
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtBalance">;
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
  "name": "DebtFragments_debtBalance",
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

(node as any).hash = "0f65c8a593d5d7a0ad869b03058620bf";

export default node;
