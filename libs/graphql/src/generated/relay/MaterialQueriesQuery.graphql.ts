/**
 * @generated SignedSource<<9f0f1ff00cfcaa3cebdf98b2febd22f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MaterialQueriesQuery$variables = {
  limit?: number | null | undefined;
  search?: string | null | undefined;
  skip?: number | null | undefined;
};
export type MaterialQueriesQuery$data = {
  readonly materials: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_materialDetails">;
  }>;
};
export type MaterialQueriesQuery = {
  response: MaterialQueriesQuery$data;
  variables: MaterialQueriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v3 = [
  {
    "kind": "Variable",
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search"
  },
  {
    "kind": "Variable",
    "name": "skip",
    "variableName": "skip"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MaterialQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Material",
        "kind": "LinkedField",
        "name": "materials",
        "plural": true,
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "MaterialQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Material",
        "kind": "LinkedField",
        "name": "materials",
        "plural": true,
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
    "cacheID": "0c005b2a2b13f74d033f5fde0cc61189",
    "id": null,
    "metadata": {},
    "name": "MaterialQueriesQuery",
    "operationKind": "query",
    "text": "query MaterialQueriesQuery(\n  $skip: Int\n  $limit: Int\n  $search: String\n) {\n  materials(skip: $skip, limit: $limit, search: $search) {\n    ...MaterialFragments_materialDetails\n    id\n  }\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment MaterialFragments_materialDetails on Material {\n  ...MaterialFragments_material\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "823e37a4c75ff45cd19bc96be5232576";

export default node;
