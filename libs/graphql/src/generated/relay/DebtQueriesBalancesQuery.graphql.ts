/**
 * @generated SignedSource<<2ef0350cd66db0ea742446a06a6b107d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DebtDimension = "CLIENT_DEBT" | "SUPPLIER_DEBT" | "%future added value";
export type DebtQueriesBalancesQuery$variables = {
  as_of_date?: string | null | undefined;
  client_id?: string | null | undefined;
  dimension?: DebtDimension | null | undefined;
  supplier_id?: string | null | undefined;
};
export type DebtQueriesBalancesQuery$data = {
  readonly debt_balances: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtBalanceList">;
  }>;
};
export type DebtQueriesBalancesQuery = {
  response: DebtQueriesBalancesQuery$data;
  variables: DebtQueriesBalancesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "as_of_date"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "client_id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "dimension"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "supplier_id"
},
v4 = [
  {
    "kind": "Variable",
    "name": "as_of_date",
    "variableName": "as_of_date"
  },
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
    "name": "supplier_id",
    "variableName": "supplier_id"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v5/*: any*/),
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
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DebtQueriesBalancesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "DebtBalance",
        "kind": "LinkedField",
        "name": "debt_balances",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DebtFragments_debtBalanceList"
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
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DebtQueriesBalancesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "DebtBalance",
        "kind": "LinkedField",
        "name": "debt_balances",
        "plural": true,
        "selections": [
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Supplier",
            "kind": "LinkedField",
            "name": "supplier",
            "plural": false,
            "selections": (v6/*: any*/),
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
            "name": "balance",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "as_of_date",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fa0e9ef7fd4aa867dfc2d1d2512bc908",
    "id": null,
    "metadata": {},
    "name": "DebtQueriesBalancesQuery",
    "operationKind": "query",
    "text": "query DebtQueriesBalancesQuery(\n  $client_id: ID\n  $supplier_id: ID\n  $dimension: DebtDimension\n  $as_of_date: String\n) {\n  debt_balances(client_id: $client_id, supplier_id: $supplier_id, dimension: $dimension, as_of_date: $as_of_date) {\n    ...DebtFragments_debtBalanceList\n    id\n  }\n}\n\nfragment DebtFragments_debtBalanceList on DebtBalance {\n  id\n  client {\n    id\n    name\n  }\n  supplier {\n    id\n    name\n  }\n  dimension\n  balance\n  as_of_date\n}\n"
  }
};
})();

(node as any).hash = "b42b3c3ae0032225fa5d03a1038ce708";

export default node;
