/**
 * @generated SignedSource<<7ca7f0fb46d406de6e004e3f7a1b31e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListFragments_priceList$data = {
  readonly created_at: string | null | undefined;
  readonly date: string;
  readonly file_name: string | null | undefined;
  readonly id: string;
  readonly is_active: boolean;
  readonly updated_at: string | null | undefined;
  readonly " $fragmentType": "PriceListFragments_priceList";
};
export type PriceListFragments_priceList$key = {
  readonly " $data"?: PriceListFragments_priceList$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceList">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceListFragments_priceList",
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
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "file_name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "is_active",
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
  "type": "SupplierPriceList",
  "abstractKey": null
};

(node as any).hash = "1ee9eefb735a5caf5898dac3ae880f4a";

export default node;
