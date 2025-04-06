/**
 * @generated SignedSource<<5c1f830ce6017464e4321049fc4117a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PriceListMutationsActivateMutation$variables = {
  id: string;
};
export type PriceListMutationsActivateMutation$data = {
  readonly activate_price_list: {
    readonly success: boolean;
  };
};
export type PriceListMutationsActivateMutation = {
  response: PriceListMutationsActivateMutation$data;
  variables: PriceListMutationsActivateMutation$variables;
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
    "name": "PriceListMutationsActivateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PriceListMutationsActivateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cba49243fe4298aa488b69cc8cdbdd6d",
    "id": null,
    "metadata": {},
    "name": "PriceListMutationsActivateMutation",
    "operationKind": "mutation",
    "text": "mutation PriceListMutationsActivateMutation(\n  $id: ID!\n) {\n  activate_price_list(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "3bf4c5deee81079423868a49d88c13d1";

export default node;
