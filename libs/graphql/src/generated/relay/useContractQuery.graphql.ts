/**
 * @generated SignedSource<<1f602d65a2950cb07e5c0389d36caa09>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useContractQuery$variables = {
  id: string;
};
export type useContractQuery$data = {
  readonly contract: {
    readonly invoices: ReadonlyArray<{
      readonly client: {
        readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_client">;
      };
      readonly date: string;
      readonly id: string;
      readonly number: string;
      readonly supplier: {
        readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplier">;
      };
      readonly total_amount: number;
      readonly total_with_markup: number;
      readonly " $fragmentSpreads": FragmentRefs<"InvoiceFragments_listWithoutStatus">;
    }> | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ContractFragments_contractDetails">;
  } | null | undefined;
};
export type useContractQuery = {
  response: useContractQuery$data;
  variables: useContractQuery$variables;
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
  "name": "markup_percentage",
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
  "name": "expiration_date",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contact_person",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phone",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v15 = [
  (v2/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/),
  (v14/*: any*/)
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useContractQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Contract",
        "kind": "LinkedField",
        "name": "contract",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ContractFragments_contractDetails"
          },
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
                "name": "InvoiceFragments_listWithoutStatus"
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
    "name": "useContractQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Contract",
        "kind": "LinkedField",
        "name": "contract",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
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
                  (v7/*: any*/),
                  (v9/*: any*/),
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
                  (v8/*: any*/),
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
                "kind": "ScalarField",
                "name": "debt_balance",
                "storageKey": null
              },
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
              (v16/*: any*/),
              (v19/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9640d805b8ad97da05347e4e0ffb9e44",
    "id": null,
    "metadata": {},
    "name": "useContractQuery",
    "operationKind": "query",
    "text": "query useContractQuery(\n  $id: ID!\n) {\n  contract(id: $id) {\n    ...ContractFragments_contractDetails\n    invoices {\n      ...InvoiceFragments_listWithoutStatus\n      id\n      number\n      date\n      total_amount\n      total_with_markup\n      supplier {\n        ...SupplierFragments_supplier\n        id\n      }\n      client {\n        ...ClientFragments_client\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment ClientFragments_clientDetails on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n  contracts {\n    ...ContractFragments_list\n    id\n  }\n  invoices {\n    ...InvoiceFragments_list\n    id\n  }\n  debt_balance\n  created_at\n  updated_at\n}\n\nfragment ContractFragments_contractDetails on Contract {\n  id\n  number\n  date\n  markup_percentage\n  status\n  expiration_date\n  client {\n    ...ClientFragments_clientDetails\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment ContractFragments_list on Contract {\n  id\n  number\n  date\n  markup_percentage\n  expiration_date\n  client {\n    ...ClientFragments_client\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment InvoiceFragments_list on Invoice {\n  id\n  number\n  date\n  total_amount\n  total_with_markup\n  status\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment InvoiceFragments_listWithoutStatus on Invoice {\n  id\n  number\n  date\n  total_amount\n  total_with_markup\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n"
  }
};
})();

(node as any).hash = "a44b52d063d76634200228ab646f9499";

export default node;
