/**
 * @generated SignedSource<<2e589fadc4af44750313ebbc9702ba32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SupplierMutationsDeleteMutation$variables = {
  id: string;
};
export type SupplierMutationsDeleteMutation$data = {
  readonly delete_supplier: {
    readonly success: boolean;
  };
};
export type SupplierMutationsDeleteMutation = {
  response: SupplierMutationsDeleteMutation$data;
  variables: SupplierMutationsDeleteMutation$variables;
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
    "name": "SupplierMutationsDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SupplierMutationsDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "356fb4b1bb3c8f4167d7fdd5f88bf37e",
    "id": null,
    "metadata": {},
    "name": "SupplierMutationsDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation SupplierMutationsDeleteMutation(\n  $id: ID!\n) {\n  delete_supplier(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "eef9a5eb7628e7ce89bc3e5f43a14475";

export default node;
