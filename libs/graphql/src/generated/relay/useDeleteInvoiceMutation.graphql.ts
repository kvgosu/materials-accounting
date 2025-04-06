/**
 * @generated SignedSource<<4cdbc96c1620b9ffe314cc28bb9e41dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteInvoiceMutation$variables = {
  id: string;
};
export type useDeleteInvoiceMutation$data = {
  readonly delete_invoice: {
    readonly success: boolean;
  };
};
export type useDeleteInvoiceMutation = {
  response: useDeleteInvoiceMutation$data;
  variables: useDeleteInvoiceMutation$variables;
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
    "concreteType": "DeleteInvoicePayload",
    "kind": "LinkedField",
    "name": "delete_invoice",
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
    "name": "useDeleteInvoiceMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteInvoiceMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3712e3031d657196f12b6290efadcc3b",
    "id": null,
    "metadata": {},
    "name": "useDeleteInvoiceMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteInvoiceMutation(\n  $id: ID!\n) {\n  delete_invoice(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "1b6b36e07eff275a518fa06465d31f09";

export default node;
