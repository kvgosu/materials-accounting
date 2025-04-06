/**
 * @generated SignedSource<<fe7bcd359f71e4e0e608683bf810c385>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContractFragments_list$data = ReadonlyArray<{
  readonly client: {
    readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
  };
  readonly created_at: string | null | undefined;
  readonly date: string;
  readonly expiration_date: string | null | undefined;
  readonly id: string;
  readonly markup_percentage: number;
  readonly number: string;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "ContractFragments_list";
}>;
export type ContractFragments_list$key = ReadonlyArray<{
  readonly " $data"?: ContractFragments_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContractFragments_list">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ContractFragments_list",
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
      "name": "number",
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
      "name": "markup_percentage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "expiration_date",
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
  "type": "Contract",
  "abstractKey": null
};

(node as any).hash = "d5a683d47d33aa1e7f0972c4f3e684ae";

export default node;
