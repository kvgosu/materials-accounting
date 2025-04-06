/**
 * @generated SignedSource<<5cfe4a9188039c7b1eeae4f3283d256d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeactivatePriceListMutation$variables = {
  id: string;
};
export type useDeactivatePriceListMutation$data = {
  readonly deactivate_price_list: {
    readonly success: boolean;
  };
};
export type useDeactivatePriceListMutation = {
  response: useDeactivatePriceListMutation$data;
  variables: useDeactivatePriceListMutation$variables;
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
    "concreteType": "DeactivatePriceListPayload",
    "kind": "LinkedField",
    "name": "deactivate_price_list",
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
    "name": "useDeactivatePriceListMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeactivatePriceListMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f9331794f0b100a5a635a78cae9e7888",
    "id": null,
    "metadata": {},
    "name": "useDeactivatePriceListMutation",
    "operationKind": "mutation",
    "text": "mutation useDeactivatePriceListMutation(\n  $id: ID!\n) {\n  deactivate_price_list(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "0e042e7bb5ade42a6961b822df893643";

export default node;
