/**
 * @generated SignedSource<<b6a3df0e375a202bc4df4ba85595a9e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupplierFragments_supplier$data = {
  readonly address: string | null | undefined;
  readonly contact_person: string | null | undefined;
  readonly email: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly phone: string | null | undefined;
  readonly " $fragmentType": "SupplierFragments_supplier";
};
export type SupplierFragments_supplier$key = {
  readonly " $data"?: SupplierFragments_supplier$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupplierFragments_supplier",
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
    }
  ],
  "type": "Supplier",
  "abstractKey": null
};

(node as any).hash = "52b73eae496d67671abbe4d0f484601e";

export default node;
