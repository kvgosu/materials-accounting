/**
 * @generated SignedSource<<f12645e803fe320778a9e441c5e0ccd5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ContractStatus = "ACTIVE" | "INACTIVE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ContractFragments_contractDetails$data = {
  readonly client: {
    readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_clientDetails">;
  };
  readonly created_at: string | null | undefined;
  readonly date: string;
  readonly expiration_date: string | null | undefined;
  readonly id: string;
  readonly markup_percentage: number;
  readonly number: string;
  readonly status: ContractStatus;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "ContractFragments_contractDetails";
};
export type ContractFragments_contractDetails$key = {
  readonly " $data"?: ContractFragments_contractDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContractFragments_contractDetails">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContractFragments_contractDetails",
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
      "name": "status",
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
          "name": "ClientFragments_clientDetails"
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

(node as any).hash = "51f431781fe8ed4d9761b764979dbc81";

export default node;
