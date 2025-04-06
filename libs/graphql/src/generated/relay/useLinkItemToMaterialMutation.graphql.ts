/**
 * @generated SignedSource<<dad8235285d13de28e1e8f4b21060f78>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useLinkItemToMaterialMutation$variables = {
  item_id: string;
  material_id: string;
};
export type useLinkItemToMaterialMutation$data = {
  readonly link_price_list_item_to_material: {
    readonly item: {
      readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceListItemDetails">;
    };
    readonly material: {
      readonly " $fragmentSpreads": FragmentRefs<"MaterialFragments_materialDetails">;
    };
  };
};
export type useLinkItemToMaterialMutation = {
  response: useLinkItemToMaterialMutation$data;
  variables: useLinkItemToMaterialMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "item_id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "material_id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "item_id",
    "variableName": "item_id"
  },
  {
    "kind": "Variable",
    "name": "material_id",
    "variableName": "material_id"
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updated_at",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unit",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useLinkItemToMaterialMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LinkItemToMaterialPayload",
        "kind": "LinkedField",
        "name": "link_price_list_item_to_material",
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
          },
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
    "name": "useLinkItemToMaterialMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LinkItemToMaterialPayload",
        "kind": "LinkedField",
        "name": "link_price_list_item_to_material",
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
              (v2/*: any*/),
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "article",
                "storageKey": null
              },
              (v4/*: any*/),
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
              (v5/*: any*/),
              (v6/*: any*/),
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
                  (v5/*: any*/),
                  (v6/*: any*/)
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
                  (v7/*: any*/),
                  (v4/*: any*/)
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
              (v7/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "593f13a2e08b62e3fd64b62fbfe84acd",
    "id": null,
    "metadata": {},
    "name": "useLinkItemToMaterialMutation",
    "operationKind": "mutation",
    "text": "mutation useLinkItemToMaterialMutation(\n  $item_id: ID!\n  $material_id: ID!\n) {\n  link_price_list_item_to_material(item_id: $item_id, material_id: $material_id) {\n    item {\n      ...PriceListFragments_priceListItemDetails\n      id\n    }\n    material {\n      ...MaterialFragments_materialDetails\n      id\n    }\n  }\n}\n\nfragment MaterialFragments_material on Material {\n  id\n  name\n  unit\n  description\n}\n\nfragment MaterialFragments_materialDetails on Material {\n  ...MaterialFragments_material\n  created_at\n  updated_at\n}\n\nfragment PriceListFragments_priceList on SupplierPriceList {\n  id\n  date\n  file_name\n  is_active\n  created_at\n  updated_at\n}\n\nfragment PriceListFragments_priceListItem on PriceListItem {\n  id\n  supplier_code\n  barcode\n  name\n  article\n  description\n  vat_rate\n  price\n  availability\n  created_at\n  updated_at\n}\n\nfragment PriceListFragments_priceListItemDetails on PriceListItem {\n  ...PriceListFragments_priceListItem\n  price_list {\n    ...PriceListFragments_priceList\n    id\n  }\n  material {\n    ...MaterialFragments_material\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d53ea3799b14a05d8f4535e76e7af9b4";

export default node;
