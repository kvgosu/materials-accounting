/**
 * @generated SignedSource<<4aab5db21eb5ab72e06aad134f34267a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TransactionType = "CLIENT_DEBT" | "CLIENT_PAYMENT" | "SUPPLIER_DEBT" | "SUPPLIER_PAYMENT" | "%future added value";
export type TransactionQueriesQuery$variables = {
  client_id?: string | null | undefined;
  date_from?: string | null | undefined;
  date_to?: string | null | undefined;
  invoice_id?: string | null | undefined;
  limit?: number | null | undefined;
  skip?: number | null | undefined;
  supplier_id?: string | null | undefined;
  type?: TransactionType | null | undefined;
};
export type TransactionQueriesQuery$data = {
  readonly transactions: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"TransactionFragments_list">;
  }>;
};
export type TransactionQueriesQuery = {
  response: TransactionQueriesQuery$data;
  variables: TransactionQueriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "client_id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "date_from"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "date_to"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "invoice_id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "supplier_id"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v8 = [
  {
    "kind": "Variable",
    "name": "client_id",
    "variableName": "client_id"
  },
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
    "name": "invoice_id",
    "variableName": "invoice_id"
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
  },
  {
    "kind": "Variable",
    "name": "type",
    "variableName": "type"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = [
  (v9/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TransactionQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "transactions",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TransactionFragments_list"
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
      (v5/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/),
      (v6/*: any*/),
      (v3/*: any*/),
      (v7/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "TransactionQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "transactions",
        "plural": true,
        "selections": [
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "amount",
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
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": (v10/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Supplier",
            "kind": "LinkedField",
            "name": "supplier",
            "plural": false,
            "selections": (v10/*: any*/),
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
    "cacheID": "cc437c769fb0b273fa0fa7e02f2302a2",
    "id": null,
    "metadata": {},
    "name": "TransactionQueriesQuery",
    "operationKind": "query",
    "text": "query TransactionQueriesQuery(\n  $skip: Int\n  $limit: Int\n  $client_id: ID\n  $supplier_id: ID\n  $invoice_id: ID\n  $type: TransactionType\n  $date_from: String\n  $date_to: String\n) {\n  transactions(skip: $skip, limit: $limit, client_id: $client_id, supplier_id: $supplier_id, invoice_id: $invoice_id, type: $type, date_from: $date_from, date_to: $date_to) {\n    ...TransactionFragments_list\n    id\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment TransactionFragments_list on Transaction {\n  id\n  type\n  amount\n  date\n  description\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "21076bb9052a0296cd38b313ceabd735";

export default node;
