/**
 * @generated SignedSource<<013250008fc858392a09fa7ae83db69f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteContractMutation$variables = {
  id: string;
};
export type useDeleteContractMutation$data = {
  readonly delete_contract: {
    readonly success: boolean;
  };
};
export type useDeleteContractMutation = {
  response: useDeleteContractMutation$data;
  variables: useDeleteContractMutation$variables;
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
    "concreteType": "DeleteContractPayload",
    "kind": "LinkedField",
    "name": "delete_contract",
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
    "name": "useDeleteContractMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteContractMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9ace51f9d55414b8cba6fa84c2fc4d29",
    "id": null,
    "metadata": {},
    "name": "useDeleteContractMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteContractMutation(\n  $id: ID!\n) {\n  delete_contract(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "0df7caa6b37ab730c50bf4083af103c4";

export default node;
