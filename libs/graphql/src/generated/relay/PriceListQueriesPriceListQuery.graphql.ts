/**
 * @generated SignedSource<<fde51a4d07100b79a4023ca73b63afbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListQueriesPriceListQuery$variables = {
  id: string;
};
export type PriceListQueriesPriceListQuery$data = {
  readonly price_list: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceListDetails">;
  } | null | undefined;
};
export type PriceListQueriesPriceListQuery = {
  response: PriceListQueriesPriceListQuery$data;
  variables: PriceListQueriesPriceListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PriceListQueriesPriceListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SupplierPriceList",
        "kind": "LinkedField",
        "name": "price_list",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PriceListFragments_priceListDetails"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PriceListQueriesPriceListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SupplierPriceList",
        "kind": "LinkedField",
        "name": "price_list",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Supplier",
            "kind": "LinkedField",
            "name": "supplier",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ce923b511df39c3f6935145ba7344357",
    "id": null,
    "metadata": {},
    "name": "PriceListQueriesPriceListQuery",
    "operationKind": "query",
    "text": "query PriceListQueriesPriceListQuery(\n  $id: ID!\n) {\n  price_list(id: $id) {\n    ...PriceListFragments_priceListDetails\n    id\n  }\n}\n\nfragment PriceListFragments_priceList on SupplierPriceList {\n  id\n  date\n  file_name\n  is_active\n  created_at\n  updated_at\n}\n\nfragment PriceListFragments_priceListDetails on SupplierPriceList {\n  ...PriceListFragments_priceList\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n"
  }
};
})();

(node as any).hash = "6937379930ef069ae7c5588458c97f2d";

export default node;
