/**
 * @generated SignedSource<<e96c147d5c9633a6a10df221723e95cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupplierFragments_supplierDetails$data = {
  readonly created_at: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupplierFragments_supplier"
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
  "type": "Supplier",
  "abstractKey": null
};

(node as any).hash = "2cc8f2b0b48faaff8a7d64231ffebaaf";

export default node;
