/**
 * @generated SignedSource<<903976f5bec9ed18798191c9c13c4bd8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoiceFragments_invoiceDetails$data = {
  readonly client: {
    readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
  };
  readonly contract: {
    readonly " $fragmentSpreads": FragmentRefs<"ContractFragments_contract">;
  };
  readonly created_at: string | null | undefined;
  readonly supplier: {
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
  };
  readonly updated_at: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_invoiceBasic">;
  readonly " $fragmentType": "InvoiceFragments_invoiceDetails";
};
export type InvoiceFragments_invoiceDetails$key = {
  readonly " $data"?: InvoiceFragments_invoiceDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_invoiceDetails">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InvoiceFragments_invoiceDetails",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "InvoiceFragments_invoiceBasic"
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
      "concreteType": "Supplier",
      "kind": "LinkedField",
      "name": "supplier",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SupplierFragments_supplier"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Contract",
      "kind": "LinkedField",
      "name": "contract",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ContractFragments_contract"
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
  "type": "Invoice",
  "abstractKey": null
};

(node as any).hash = "e57dd12c3662275cde68d4dd180281b8";

export default node;
