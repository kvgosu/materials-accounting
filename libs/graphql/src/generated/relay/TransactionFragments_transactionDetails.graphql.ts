/**
 * @generated SignedSource<<73885b52547b9fedd2b8e4f8621312a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TransactionFragments_transactionDetails$data = {
  readonly client: {
    readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
  } | null | undefined;
  readonly created_at: string | null | undefined;
  readonly supplier: {
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
  } | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"TransactionFragments_transaction">;
  readonly " $fragmentType": "TransactionFragments_transactionDetails";
};
export type TransactionFragments_transactionDetails$key = {
  readonly " $data"?: TransactionFragments_transactionDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"TransactionFragments_transactionDetails">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TransactionFragments_transactionDetails",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TransactionFragments_transaction"
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

(node as any).hash = "7418c2a2364fe40589399a8df7da5469";

export default node;
