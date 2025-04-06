/**
 * @generated SignedSource<<2e7df3b042d02ad9049022ffa41859d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TransactionType = "CLIENT_DEBT" | "CLIENT_PAYMENT" | "SUPPLIER_DEBT" | "SUPPLIER_PAYMENT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TransactionFragments_transaction$data = {
  readonly amount: number;
  readonly date: string;
  readonly description: string | null | undefined;
  readonly id: string;
  readonly type: TransactionType;
  readonly " $fragmentType": "TransactionFragments_transaction";
};
export type TransactionFragments_transaction$key = {
  readonly " $data"?: TransactionFragments_transaction$data;
  readonly " $fragmentSpreads": FragmentRefs<"TransactionFragments_transaction">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TransactionFragments_transaction",
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
    }
  ],
  "type": "Transaction",
  "abstractKey": null
};

(node as any).hash = "c8dc7b9740fd32497f2fc3642da76644";

export default node;
