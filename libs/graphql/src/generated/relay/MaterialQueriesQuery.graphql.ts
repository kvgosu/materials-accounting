/**
 * @generated SignedSource<<17495979e48325cd96f84fe89aeac93f>>
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
    readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_list">;
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
            "name": "MaterialFragments_list"
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
    "cacheID": "f4e92ddbed87800ec2b8b404527bd645",
    "id": null,
    "metadata": {},
    "name": "MaterialQueriesQuery",
    "operationKind": "query",
    "text": "query MaterialQueriesQuery(\n  $skip: Int\n  $limit: Int\n  $search: String\n) {\n  materials(skip: $skip, limit: $limit, search: $search) {\n    ...MaterialFragments_list\n    id\n  }\n}\n\nfragment MaterialFragments_list on Material {\n  id\n  name\n  unit\n  description\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "175a4b79021ccbaafc4e3c10e7e888aa";

export default node;
