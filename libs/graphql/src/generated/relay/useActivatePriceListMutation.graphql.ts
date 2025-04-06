/**
 * @generated SignedSource<<86d10833203ee0dff93649e64bcd6d55>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useActivatePriceListMutation$variables = {
  id: string;
};
export type useActivatePriceListMutation$data = {
  readonly activate_price_list: {
    readonly success: boolean;
  };
};
export type useActivatePriceListMutation = {
  response: useActivatePriceListMutation$data;
  variables: useActivatePriceListMutation$variables;
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
    "concreteType": "ActivatePriceListPayload",
    "kind": "LinkedField",
    "name": "activate_price_list",
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
    "name": "useActivatePriceListMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useActivatePriceListMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c29e1e2af477ce9a620bf1c8d6a943c2",
    "id": null,
    "metadata": {},
    "name": "useActivatePriceListMutation",
    "operationKind": "mutation",
    "text": "mutation useActivatePriceListMutation(\n  $id: ID!\n) {\n  activate_price_list(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "8e4dba2a33ef39480e573f11b71fb1a4";

export default node;
