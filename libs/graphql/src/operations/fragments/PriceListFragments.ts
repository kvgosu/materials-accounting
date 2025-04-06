// libs/graphql/src/operations/fragments/PriceListFragments.ts
import { graphql } from 'react-relay';

export const PriceListBasic = graphql`
  fragment PriceListFragments_priceList on SupplierPriceList {
    id
    date
    file_name
    is_active
    created_at
    updated_at
  }
`;

export const PriceListItemFragment = graphql`
  fragment PriceListFragments_item on SupplierPriceList {
    id
    date
    file_name
    is_active
    created_at
    updated_at
    supplier {
      ...SupplierFragments_supplier
    }
  }
`;

export const CurrentMaterialPriceFragment = graphql`
  fragment PriceListFragments_currentMaterialPrice on PriceListItem {
    id
    price
    vat_rate
    availability
    supplier_code
    created_at
    updated_at
    price_list {
      id
      date
      is_active
      supplier {
        id
        name
      }
    }
    material {
      id
      name
      unit
      description
    }
  }
`;

export const PriceListListFragment = graphql`
  fragment PriceListFragments_list on SupplierPriceList @relay(plural: true) {
    id
    date
    file_name
    is_active
    created_at
    updated_at
    supplier {
      ...SupplierFragments_supplier
    }
  }
`;

export const PriceListDetails = graphql`
  fragment PriceListFragments_priceListDetails on SupplierPriceList {
    ...PriceListFragments_priceList
    supplier {
      ...SupplierFragments_supplier
    }
  }
`;

export const PriceListItemBasic = graphql`
  fragment PriceListFragments_priceListItem on PriceListItem {
    id
    supplier_code
    barcode
    name
    article
    description
    vat_rate
    price
    availability
    created_at
    updated_at
  }
`;

export const PriceListItemListFragment = graphql`
  fragment PriceListFragments_priceListItemList on PriceListItem @relay(plural: true) {
    id
    supplier_code
    barcode
    name
    article
    description
    vat_rate
    price
    availability
    created_at
    updated_at
    material {
      ...MaterialFragments_material
    }
  }
`;

export const PriceListItemDetails = graphql`
  fragment PriceListFragments_priceListItemDetails on PriceListItem {
    ...PriceListFragments_priceListItem
    price_list {
      ...PriceListFragments_priceList
    }
    material {
      ...MaterialFragments_material
    }
  }
`;