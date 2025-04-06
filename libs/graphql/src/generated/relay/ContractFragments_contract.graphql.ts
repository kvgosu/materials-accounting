/**
 * @generated SignedSource<<b2a50d89ad35fe8d6bc380e3e202380c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ContractStatus = "ACTIVE" | "INACTIVE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ContractFragments_contract$data = {
  readonly date: string;
  readonly expiration_date: string | null | undefined;
  readonly id: string;
  readonly markup_percentage: number;
  readonly number: string;
  readonly status: ContractStatus;
  readonly " $fragmentType": "ContractFragments_contract";
};
export type ContractFragments_contract$key = {
  readonly " $data"?: ContractFragments_contract$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContractFragments_contract">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContractFragments_contract",
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
    }
  ],
  "type": "Contract",
  "abstractKey": null
};

(node as any).hash = "768b0d410df41e14904c6bf3641679b4";

export default node;
