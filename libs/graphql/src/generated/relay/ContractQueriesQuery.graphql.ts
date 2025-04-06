/**
 * @generated SignedSource<<e30e2d94f66a572a513d2c4c1586e1f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContractStatus = "ACTIVE" | "INACTIVE" | "%future added value";
export type ContractQueriesQuery$variables = {
  client_id?: string | null | undefined;
  limit?: number | null | undefined;
  skip?: number | null | undefined;
  status?: ContractStatus | null | undefined;
};
export type ContractQueriesQuery$data = {
  readonly contracts: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ContractFragments_list">;
  }>;
};
export type ContractQueriesQuery = {
  response: ContractQueriesQuery$data;
  variables: ContractQueriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "client_id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "status"
},
v4 = [
  {
    "kind": "Variable",
    "name": "client_id",
    "variableName": "client_id"
  },
  {
    "kind": "Variable",
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "skip",
    "variableName": "skip"
  },
  {
    "kind": "Variable",
    "name": "status",
    "variableName": "status"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ContractQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Contract",
        "kind": "LinkedField",
        "name": "contracts",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ContractFragments_list"
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
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "ContractQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Contract",
        "kind": "LinkedField",
        "name": "contracts",
        "plural": true,
        "selections": [
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "number",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "markup_percentage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "expiration_date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": [
              (v5/*: any*/),
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
              }
            ],
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
    "cacheID": "240908289dfc50f1f9e760ad47b44241",
    "id": null,
    "metadata": {},
    "name": "ContractQueriesQuery",
    "operationKind": "query",
    "text": "query ContractQueriesQuery(\n  $skip: Int\n  $limit: Int\n  $client_id: ID\n  $status: ContractStatus\n) {\n  contracts(skip: $skip, limit: $limit, client_id: $client_id, status: $status) {\n    ...ContractFragments_list\n    id\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment ContractFragments_list on Contract {\n  id\n  number\n  date\n  markup_percentage\n  expiration_date\n  client {\n    ...ClientFragments_client\n    id\n  }\n  created_at\n  updated_at\n}\n"
  }
};
})();

(node as any).hash = "de8d44c701346443d99efd08291ea5c2";

export default node;
