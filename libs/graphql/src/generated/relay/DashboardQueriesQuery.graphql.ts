/**
 * @generated SignedSource<<2fa81e65477b097ca355c4823dec690c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DashboardQueriesQuery$variables = Record<PropertyKey, never>;
export type DashboardQueriesQuery$data = {
  readonly dashboard: {
    readonly active_contracts_count: number;
    readonly client_debts_sum: number;
    readonly clients_count: number;
    readonly recent_invoices: ReadonlyArray<{
      readonly client: {
        readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
      };
      readonly supplier: {
        readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
      };
      readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_invoiceBasic">;
    }>;
    readonly recent_transactions: ReadonlyArray<{
      readonly client: {
        readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
      } | null | undefined;
      readonly supplier: {
        readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
      } | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"TransactionFragments_transaction">;
    }>;
    readonly supplier_debts_sum: number;
    readonly suppliers_count: number;
  };
};
export type DashboardQueriesQuery = {
  response: DashboardQueriesQuery$data;
  variables: DashboardQueriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clients_count",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "suppliers_count",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "active_contracts_count",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "client_debts_sum",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "supplier_debts_sum",
  "storageKey": null
},
v5 = {
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
v6 = {
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v9 = [
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
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Client",
  "kind": "LinkedField",
  "name": "client",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Supplier",
  "kind": "LinkedField",
  "name": "supplier",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Dashboard",
        "kind": "LinkedField",
        "name": "dashboard",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Invoice",
            "kind": "LinkedField",
            "name": "recent_invoices",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "InvoiceFragments_invoiceBasic"
              },
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "recent_transactions",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "TransactionFragments_transaction"
              },
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DashboardQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Dashboard",
        "kind": "LinkedField",
        "name": "dashboard",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Invoice",
            "kind": "LinkedField",
            "name": "recent_invoices",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "number",
                "storageKey": null
              },
              (v8/*: any*/),
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
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "recent_transactions",
            "plural": true,
            "selections": [
              (v7/*: any*/),
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
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0ab766f5f7bc153546d130591d4ab483",
    "id": null,
    "metadata": {},
    "name": "DashboardQueriesQuery",
    "operationKind": "query",
    "text": "query DashboardQueriesQuery {\n  dashboard {\n    clients_count\n    suppliers_count\n    active_contracts_count\n    client_debts_sum\n    supplier_debts_sum\n    recent_invoices {\n      ...InvoiceFragments_invoiceBasic\n      client {\n        ...ClientFragments_client\n        id\n      }\n      supplier {\n        ...SupplierFragments_supplier\n        id\n      }\n      id\n    }\n    recent_transactions {\n      ...TransactionFragments_transaction\n      client {\n        ...ClientFragments_client\n        id\n      }\n      supplier {\n        ...SupplierFragments_supplier\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment InvoiceFragments_invoiceBasic on Invoice {\n  id\n  number\n  date\n  total_amount\n  total_with_markup\n  status\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment TransactionFragments_transaction on Transaction {\n  id\n  type\n  amount\n  date\n  description\n}\n"
  }
};
})();

(node as any).hash = "da5526f77ba26845401b1d15dd604b95";

export default node;
