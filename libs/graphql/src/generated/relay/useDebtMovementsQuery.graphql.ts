/**
 * @generated SignedSource<<a458c8a68f6a3f3c2ba0af0d37be00c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DebtDimension = "CLIENT_DEBT" | "SUPPLIER_DEBT" | "%future added value";
export type useDebtMovementsQuery$variables = {
  client_id?: string | null | undefined;
  dimension?: DebtDimension | null | undefined;
  limit?: number | null | undefined;
  period_from?: string | null | undefined;
  period_to?: string | null | undefined;
  skip?: number | null | undefined;
  supplier_id?: string | null | undefined;
};
export type useDebtMovementsQuery$data = {
  readonly debt_movements: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"DebtFragments_debtMovementList">;
  }>;
};
export type useDebtMovementsQuery = {
  response: useDebtMovementsQuery$data;
  variables: useDebtMovementsQuery$variables;
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
  "name": "limit"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "period_from"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "period_to"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "supplier_id"
},
v7 = [
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
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "period_from",
    "variableName": "period_from"
  },
  {
    "kind": "Variable",
    "name": "period_to",
    "variableName": "period_to"
  },
  {
    "kind": "Variable",
    "name": "skip",
    "variableName": "skip"
  },
  {
    "kind": "Variable",
    "name": "supplier_id",
    "variableName": "supplier_id"
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = [
  (v8/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useDebtMovementsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "DebtMovement",
        "kind": "LinkedField",
        "name": "debt_movements",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DebtFragments_debtMovementList"
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
      (v5/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v6/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "useDebtMovementsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "DebtMovement",
        "kind": "LinkedField",
        "name": "debt_movements",
        "plural": true,
        "selections": [
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "period",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "document_id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "document_type",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "amount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "direction",
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
            "concreteType": "Client",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Supplier",
            "kind": "LinkedField",
            "name": "supplier",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "created_at",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "16d7533a8b60fd182a5579351e3856b1",
    "id": null,
    "metadata": {},
    "name": "useDebtMovementsQuery",
    "operationKind": "query",
    "text": "query useDebtMovementsQuery(\n  $skip: Int\n  $limit: Int\n  $client_id: ID\n  $supplier_id: ID\n  $dimension: DebtDimension\n  $period_from: String\n  $period_to: String\n) {\n  debt_movements(skip: $skip, limit: $limit, client_id: $client_id, supplier_id: $supplier_id, dimension: $dimension, period_from: $period_from, period_to: $period_to) {\n    ...DebtFragments_debtMovementList\n    id\n  }\n}\n\nfragment ClientFragments_client on Client {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n\nfragment DebtFragments_debtMovementList on DebtMovement {\n  id\n  period\n  document_id\n  document_type\n  amount\n  direction\n  dimension\n  client {\n    ...ClientFragments_client\n    id\n  }\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n  created_at\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n"
  }
};
})();

(node as any).hash = "10d651953626c8e7e76712f4e5b7e54a";

export default node;
