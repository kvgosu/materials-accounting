/**
 * @generated SignedSource<<7f8bcae3aaaf8fb389ab69499f652ae1>>
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
export type MaterialMutationsUpdateMutation$variables = {
  id: string;
  input: UpdateMaterialInput;
};
export type MaterialMutationsUpdateMutation$data = {
  readonly update_material: {
    readonly material: {
      readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_materialDetails">;
    };
  };
};
export type MaterialMutationsUpdateMutation = {
  response: MaterialMutationsUpdateMutation$data;
  variables: MaterialMutationsUpdateMutation$variables;
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
    "name": "MaterialMutationsUpdateMutation",
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
    "name": "MaterialMutationsUpdateMutation",
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
    "cacheID": "5a7567166bcde8b5c3ff3d3673b06941",
    "id": null,
    "metadata": {},
    "name": "MaterialMutationsUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MaterialMutationsUpdateMutation(\n  $id: ID!\n  $input: UpdateMaterialInput!\n) {\n  update_material(id: $id, input: $input) {\n    material {\n      ...MaterialFragments_materialDetails\n      id\n    }\n  }\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment MaterialFragments_materialDetails on Material {\n  ...MaterialFragments_material\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "7006ca525e7c2255c2ec61c80d5f9cb4";

export default node;
