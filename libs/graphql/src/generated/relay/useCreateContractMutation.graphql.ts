/**
 * @generated SignedSource<<a9be56ce5bdd09d70f625a94f23ae1fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "ACTIVE" | "INACTIVE" | "%future added value";
export type CreateContractInput = {
  client_id: string;
  date: string;
  expiration_date?: string | null | undefined;
  markup_percentage: number;
  number: string;
  status: ContractStatus;
};
export type useCreateContractMutation$variables = {
  input: CreateContractInput;
};
export type useCreateContractMutation$data = {
  readonly create_contract: {
    readonly contract: {
      readonly " $fragmentSpreads": FragmentRefs<"ContractFragments_contractDetails">;
    };
  };
};
export type useCreateContractMutation = {
  response: useCreateContractMutation$data;
  variables: useCreateContractMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "name": "markup_percentage",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expiration_date",
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
v13 = [
  (v2/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Client",
  "kind": "LinkedField",
  "name": "client",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updated_at",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateContractPayload",
        "kind": "LinkedField",
        "name": "create_contract",
        "plural": false,
        "selections": [
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
                "name": "ContractFragments_contractDetails"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateContractMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateContractPayload",
        "kind": "LinkedField",
        "name": "create_contract",
        "plural": false,
        "selections": [
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
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
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
                      (v5/*: any*/),
                      (v7/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/)
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
                      (v6/*: any*/),
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Supplier",
                        "kind": "LinkedField",
                        "name": "supplier",
                        "plural": false,
                        "selections": (v13/*: any*/),
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v16/*: any*/)
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
                  (v15/*: any*/),
                  (v16/*: any*/)
                ],
                "storageKey": null
              },
              (v15/*: any*/),
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
    "cacheID": "8b591c36029b5ba56aa25e8bb9d8208d",
    "id": null,
    "metadata": {},
    "name": "useCreateContractMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateContractMutation(\n  $input: CreateContractInput!\n) {\n  create_contract(input: $input) {\n    contract {\n      ...ContractFragments_contractDetails\n      id\n    }\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment ClientFragments_clientDetails on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n  contracts {\n    ...ContractFragments_list\n    id\n  }\n  invoices {\n    ...InvoiceFragments_list\n    id\n  }\n  debt_balance\n  created_at\n  updated_at\n}\n\nfragment ContractFragments_contractDetails on Contract {\n  id\n  number\n  date\n  markup_percentage\n  status\n  expiration_date\n  client {\n    ...ClientFragments_clientDetails\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment ContractFragments_list on Contract {\n  id\n  number\n  date\n  markup_percentage\n  expiration_date\n  client {\n    ...ClientFragments_client\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment InvoiceFragments_list on Invoice {\n  id\n  number\n  date\n  total_amount\n  total_with_markup\n  status\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n  updated_at\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n"
  }
};
})();

(node as any).hash = "8b3599f250a4491013a6377584bed827";

export default node;
