/**
 * @generated SignedSource<<edcd85f1b6845955c3b2aadf3e031f70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type usePriceListItemsQuery$variables = {
  limit?: number | null | undefined;
  price_list_id: string;
  search?: string | null | undefined;
  skip?: number | null | undefined;
};
export type usePriceListItemsQuery$data = {
  readonly price_list_items: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceListItemList">;
  }>;
};
export type usePriceListItemsQuery = {
  response: usePriceListItemsQuery$data;
  variables: usePriceListItemsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "price_list_id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "skip"
},
v4 = [
  {
    "kind": "Variable",
    "name": "limit",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "price_list_id",
    "variableName": "price_list_id"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search"
  },
  {
    "kind": "Variable",
    "name": "skip",
    "variableName": "skip"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
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
    "name": "usePriceListItemsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "PriceListItem",
        "kind": "LinkedField",
        "name": "price_list_items",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PriceListFragments_priceListItemList"
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
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "usePriceListItemsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "PriceListItem",
        "kind": "LinkedField",
        "name": "price_list_items",
        "plural": true,
        "selections": [
          (v5/*: any*/),
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
            "name": "barcode",
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "article",
            "storageKey": null
          },
          (v7/*: any*/),
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
            "name": "price",
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
            "concreteType": "Material",
            "kind": "LinkedField",
            "name": "material",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unit",
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4057ab4401acdc45af8975e3c5bb6281",
    "id": null,
    "metadata": {},
    "name": "usePriceListItemsQuery",
    "operationKind": "query",
    "text": "query usePriceListItemsQuery(\n  $price_list_id: ID!\n  $skip: Int\n  $limit: Int\n  $search: String\n) {\n  price_list_items(price_list_id: $price_list_id, skip: $skip, limit: $limit, search: $search) {\n    ...PriceListFragments_priceListItemList\n    id\n  }\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment PriceListFragments_priceListItemList on PriceListItem {\n  id\n  supplier_code\n  barcode\n  name\n  article\n  description\n  vat_rate\n  price\n  availability\n  created_at\n  updated_at\n  material {\n    ...MaterialFragments_material\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4b6435ea4dcd64275b84e8bfa29954cc";

export default node;
