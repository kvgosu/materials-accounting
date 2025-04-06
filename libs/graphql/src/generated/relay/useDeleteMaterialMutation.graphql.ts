/**
 * @generated SignedSource<<2b702bc25721bccc0c790675ecd39354>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteMaterialMutation$variables = {
  id: string;
};
export type useDeleteMaterialMutation$data = {
  readonly delete_material: {
    readonly success: boolean;
  };
};
export type useDeleteMaterialMutation = {
  response: useDeleteMaterialMutation$data;
  variables: useDeleteMaterialMutation$variables;
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
    "concreteType": "DeleteMaterialPayload",
    "kind": "LinkedField",
    "name": "delete_material",
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
    "name": "useDeleteMaterialMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteMaterialMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ab164ffb04d6788d940cc0582b804cec",
    "id": null,
    "metadata": {},
    "name": "useDeleteMaterialMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteMaterialMutation(\n  $id: ID!\n) {\n  delete_material(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "a636f32f8eef44a94b049f3f36150158";

export default node;
