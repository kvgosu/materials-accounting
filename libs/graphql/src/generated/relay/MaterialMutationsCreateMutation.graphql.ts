/**
 * @generated SignedSource<<efcc7c72cbb4c23f63597bd6642fc5ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateMaterialInput = {
  description?: string | null | undefined;
  name: string;
  unit: string;
};
export type MaterialMutationsCreateMutation$variables = {
  input: CreateMaterialInput;
};
export type MaterialMutationsCreateMutation$data = {
  readonly create_material: {
    readonly material: {
      readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_materialDetails">;
    };
  };
};
export type MaterialMutationsCreateMutation = {
  response: MaterialMutationsCreateMutation$data;
  variables: MaterialMutationsCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MaterialMutationsCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateMaterialPayload",
        "kind": "LinkedField",
        "name": "create_material",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MaterialMutationsCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateMaterialPayload",
        "kind": "LinkedField",
        "name": "create_material",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bb4474c7a6575fa48dc864a5b3168f0b",
    "id": null,
    "metadata": {},
    "name": "MaterialMutationsCreateMutation",
    "operationKind": "mutation",
    "text": "mutation MaterialMutationsCreateMutation(\n  $input: CreateMaterialInput!\n) {\n  create_material(input: $input) {\n    material {\n      ...MaterialFragments_materialDetails\n      id\n    }\n  }\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment MaterialFragments_materialDetails on Material {\n  ...MaterialFragments_material\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "36439a5501de1d58e992dea3fb9c982e";

export default node;
