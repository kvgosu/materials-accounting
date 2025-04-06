/**
 * @generated SignedSource<<2dfbc9a64b187e07bb754b4d977249f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupplierQueriesQuery$variables = {
  limit?: number | null | undefined;
  search?: string | null | undefined;
  skip?: number | null | undefined;
};
export type SupplierQueriesQuery$data = {
  readonly suppliers: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_list">;
  }>;
};
export type SupplierQueriesQuery = {
  response: SupplierQueriesQuery$data;
  variables: SupplierQueriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v3 = [
  {
    "kind": "Variable",
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search"
  },
  {
    "kind": "Variable",
    "name": "skip",
    "variableName": "skip"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SupplierQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Supplier",
        "kind": "LinkedField",
        "name": "suppliers",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SupplierFragments_list"
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
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "SupplierQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Supplier",
        "kind": "LinkedField",
        "name": "suppliers",
        "plural": true,
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "59322b193c75ca646ba3a7e612d6ca75",
    "id": null,
    "metadata": {},
    "name": "SupplierQueriesQuery",
    "operationKind": "query",
    "text": "query SupplierQueriesQuery(\n  $skip: Int\n  $limit: Int\n  $search: String\n) {\n  suppliers(skip: $skip, limit: $limit, search: $search) {\n    ...SupplierFragments_list\n    id\n  }\n}\n\nfragment SupplierFragments_list on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "280cabdd45c3d7b985e29b20fb5af086";

export default node;
