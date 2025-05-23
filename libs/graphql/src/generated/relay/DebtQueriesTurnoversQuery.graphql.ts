/**
 * @generated SignedSource<<fce9891aaae7dfd8fcb46bf1428c2a9a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DebtDimension = "CLIENT_DEBT" | "SUPPLIER_DEBT" | "%future added value";
export type DebtQueriesTurnoversQuery$variables = {
  client_id?: string | null | undefined;
  dimension?: DebtDimension | null | undefined;
  end_date: string;
  start_date: string;
  supplier_id?: string | null | undefined;
};
export type DebtQueriesTurnoversQuery$data = {
  readonly debt_turnovers: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtTurnoverList">;
  }>;
};
export type DebtQueriesTurnoversQuery = {
  response: DebtQueriesTurnoversQuery$data;
  variables: DebtQueriesTurnoversQuery$variables;
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
  "name": "dimension"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "end_date"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "start_date"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "supplier_id"
},
v5 = [
  {
    "kind": "Variable",
    "name": "client_id",
    "variableName": "client_id"
  },
  {
    "kind": "Variable",
    "name": "dimension",
    "variableName": "dimension"
  },
  {
    "kind": "Variable",
    "name": "end_date",
    "variableName": "end_date"
  },
  {
    "kind": "Variable",
    "name": "start_date",
    "variableName": "start_date"
  },
  {
    "kind": "Variable",
    "name": "supplier_id",
    "variableName": "supplier_id"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v6/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DebtQueriesTurnoversQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "DebtTurnover",
        "kind": "LinkedField",
        "name": "debt_turnovers",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DebtFragments_debtTurnoverList"
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
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "DebtQueriesTurnoversQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "DebtTurnover",
        "kind": "LinkedField",
        "name": "debt_turnovers",
        "plural": true,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Supplier",
            "kind": "LinkedField",
            "name": "supplier",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dimension",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "debit",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "credit",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "balance",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "start_date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "end_date",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6523e55f66edaf16079bfd80e12b1bfc",
    "id": null,
    "metadata": {},
    "name": "DebtQueriesTurnoversQuery",
    "operationKind": "query",
    "text": "query DebtQueriesTurnoversQuery(\n  $client_id: ID\n  $supplier_id: ID\n  $dimension: DebtDimension\n  $start_date: String!\n  $end_date: String!\n) {\n  debt_turnovers(client_id: $client_id, supplier_id: $supplier_id, dimension: $dimension, start_date: $start_date, end_date: $end_date) {\n    ...DebtFragments_debtTurnoverList\n    id\n  }\n}\n\nfragment DebtFragments_debtTurnoverList on DebtTurnover {\n  id\n  client {\n    id\n    name\n  }\n  supplier {\n    id\n    name\n  }\n  dimension\n  debit\n  credit\n  balance\n  start_date\n  end_date\n}\n"
  }
};
})();

(node as any).hash = "aca44382810ef1fdee2335b91ee9468b";

export default node;
