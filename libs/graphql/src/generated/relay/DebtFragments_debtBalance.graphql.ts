/**
 * @generated SignedSource<<64d73bf7204d3235cdb7af9d10659736>>
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
    readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
  } | null | undefined;
  readonly dimension: DebtDimension;
  readonly id: string;
  readonly supplier: {
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
  } | null | undefined;
  readonly " $fragmentType": "DebtFragments_debtBalance";
};
export type DebtFragments_debtBalance$key = {
  readonly " $data"?: DebtFragments_debtBalance$data;
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtBalance">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DebtFragments_debtBalance",
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

(node as any).hash = "0de2507a68de3f0d10632e6eb32d242c";

export default node;
