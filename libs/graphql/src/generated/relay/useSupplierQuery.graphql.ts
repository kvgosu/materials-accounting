/**
 * @generated SignedSource<<0fdc951ef753906e2acadea11e09734e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoiceStatus = "CLOSED" | "CREATED" | "PROCESSED" | "%future added value";
export type TransactionType = "CLIENT_DEBT" | "CLIENT_PAYMENT" | "SUPPLIER_DEBT" | "SUPPLIER_PAYMENT" | "%future added value";
export type useSupplierQuery$variables = {
  id: string;
};
export type useSupplierQuery$data = {
  readonly supplier: {
    readonly debt_balance: number | null | undefined;
    readonly debt_movements: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtMovementList">;
    }> | null | undefined;
    readonly invoices: ReadonlyArray<{
      readonly date: string;
      readonly id: string;
      readonly number: string;
      readonly status: InvoiceStatus;
      readonly total_amount: number;
      readonly total_with_markup: number;
      readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_list">;
    }> | null | undefined;
    readonly transactions: ReadonlyArray<{
      readonly amount: number;
      readonly date: string;
      readonly id: string;
      readonly type: TransactionType;
      readonly " $fragmentSpreads": FragmentRefs<"TransactionFragments_list">;
    }> | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplierDetails">;
  } | null | undefined;
};
export type useSupplierQuery = {
  response: useSupplierQuery$data;
  variables: useSupplierQuery$variables;
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
  "name": "debt_balance",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total_amount",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total_with_markup",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contact_person",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phone",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updated_at",
  "storageKey": null
},
v18 = [
  (v3/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/),
  (v14/*: any*/),
  (v15/*: any*/)
],
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Client",
  "kind": "LinkedField",
  "name": "client",
  "plural": false,
  "selections": (v18/*: any*/),
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "Supplier",
  "kind": "LinkedField",
  "name": "supplier",
  "plural": false,
  "selections": (v18/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useSupplierQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Supplier",
        "kind": "LinkedField",
        "name": "supplier",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SupplierFragments_supplierDetails"
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Invoice",
            "kind": "LinkedField",
            "name": "invoices",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "InvoiceFragments_list"
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "transactions",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "TransactionFragments_list"
              },
              (v3/*: any*/),
              (v5/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "DebtMovement",
            "kind": "LinkedField",
            "name": "debt_movements",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DebtFragments_debtMovementList"
              }
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSupplierQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Supplier",
        "kind": "LinkedField",
        "name": "supplier",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Invoice",
            "kind": "LinkedField",
            "name": "invoices",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "transactions",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v10/*: any*/),
              (v9/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              (v19/*: any*/),
              (v20/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "DebtMovement",
            "kind": "LinkedField",
            "name": "debt_movements",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "period",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "document_id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "document_type",
                "storageKey": null
              },
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "direction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dimension",
                "storageKey": null
              },
              (v19/*: any*/),
              (v20/*: any*/),
              (v16/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a576ef32da6f3419512562b057e90016",
    "id": null,
    "metadata": {},
    "name": "useSupplierQuery",
    "operationKind": "query",
    "text": "query useSupplierQuery(\n  $id: ID!\n) {\n  supplier(id: $id) {\n    ...SupplierFragments_supplierDetails\n    debt_balance\n    invoices {\n      ...InvoiceFragments_list\n      id\n      number\n      date\n      total_amount\n      total_with_markup\n      status\n    }\n    transactions {\n      ...TransactionFragments_list\n      id\n      date\n      amount\n      type\n    }\n    debt_movements {\n      ...DebtFragments_debtMovementList\n      id\n    }\n    id\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment DebtFragments_debtMovementList on DebtMovement {\n  id\n  period\n  document_id\n  document_type\n  amount\n  direction\n  dimension\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n}\n\nfragment InvoiceFragments_list on Invoice {\n  id\n  number\n  date\n  total_amount\n  total_with_markup\n  status\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment SupplierFragments_supplierDetails on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n  created_at\n  updated_at\n  debt_balance\n}\n\nfragment TransactionFragments_list on Transaction {\n  id\n  type\n  amount\n  date\n  description\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "6f4b4857b0349120e609e34ac221cb5e";

export default node;
