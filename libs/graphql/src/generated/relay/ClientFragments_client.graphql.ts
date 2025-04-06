/**
 * @generated SignedSource<<87b707290d56ed4d46c509921add3dc0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClientFragments_client$data = {
  readonly address: string | null | undefined;
  readonly contact_person: string | null | undefined;
  readonly email: string | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly phone: string | null | undefined;
  readonly " $fragmentType": "ClientFragments_client";
};
export type ClientFragments_client$key = {
  readonly " $data"?: ClientFragments_client$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClientFragments_client",
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
  "type": "Client",
  "abstractKey": null
};

(node as any).hash = "f1335a320408712afa9c7fdeb3e83bf9";

export default node;
