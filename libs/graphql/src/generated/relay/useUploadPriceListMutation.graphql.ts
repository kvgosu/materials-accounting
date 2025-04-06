/**
 * @generated SignedSource<<95de404d6978e59ca83dd744158cf673>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadPriceListInput = {
  date: string;
  file: any;
  supplier_id: string;
};
export type useUploadPriceListMutation$variables = {
  input: UploadPriceListInput;
};
export type useUploadPriceListMutation$data = {
  readonly upload_price_list: {
    readonly price_list: {
      readonly " $fragmentSpreads": FragmentRefs<"PriceListFragments_priceListDetails">;
    };
    readonly processed_items: number;
    readonly skipped_items: number;
  };
};
export type useUploadPriceListMutation = {
  response: useUploadPriceListMutation$data;
  variables: useUploadPriceListMutation$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "processed_items",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "skipped_items",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUploadPriceListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UploadPriceListPayload",
        "kind": "LinkedField",
        "name": "upload_price_list",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SupplierPriceList",
            "kind": "LinkedField",
            "name": "price_list",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PriceListFragments_priceListDetails"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
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
    "name": "useUploadPriceListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UploadPriceListPayload",
        "kind": "LinkedField",
        "name": "upload_price_list",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SupplierPriceList",
            "kind": "LinkedField",
            "name": "price_list",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
                "concreteType": "Supplier",
                "kind": "LinkedField",
                "name": "supplier",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
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
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e03002abdc66e0a764633ebd2bdbee7c",
    "id": null,
    "metadata": {},
    "name": "useUploadPriceListMutation",
    "operationKind": "mutation",
    "text": "mutation useUploadPriceListMutation(\n  $input: UploadPriceListInput!\n) {\n  upload_price_list(input: $input) {\n    price_list {\n      ...PriceListFragments_priceListDetails\n      id\n    }\n    processed_items\n    skipped_items\n  }\n}\n\nfragment PriceListFragments_priceList on SupplierPriceList {\n  id\n  date\n  file_name\n  is_active\n  created_at\n  updated_at\n}\n\nfragment PriceListFragments_priceListDetails on SupplierPriceList {\n  ...PriceListFragments_priceList\n  supplier {\n    ...SupplierFragments_supplier\n    id\n  }\n}\n\nfragment SupplierFragments_supplier on Supplier {\n  id\n  name\n  contact_person\n  phone\n  email\n  address\n}\n"
  }
};
})();

(node as any).hash = "29bf9d232993a2d1a0a41d332835ce99";

export default node;
