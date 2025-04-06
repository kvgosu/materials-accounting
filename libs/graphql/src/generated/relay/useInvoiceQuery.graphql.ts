/**
 * @generated SignedSource<<87e5ad65b8414ee777436ff1748bbf6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useInvoiceQuery$variables = {
  id: string;
};
export type useInvoiceQuery$data = {
  readonly invoice: {
    readonly debt_movements: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtMovementList">;
    }> | null | undefined;
    readonly items: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_invoiceItemList">;
    }>;
    readonly transactions: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"TransactionFragments_list">;
    }> | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_invoiceDetails">;
  } | null | undefined;
};
export type useInvoiceQuery = {
  response: useInvoiceQuery$data;
  variables: useInvoiceQuery$variables;
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total_amount",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total_with_markup",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contact_person",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phone",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "markup_percentage",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expiration_date",
  "storageKey": null
},
v15 = [
  (v2/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "Client",
  "kind": "LinkedField",
  "name": "client",
  "plural": false,
  "selections": (v15/*: any*/),
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updated_at",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Supplier",
  "kind": "LinkedField",
  "name": "supplier",
  "plural": false,
  "selections": (v15/*: any*/),
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "debt_balance",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "concreteType": "Client",
  "kind": "LinkedField",
  "name": "client",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Contract",
      "kind": "LinkedField",
      "name": "contracts",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/),
        (v16/*: any*/),
        (v17/*: any*/),
        (v18/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Invoice",
      "kind": "LinkedField",
      "name": "invoices",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
        (v16/*: any*/),
        (v19/*: any*/),
        (v17/*: any*/),
        (v18/*: any*/)
      ],
      "storageKey": null
    },
    (v20/*: any*/),
    (v17/*: any*/),
    (v18/*: any*/)
  ],
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useInvoiceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Invoice",
        "kind": "LinkedField",
        "name": "invoice",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InvoiceFragments_invoiceDetails"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "InvoiceItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "InvoiceFragments_invoiceItemList"
              }
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
              }
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
    "name": "useInvoiceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Invoice",
        "kind": "LinkedField",
        "name": "invoice",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v21/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Supplier",
            "kind": "LinkedField",
            "name": "supplier",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v20/*: any*/)
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v13/*: any*/),
              (v7/*: any*/),
              (v14/*: any*/),
              (v21/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          (v17/*: any*/),
          (v18/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "InvoiceItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "quantity",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "price",
                "storageKey": null
              },
              (v22/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amount_with_markup",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Material",
                "kind": "LinkedField",
                "name": "material",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "unit",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v23/*: any*/)
                ],
                "storageKey": null
              }
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              (v22/*: any*/),
              (v4/*: any*/),
              (v23/*: any*/),
              (v16/*: any*/),
              (v19/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/)
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
              (v2/*: any*/),
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
              (v22/*: any*/),
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
              (v16/*: any*/),
              (v19/*: any*/),
              (v17/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "67db95693ffe5b05d8368a60a93713ca",
    "id": null,
    "metadata": {},
    "name": "useInvoiceQuery",
    "operationKind": "query",
    "text": "query useInvoiceQuery(\n  $id: ID!\n) {\n  invoice(id: $id) {\n    ...InvoiceFragments_invoiceDetails\n    items {\n      ...InvoiceFragments_invoiceItemList\n      id\n    }\n    transactions {\n      ...TransactionFragments_list\n      id\n    }\n    debt_movements {\n      ...DebtFragments_debtMovementList\n      id\n    }\n    id\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment ClientFragments_clientDetails on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n  contracts {\n    ...ContractFragments_list\n    id\n  }\n  invoices {\n    ...InvoiceFragments_list\n    id\n  }\n  debt_balance\n  created_at\n  updated_at\n}\n\nfragment ContractFragments_contractDetails on Contract {\n  id\n  number\n  date\n  markup_percentage\n  status\n  expiration_date\n  client {\n    ...ClientFragments_clientDetails\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment ContractFragments_list on Contract {\n  id\n  number\n  date\n  markup_percentage\n  expiration_date\n  client {\n    ...ClientFragments_client\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment DebtFragments_debtMovementList on DebtMovement {\n  id\n  period\n  document_id\n  document_type\n  amount\n  direction\n  dimension\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n}\n\nfragment InvoiceFragments_invoiceBasic on Invoice {\n  id\n  number\n  date\n  total_amount\n  total_with_markup\n  status\n}\n\nfragment InvoiceFragments_invoiceDetails on Invoice {\n  ...InvoiceFragments_invoiceBasic\n  client {\n    ...ClientFragments_clientDetails\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplierDetails\n    id\n  }\n  contract {\n    ...ContractFragments_contractDetails\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment InvoiceFragments_invoiceItemList on InvoiceItem {\n  id\n  quantity\n  price\n  amount\n  amount_with_markup\n  material {\n    name\n    unit\n    ...MaterialFragments_material\n    id\n  }\n}\n\nfragment InvoiceFragments_list on Invoice {\n  id\n  number\n  date\n  total_amount\n  total_with_markup\n  status\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment SupplierFragments_supplierDetails on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n  created_at\n  updated_at\n  debt_balance\n}\n\nfragment TransactionFragments_list on Transaction {\n  id\n  type\n  amount\n  date\n  description\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "0f4b0a7ddf7442a11737b4ba17e14fb4";

export default node;
