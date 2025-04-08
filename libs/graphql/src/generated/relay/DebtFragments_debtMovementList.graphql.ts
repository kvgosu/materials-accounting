/**
 * @generated SignedSource<<42ce4557ac795e4c8d0d338c57b0741c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DebtFragments_debtMovementList$data = ReadonlyArray<{
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtMovement">;
  readonly " $fragmentType": "DebtFragments_debtMovementList";
}>;
export type DebtFragments_debtMovementList$key = ReadonlyArray<{
  readonly " $data"?: DebtFragments_debtMovementList$data;
  readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtMovementList">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "DebtFragments_debtMovementList",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DebtFragments_debtMovement"
    }
  ],
  "type": "DebtMovement",
  "abstractKey": null
};

(node as any).hash = "7fa69ce059525371c46d403203fbb349";

export default node;
