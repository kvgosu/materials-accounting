/**
 * @generated SignedSource<<74c81d2e5d1cef41cb14eb6200c9532b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ContractMutationsDeleteMutation$variables = {
  id: string;
};
export type ContractMutationsDeleteMutation$data = {
  readonly delete_contract: {
    readonly success: boolean;
  };
};
export type ContractMutationsDeleteMutation = {
  response: ContractMutationsDeleteMutation$data;
  variables: ContractMutationsDeleteMutation$variables;
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
    "name": "ContractMutationsDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ContractMutationsDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2e1a1f9de17c77ad9db5705aa874bb8d",
    "id": null,
    "metadata": {},
    "name": "ContractMutationsDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation ContractMutationsDeleteMutation(\n  $id: ID!\n) {\n  delete_contract(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "26cae0570c0cb13c8c3a1feda76b9c26";

export default node;
