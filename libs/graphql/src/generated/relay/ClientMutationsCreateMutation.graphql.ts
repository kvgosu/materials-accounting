/**
 * @generated SignedSource<<1b18f8de7677a062cf8431c7e7dec5b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateClientInput = {
  address?: string | null | undefined;
  contact_person?: string | null | undefined;
  email?: string | null | undefined;
  name: string;
  phone?: string | null | undefined;
};
export type ClientMutationsCreateMutation$variables = {
  input: CreateClientInput;
};
export type ClientMutationsCreateMutation$data = {
  readonly create_client: {
    readonly client: {
      readonly " $fragmentSpreads": FragmentRefs<"ClientFragments_clientDetails">;
    };
  };
};
export type ClientMutationsCreateMutation = {
  response: ClientMutationsCreateMutation$data;
  variables: ClientMutationsCreateMutation$variables;
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
    "name": "ClientMutationsCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateClientPayload",
        "kind": "LinkedField",
        "name": "create_client",
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
    "name": "ClientMutationsCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateClientPayload",
        "kind": "LinkedField",
        "name": "create_client",
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
    "cacheID": "08dcd0d9b528065171d4cb172e3d61b1",
    "id": null,
    "metadata": {},
    "name": "ClientMutationsCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ClientMutationsCreateMutation(\n  $input: CreateClientInput!\n) {\n  create_client(input: $input) {\n    client {\n      ...ClientFragments_clientDetails\n      id\n    }\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment ClientFragments_clientDetails on Client {\n  ...ClientFragments_client\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "7fe2422d62a7fafa18d9f1b6470f2597";

export default node;
