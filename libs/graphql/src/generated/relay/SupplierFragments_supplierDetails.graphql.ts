/**
 * @generated SignedSource<<94468fd20afd19bff1454b91b96db4c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupplierFragments_supplierDetails$data = {
  readonly address: string | null | undefined;
  readonly contact_person: string | null | undefined;
  readonly created_at: string | null | undefined;
  readonly debt_balance: number | null | undefined;
  readonly email: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly phone: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "SupplierFragments_supplierDetails";
};
export type SupplierFragments_supplierDetails$key = {
  readonly " $data"?: SupplierFragments_supplierDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplierDetails">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupplierFragments_supplierDetails",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "debt_balance",
      "storageKey": null
    }
  ],
  "type": "Supplier",
  "abstractKey": null
};

(node as any).hash = "ad11fa3e74fbddd7527df1ec7d1d8c66";

export default node;
