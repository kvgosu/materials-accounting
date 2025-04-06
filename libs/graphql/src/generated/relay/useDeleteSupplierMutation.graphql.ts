/**
 * @generated SignedSource<<1c4f6793e856669e20bda6c62ddc5b49>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteSupplierMutation$variables = {
  id: string;
};
export type useDeleteSupplierMutation$data = {
  readonly delete_supplier: {
    readonly success: boolean;
  };
};
export type useDeleteSupplierMutation = {
  response: useDeleteSupplierMutation$data;
  variables: useDeleteSupplierMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "DeleteSupplierPayload",
    "kind": "LinkedField",
    "name": "delete_supplier",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteSupplierMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteSupplierMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cf4388a2075ff5c9d9ec2b79a2d68b33",
    "id": null,
    "metadata": {},
    "name": "useDeleteSupplierMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteSupplierMutation(\n  $id: ID!\n) {\n  delete_supplier(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "8bf478470697a7cf120c567364d62cb2";

export default node;
