/**
 * @generated SignedSource<<917200d7aa30d141802ead25e7951899>>
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
export type SupplierMutationsUpdateMutation$variables = {
  id: string;
  input: UpdateSupplierInput;
};
export type SupplierMutationsUpdateMutation$data = {
  readonly update_supplier: {
    readonly supplier: {
      readonly " $fragmentSpreads": FragmentRefs<"SupplierFragments_supplierDetails">;
    };
  };
};
export type SupplierMutationsUpdateMutation = {
  response: SupplierMutationsUpdateMutation$data;
  variables: SupplierMutationsUpdateMutation$variables;
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
    "name": "SupplierMutationsUpdateMutation",
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
    "name": "SupplierMutationsUpdateMutation",
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
    "cacheID": "c8119cd1d4245c8ac2b41154e9e497a3",
    "id": null,
    "metadata": {},
    "name": "SupplierMutationsUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation SupplierMutationsUpdateMutation(\n  $id: ID!\n  $input: UpdateSupplierInput!\n) {\n  update_supplier(id: $id, input: $input) {\n    supplier {\n      ...SupplierFragments_supplierDetails\n      id\n    }\n  }\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment SupplierFragments_supplierDetails on Supplier {\n  ...SupplierFragments_supplier\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "30cc0abd705a5d461f69c0e0fe97a031";

export default node;
