/**
 * @generated SignedSource<<2c0202acb2d6bc68a38a6bc0bd0a38bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdatePriceListItemInput = {
  article?: string | null | undefined;
  availability?: number | null | undefined;
  barcode?: string | null | undefined;
  description?: string | null | undefined;
  material_id?: string | null | undefined;
  name?: string | null | undefined;
  price?: number | null | undefined;
  supplier_code?: string | null | undefined;
  vat_rate?: number | null | undefined;
};
export type PriceListMutationsUpdateItemMutation$variables = {
  input: UpdatePriceListItemInput;
  item_id: string;
};
export type PriceListMutationsUpdateItemMutation$data = {
  readonly update_price_list_item: {
    readonly item: {
      readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceListItemDetails">;
    };
  };
};
export type PriceListMutationsUpdateItemMutation = {
  response: PriceListMutationsUpdateItemMutation$data;
  variables: PriceListMutationsUpdateItemMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "item_id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  },
  {
    "kind": "Variable",
    "name": "item_id",
    "variableName": "item_id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updated_at",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PriceListMutationsUpdateItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdatePriceListItemPayload",
        "kind": "LinkedField",
        "name": "update_price_list_item",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PriceListItem",
            "kind": "LinkedField",
            "name": "item",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PriceListFragments_priceListItemDetails"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "PriceListMutationsUpdateItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdatePriceListItemPayload",
        "kind": "LinkedField",
        "name": "update_price_list_item",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PriceListItem",
            "kind": "LinkedField",
            "name": "item",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "article",
                "storageKey": null
              },
              (v5/*: any*/),
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
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "SupplierPriceList",
                "kind": "LinkedField",
                "name": "price_list",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
                    "name": "file_name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "is_active",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/)
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "unit",
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
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
    "cacheID": "503922c1ffa9e3b62f12e6f162803409",
    "id": null,
    "metadata": {},
    "name": "PriceListMutationsUpdateItemMutation",
    "operationKind": "mutation",
    "text": "mutation PriceListMutationsUpdateItemMutation(\n  $item_id: ID!\n  $input: UpdatePriceListItemInput!\n) {\n  update_price_list_item(item_id: $item_id, input: $input) {\n    item {\n      ...PriceListFragments_priceListItemDetails\n      id\n    }\n  }\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment PriceListFragments_priceList on SupplierPriceList {\n  id\n  date\n  file_name\n  is_active\n  created_at\n  updated_at\n}\n\nfragment PriceListFragments_priceListItem on PriceListItem {\n  id\n  supplier_code\n  barcode\n  name\n  article\n  description\n  vat_rate\n  price\n  availability\n  created_at\n  updated_at\n}\n\nfragment PriceListFragments_priceListItemDetails on PriceListItem {\n  ...PriceListFragments_priceListItem\n  price_list {\n    ...PriceListFragments_priceList\n    id\n  }\n  material {\n    ...MaterialFragments_material\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9c9983fa93d370934b469a4c08753fe4";

export default node;
