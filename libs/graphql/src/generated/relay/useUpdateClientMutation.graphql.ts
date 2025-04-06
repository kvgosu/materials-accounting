/**
 * @generated SignedSource<<2b1a1926398914cf4188aa7306b7a5ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateClientInput = {
  address?: string | null | undefined;
  contact_person?: string | null | undefined;
  email?: string | null | undefined;
  name?: string | null | undefined;
  phone?: string | null | undefined;
};
export type useUpdateClientMutation$variables = {
  id: string;
  input: UpdateClientInput;
};
export type useUpdateClientMutation$data = {
  readonly update_client: {
    readonly client: {
      readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_clientDetails">;
    };
  };
};
export type useUpdateClientMutation = {
  response: useUpdateClientMutation$data;
  variables: useUpdateClientMutation$variables;
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
    "name": "useUpdateClientMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateClientPayload",
        "kind": "LinkedField",
        "name": "update_client",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ClientFragments_clientDetails"
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
    "name": "useUpdateClientMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateClientPayload",
        "kind": "LinkedField",
        "name": "update_client",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
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
                "name": "contact_person",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "phone",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "address",
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
    "cacheID": "abb07f5c3b577382b0988fd5db52833c",
    "id": null,
    "metadata": {},
    "name": "useUpdateClientMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateClientMutation(\n  $id: ID!\n  $input: UpdateClientInput!\n) {\n  update_client(id: $id, input: $input) {\n    client {\n      ...ClientFragments_clientDetails\n      id\n    }\n  }\n}\n\nfragment ClientFragments_clientDetails on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "1985f909c1a2d122b72a6690342cfcc4";

export default node;
