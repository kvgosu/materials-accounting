/**
 * @generated SignedSource<<3ae2a9721b7863c4f19318e68f4a5f0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ClientMutationsDeleteMutation$variables = {
  id: string;
};
export type ClientMutationsDeleteMutation$data = {
  readonly delete_client: {
    readonly success: boolean;
  };
};
export type ClientMutationsDeleteMutation = {
  response: ClientMutationsDeleteMutation$data;
  variables: ClientMutationsDeleteMutation$variables;
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
    "concreteType": "DeleteClientPayload",
    "kind": "LinkedField",
    "name": "delete_client",
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
    "name": "ClientMutationsDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClientMutationsDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c71be41f1a8e0531e569ff301d7d9ea4",
    "id": null,
    "metadata": {},
    "name": "ClientMutationsDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation ClientMutationsDeleteMutation(\n  $id: ID!\n) {\n  delete_client(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "ad8c19e65724a7f0f7139f6750072256";

export default node;
