/**
 * @generated SignedSource<<ecae5423c713324d6cc5135d599114e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListQueriesQuery$variables = {
  date_from?: string | null | undefined;
  date_to?: string | null | undefined;
  is_active?: boolean | null | undefined;
  limit?: number | null | undefined;
  skip?: number | null | undefined;
  supplier_id?: string | null | undefined;
};
export type PriceListQueriesQuery$data = {
  readonly price_lists: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_list">;
  }>;
};
export type PriceListQueriesQuery = {
  response: PriceListQueriesQuery$data;
  variables: PriceListQueriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "date_from"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "date_to"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "is_active"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "supplier_id"
},
v6 = [
  {
    "kind": "Variable",
    "name": "date_from",
    "variableName": "date_from"
  },
  {
    "kind": "Variable",
    "name": "date_to",
    "variableName": "date_to"
  },
  {
    "kind": "Variable",
    "name": "is_active",
    "variableName": "is_active"
  },
  {
    "kind": "Variable",
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "skip",
    "variableName": "skip"
  },
  {
    "kind": "Variable",
    "name": "supplier_id",
    "variableName": "supplier_id"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PriceListQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "SupplierPriceList",
        "kind": "LinkedField",
        "name": "price_lists",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PriceListFragments_list"
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
    "argumentDefinitions": [
      (v4/*: any*/),
      (v3/*: any*/),
      (v5/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "PriceListQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "SupplierPriceList",
        "kind": "LinkedField",
        "name": "price_lists",
        "plural": true,
        "selections": [
          (v7/*: any*/),
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
              (v7/*: any*/),
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
    "cacheID": "3169a480d16faa89723aae028c4834c5",
    "id": null,
    "metadata": {},
    "name": "PriceListQueriesQuery",
    "operationKind": "query",
    "text": "query PriceListQueriesQuery(\n  $skip: Int\n  $limit: Int\n  $supplier_id: ID\n  $is_active: Boolean\n  $date_from: String\n  $date_to: String\n) {\n  price_lists(skip: $skip, limit: $limit, supplier_id: $supplier_id, is_active: $is_active, date_from: $date_from, date_to: $date_to) {\n    ...PriceListFragments_list\n    id\n  }\n}\n\nfragment PriceListFragments_list on SupplierPriceList {\n  id\n  date\n  file_name\n  is_active\n  created_at\n  updated_at\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n"
  }
};
})();

(node as any).hash = "c79701ab1cfaff4cbc582b24de4711cb";

export default node;
