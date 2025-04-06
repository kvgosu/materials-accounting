/**
 * @generated SignedSource<<fca135fd0e419de411e112af4123fdec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceListQueriesCurrentMaterialPriceQuery$variables = {
  material_id: string;
  supplier_id: string;
};
export type PriceListQueriesCurrentMaterialPriceQuery$data = {
  readonly current_material_price: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_currentMaterialPrice">;
  } | null | undefined;
};
export type PriceListQueriesCurrentMaterialPriceQuery = {
  response: PriceListQueriesCurrentMaterialPriceQuery$data;
  variables: PriceListQueriesCurrentMaterialPriceQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "material_id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "supplier_id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "material_id",
    "variableName": "material_id"
  },
  {
    "kind": "Variable",
    "name": "supplier_id",
    "variableName": "supplier_id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PriceListQueriesCurrentMaterialPriceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PriceListItem",
        "kind": "LinkedField",
        "name": "current_material_price",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PriceListFragments_currentMaterialPrice"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PriceListQueriesCurrentMaterialPriceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PriceListItem",
        "kind": "LinkedField",
        "name": "current_material_price",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "price",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "vat_rate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "availability",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "supplier_code",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SupplierPriceList",
            "kind": "LinkedField",
            "name": "price_list",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
                "name": "is_active",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Supplier",
                "kind": "LinkedField",
                "name": "supplier",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Material",
            "kind": "LinkedField",
            "name": "material",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
    "cacheID": "98d5748cd5d3dec6d3397c44e54318ea",
    "id": null,
    "metadata": {},
    "name": "PriceListQueriesCurrentMaterialPriceQuery",
    "operationKind": "query",
    "text": "query PriceListQueriesCurrentMaterialPriceQuery(\n  $material_id: ID!\n  $supplier_id: ID!\n) {\n  current_material_price(material_id: $material_id, supplier_id: $supplier_id) {\n    ...PriceListFragments_currentMaterialPrice\n    id\n  }\n}\n\nfragment PriceListFragments_currentMaterialPrice on PriceListItem {\n  id\n  price\n  vat_rate\n  availability\n  supplier_code\n  created_at\n  updated_at\n  price_list {\n    id\n    date\n    is_active\n    supplier {\n      id\n      name\n    }\n  }\n  material {\n    id\n    name\n    unit\n    description\n  }\n}\n"
  }
};
})();

(node as any).hash = "00aae9e1f629900c364d6cbf69db1093";

export default node;
