/**
 * @generated SignedSource<<7fe252e39fe517875870c691872e578b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClientFragments_clientDetails$data = {
  readonly address: string | null | undefined;
  readonly contact_person: string | null | undefined;
  readonly contracts: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ContractFragments_list">;
  }> | null | undefined;
  readonly created_at: string | null | undefined;
  readonly debt_balance: number | null | undefined;
  readonly email: string | null | undefined;
  readonly id: string;
  readonly invoices: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_listWithoutStatus">;
  }> | null | undefined;
  readonly name: string;
  readonly phone: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "ClientFragments_clientDetails";
};
export type ClientFragments_clientDetails$key = {
  readonly " $data"?: ClientFragments_clientDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_clientDetails">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClientFragments_clientDetails",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contact_person",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phone",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Contract",
      "kind": "LinkedField",
      "name": "contracts",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ContractFragments_list"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Invoice",
      "kind": "LinkedField",
      "name": "invoices",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "InvoiceFragments_listWithoutStatus"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "debt_balance",
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
  "type": "Client",
  "abstractKey": null
};

(node as any).hash = "d4701545d374efb4840ae7496fb3c4d4";

export default node;
