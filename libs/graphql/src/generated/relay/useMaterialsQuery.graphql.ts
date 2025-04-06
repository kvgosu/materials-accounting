/**
 * @generated SignedSource<<fe99107096aae292a48b67ce36f74c76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useMaterialsQuery$variables = {
  limit?: number | null | undefined;
  search?: string | null | undefined;
  skip?: number | null | undefined;
};
export type useMaterialsQuery$data = {
  readonly materials: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_list">;
  }>;
};
export type useMaterialsQuery = {
  response: useMaterialsQuery$data;
  variables: useMaterialsQuery$variables;
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
    "name": "useMaterialsQuery",
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
    "name": "useMaterialsQuery",
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
    "cacheID": "cbe3482eb85e4f8c7976a5c7267343d6",
    "id": null,
    "metadata": {},
    "name": "useMaterialsQuery",
    "operationKind": "query",
    "text": "query useMaterialsQuery(\n  $skip: Int\n  $limit: Int\n  $search: String\n) {\n  materials(skip: $skip, limit: $limit, search: $search) {\n    ...MaterialFragments_list\n    id\n  }\n}\n\nfragment MaterialFragments_list on Material {\n  id\n  name\n  unit\n  description\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "86e6528a97c771a963d39ab67820b005";

export default node;
