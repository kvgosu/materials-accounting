/**
 * @generated SignedSource<<4d96d797d0b7b6a6370bf8b2481db5a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PriceListMutationsGenerateTemplateMutation$variables = {
  supplier_id: string;
};
export type PriceListMutationsGenerateTemplateMutation$data = {
  readonly generate_template: {
    readonly download_url: string;
  };
};
export type PriceListMutationsGenerateTemplateMutation = {
  response: PriceListMutationsGenerateTemplateMutation$data;
  variables: PriceListMutationsGenerateTemplateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "supplier_id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "supplier_id",
        "variableName": "supplier_id"
      }
    ],
    "concreteType": "GenerateTemplatePayload",
    "kind": "LinkedField",
    "name": "generate_template",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "download_url",
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
    "name": "PriceListMutationsGenerateTemplateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PriceListMutationsGenerateTemplateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e414f7129766de38586f07ea5ea7aad9",
    "id": null,
    "metadata": {},
    "name": "PriceListMutationsGenerateTemplateMutation",
    "operationKind": "mutation",
    "text": "mutation PriceListMutationsGenerateTemplateMutation(\n  $supplier_id: ID!\n) {\n  generate_template(supplier_id: $supplier_id) {\n    download_url\n  }\n}\n"
  }
};
})();

(node as any).hash = "89e41b821a97f25652e11fc0b5572073";

export default node;
