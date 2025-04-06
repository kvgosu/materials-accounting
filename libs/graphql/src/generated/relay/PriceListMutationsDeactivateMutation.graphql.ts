/**
 * @generated SignedSource<<0c86f8a1d24250d244348ff5c5132f5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PriceListMutationsDeactivateMutation$variables = {
  id: string;
};
export type PriceListMutationsDeactivateMutation$data = {
  readonly deactivate_price_list: {
    readonly success: boolean;
  };
};
export type PriceListMutationsDeactivateMutation = {
  response: PriceListMutationsDeactivateMutation$data;
  variables: PriceListMutationsDeactivateMutation$variables;
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
    "name": "PriceListMutationsDeactivateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PriceListMutationsDeactivateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "74ee7afdadd9074a9d54dd21d4ab3075",
    "id": null,
    "metadata": {},
    "name": "PriceListMutationsDeactivateMutation",
    "operationKind": "mutation",
    "text": "mutation PriceListMutationsDeactivateMutation(\n  $id: ID!\n) {\n  deactivate_price_list(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "b7d67e891c505ade8c69dcff4adac4dc";

export default node;
