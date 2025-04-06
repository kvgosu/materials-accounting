/**
 * @generated SignedSource<<0cd213ffb2fa26ef1ec5faba9dc56d09>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoiceStatus = "CLOSED" | "CREATED" | "PROCESSED" | "%future added value";
export type useInvoicesQuery$variables = {
  client_id?: string | null | undefined;
  contract_id?: string | null | undefined;
  date_from?: string | null | undefined;
  date_to?: string | null | undefined;
  limit?: number | null | undefined;
  skip?: number | null | undefined;
  status?: InvoiceStatus | null | undefined;
  supplier_id?: string | null | undefined;
};
export type useInvoicesQuery$data = {
  readonly invoices: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_list">;
  }>;
};
export type useInvoicesQuery = {
  response: useInvoicesQuery$data;
  variables: useInvoicesQuery$variables;
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
  "name": "contract_id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "date_from"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "date_to"
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
  "name": "status"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "supplier_id"
},
v8 = [
  {
    "kind": "Variable",
    "name": "client_id",
    "variableName": "client_id"
  },
  {
    "kind": "Variable",
    "name": "contract_id",
    "variableName": "contract_id"
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
    "name": "status",
    "variableName": "status"
  },
  {
    "kind": "Variable",
    "name": "supplier_id",
    "variableName": "supplier_id"
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
    "name": "useInvoicesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "Invoice",
        "kind": "LinkedField",
        "name": "invoices",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InvoiceFragments_list"
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
      (v7/*: any*/),
      (v1/*: any*/),
      (v6/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "useInvoicesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "Invoice",
        "kind": "LinkedField",
        "name": "invoices",
        "plural": true,
        "selections": [
          (v9/*: any*/),
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
            "name": "total_amount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "total_with_markup",
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
    "cacheID": "007b67d1fff1568575fea3bdc1d70c4f",
    "id": null,
    "metadata": {},
    "name": "useInvoicesQuery",
    "operationKind": "query",
    "text": "query useInvoicesQuery(\n  $skip: Int\n  $limit: Int\n  $client_id: ID\n  $supplier_id: ID\n  $contract_id: ID\n  $status: InvoiceStatus\n  $date_from: String\n  $date_to: String\n) {\n  invoices(skip: $skip, limit: $limit, client_id: $client_id, supplier_id: $supplier_id, contract_id: $contract_id, status: $status, date_from: $date_from, date_to: $date_to) {\n    ...InvoiceFragments_list\n    id\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment InvoiceFragments_list on Invoice {\n  id\n  number\n  date\n  total_amount\n  total_with_markup\n  status\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n"
  }
};
})();

(node as any).hash = "8009574c5c553a72e8d3386f1889e746";

export default node;
