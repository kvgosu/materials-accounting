/**
 * @generated SignedSource<<7bb25c03d0d075029bd11f8f3d75badb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type InvoiceMutationsDeleteMutation$variables = {
  id: string;
};
export type InvoiceMutationsDeleteMutation$data = {
  readonly delete_invoice: {
    readonly success: boolean;
  };
};
export type InvoiceMutationsDeleteMutation = {
  response: InvoiceMutationsDeleteMutation$data;
  variables: InvoiceMutationsDeleteMutation$variables;
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
    "name": "InvoiceMutationsDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InvoiceMutationsDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8f28a904e4728efd7b3a1ae54fd44a61",
    "id": null,
    "metadata": {},
    "name": "InvoiceMutationsDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation InvoiceMutationsDeleteMutation(\n  $id: ID!\n) {\n  delete_invoice(id: $id) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "e4accce9c82c67f557fb6ef624c3842e";

export default node;
