/**
 * @generated SignedSource<<c146531a123afda0b7e9d9d3eba63629>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContractFragments_contractDetails$data = {
  readonly client: {
    readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
  };
  readonly created_at: string | null | undefined;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ContractFragments_contract">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContractFragments_contract"
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

(node as any).hash = "fc7e4ff9ee268a5b34bfcf8df55a5a78";

export default node;
