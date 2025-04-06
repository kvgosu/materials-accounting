/**
 * @generated SignedSource<<2215f598f064dcff0f906e05a4910459>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateSupplierInput = {
  address?: string | null | undefined;
  contact_person?: string | null | undefined;
  email?: string | null | undefined;
  name?: string | null | undefined;
  phone?: string | null | undefined;
};
export type useUpdateSupplierMutation$variables = {
  id: string;
  input: UpdateSupplierInput;
};
export type useUpdateSupplierMutation$data = {
  readonly update_supplier: {
    readonly supplier: {
      readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplierDetails">;
    };
  };
};
export type useUpdateSupplierMutation = {
  response: useUpdateSupplierMutation$data;
  variables: useUpdateSupplierMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
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
    "name": "useUpdateSupplierMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSupplierPayload",
        "kind": "LinkedField",
        "name": "update_supplier",
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
    "name": "useUpdateSupplierMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSupplierPayload",
        "kind": "LinkedField",
        "name": "update_supplier",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "debt_balance",
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
    "cacheID": "180c78c3acbb1ed4430312f64f8ed391",
    "id": null,
    "metadata": {},
    "name": "useUpdateSupplierMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateSupplierMutation(\n  $id: ID!\n  $input: UpdateSupplierInput!\n) {\n  update_supplier(id: $id, input: $input) {\n    supplier {\n      ...SupplierFragments_supplierDetails\n      id\n    }\n  }\n}\n\nfragment SupplierFragments_supplierDetails on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n  created_at\n  updated_at\n  debt_balance\n}\n"
  }
};
})();

(node as any).hash = "8fe7425306bbd89be9f7756253191539";

export default node;
