/**
 * @generated SignedSource<<b9ea96d0eee75e8e9aee675f64ace1d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClientFragments_list$data = ReadonlyArray<{
  readonly address: string | null | undefined;
  readonly contact_person: string | null | undefined;
  readonly created_at: string | null | undefined;
  readonly email: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly phone: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "ClientFragments_list";
}>;
export type ClientFragments_list$key = ReadonlyArray<{
  readonly " $data"?: ClientFragments_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_list">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ClientFragments_list",
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
    }
  ],
  "type": "Client",
  "abstractKey": null
};

(node as any).hash = "9442ecd4f3c8e3faa9e0190e64dc7c20";

export default node;
