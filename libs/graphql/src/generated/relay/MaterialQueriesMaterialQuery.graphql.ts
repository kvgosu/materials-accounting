/**
 * @generated SignedSource<<0bacafaf042c0001be05fc0ad42f5dde>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MaterialQueriesMaterialQuery$variables = {
  id: string;
};
export type MaterialQueriesMaterialQuery$data = {
  readonly material: {
    readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_materialDetails">;
  } | null | undefined;
};
export type MaterialQueriesMaterialQuery = {
  response: MaterialQueriesMaterialQuery$data;
  variables: MaterialQueriesMaterialQuery$variables;
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
    "name": "MaterialQueriesMaterialQuery",
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
    "name": "MaterialQueriesMaterialQuery",
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
    "cacheID": "dfbf2cc3785213822c4cdf5c70536543",
    "id": null,
    "metadata": {},
    "name": "MaterialQueriesMaterialQuery",
    "operationKind": "query",
    "text": "query MaterialQueriesMaterialQuery(\n  $id: ID!\n) {\n  material(id: $id) {\n    ...MaterialFragments_materialDetails\n    id\n  }\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment MaterialFragments_materialDetails on Material {\n  ...MaterialFragments_material\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "dee516e26c3b3b9b99851b0845702df5";

export default node;
