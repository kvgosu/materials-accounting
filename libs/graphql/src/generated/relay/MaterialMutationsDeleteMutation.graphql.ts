/**
 * @generated SignedSource<<bac93b584204aa6d3f81bbae55d567de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MaterialMutationsDeleteMutation$variables = {
  id: string;
};
export type MaterialMutationsDeleteMutation$data = {
  readonly delete_material: {
    readonly success: boolean;
  };
};
export type MaterialMutationsDeleteMutation = {
  response: MaterialMutationsDeleteMutation$data;
  variables: MaterialMutationsDeleteMutation$variables;
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
    "name": "MaterialMutationsDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MaterialMutationsDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ecd3c97f1561e8d3774a64e8039e757a",
    "id": null,
    "metadata": {},
    "name": "MaterialMutationsDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation MaterialMutationsDeleteMutation(\n  $id: ID!\n) {\n  delete_material(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "07c875ccfd7736ee4563312ef349d7ea";

export default node;
