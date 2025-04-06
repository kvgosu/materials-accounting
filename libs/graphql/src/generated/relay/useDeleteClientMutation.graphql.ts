/**
 * @generated SignedSource<<8518c88678146802a7ff445449873853>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteClientMutation$variables = {
  id: string;
};
export type useDeleteClientMutation$data = {
  readonly delete_client: {
    readonly success: boolean;
  };
};
export type useDeleteClientMutation = {
  response: useDeleteClientMutation$data;
  variables: useDeleteClientMutation$variables;
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
    "name": "useDeleteClientMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteClientMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f00586047950bff334c42599dfa2888d",
    "id": null,
    "metadata": {},
    "name": "useDeleteClientMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteClientMutation(\n  $id: ID!\n) {\n  delete_client(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "edd2168659f68eb67c758b2e378c6591";

export default node;
