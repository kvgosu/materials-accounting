/**
 * @generated SignedSource<<2ed89901c4dd008bf3d146fd886a5e51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useMaterialQuery$variables = {
  id: string;
};
export type useMaterialQuery$data = {
  readonly material: {
    readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_materialDetails">;
  } | null | undefined;
};
export type useMaterialQuery = {
  response: useMaterialQuery$data;
  variables: useMaterialQuery$variables;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMaterialQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Material",
        "kind": "LinkedField",
        "name": "material",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MaterialFragments_materialDetails"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMaterialQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Material",
        "kind": "LinkedField",
        "name": "material",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unit",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "created_at",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updated_at",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6c3bac114c5362336fa2522845a0e36a",
    "id": null,
    "metadata": {},
    "name": "useMaterialQuery",
    "operationKind": "query",
    "text": "query useMaterialQuery(\n  $id: ID!\n) {\n  material(id: $id) {\n    ...MaterialFragments_materialDetails\n    id\n  }\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment MaterialFragments_materialDetails on Material {\n  ...MaterialFragments_material\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "d212e8bdfc77dd805e071924f5b5ef07";

export default node;
