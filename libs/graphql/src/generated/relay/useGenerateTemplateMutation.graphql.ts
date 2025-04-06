/**
 * @generated SignedSource<<2c59f436b9147347057aa38d2fb28741>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useGenerateTemplateMutation$variables = {
  supplier_id: string;
};
export type useGenerateTemplateMutation$data = {
  readonly generate_template: {
    readonly download_url: string;
  };
};
export type useGenerateTemplateMutation = {
  response: useGenerateTemplateMutation$data;
  variables: useGenerateTemplateMutation$variables;
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
    "name": "useGenerateTemplateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useGenerateTemplateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6a592e759c35dcb57d9c94cabb9dd635",
    "id": null,
    "metadata": {},
    "name": "useGenerateTemplateMutation",
    "operationKind": "mutation",
    "text": "mutation useGenerateTemplateMutation(\n  $supplier_id: ID!\n) {\n  generate_template(supplier_id: $supplier_id) {\n    download_url\n  }\n}\n"
  }
};
})();

(node as any).hash = "82489c356d18878b64d652709b07ea30";

export default node;
