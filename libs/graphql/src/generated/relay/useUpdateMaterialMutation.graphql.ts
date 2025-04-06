/**
 * @generated SignedSource<<960d0829aa97df236bde1e3f7953a94c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateMaterialInput = {
  description?: string | null | undefined;
  name?: string | null | undefined;
  unit?: string | null | undefined;
};
export type useUpdateMaterialMutation$variables = {
  id: string;
  input: UpdateMaterialInput;
};
export type useUpdateMaterialMutation$data = {
  readonly update_material: {
    readonly material: {
      readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_materialDetails">;
    };
  };
};
export type useUpdateMaterialMutation = {
  response: useUpdateMaterialMutation$data;
  variables: useUpdateMaterialMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
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
    "name": "useUpdateMaterialMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMaterialPayload",
        "kind": "LinkedField",
        "name": "update_material",
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
    "name": "useUpdateMaterialMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateMaterialPayload",
        "kind": "LinkedField",
        "name": "update_material",
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
    "cacheID": "ecb08579c2af83b076019146981face4",
    "id": null,
    "metadata": {},
    "name": "useUpdateMaterialMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateMaterialMutation(\n  $id: ID!\n  $input: UpdateMaterialInput!\n) {\n  update_material(id: $id, input: $input) {\n    material {\n      ...MaterialFragments_materialDetails\n      id\n    }\n  }\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment MaterialFragments_materialDetails on Material {\n  ...MaterialFragments_material\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "f1431b75658a8d4f8614d39fbec08764";

export default node;
