/**
 * @generated SignedSource<<ea35f7774f39a20c89b51aac02091e2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateSupplierInput = {
  address?: string | null | undefined;
  contact_person?: string | null | undefined;
  email?: string | null | undefined;
  name: string;
  phone?: string | null | undefined;
};
export type SupplierMutationsCreateMutation$variables = {
  input: CreateSupplierInput;
};
export type SupplierMutationsCreateMutation$data = {
  readonly create_supplier: {
    readonly supplier: {
      readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplierDetails">;
    };
  };
};
export type SupplierMutationsCreateMutation = {
  response: SupplierMutationsCreateMutation$data;
  variables: SupplierMutationsCreateMutation$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SupplierMutationsCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSupplierPayload",
        "kind": "LinkedField",
        "name": "create_supplier",
        "plural": false,
        "selections": [
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
                "name": "SupplierFragments_supplierDetails"
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
    "name": "SupplierMutationsCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSupplierPayload",
        "kind": "LinkedField",
        "name": "create_supplier",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Supplier",
            "kind": "LinkedField",
            "name": "supplier",
            "plural": false,
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f38584ab7c8919cb405ef4f2a4c6d1de",
    "id": null,
    "metadata": {},
    "name": "SupplierMutationsCreateMutation",
    "operationKind": "mutation",
    "text": "mutation SupplierMutationsCreateMutation(\n  $input: CreateSupplierInput!\n) {\n  create_supplier(input: $input) {\n    supplier {\n      ...SupplierFragments_supplierDetails\n      id\n    }\n  }\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment SupplierFragments_supplierDetails on Supplier {\n  ...SupplierFragments_supplier\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "3bf884a214b37274bff4d99aefb147d5";

export default node;
