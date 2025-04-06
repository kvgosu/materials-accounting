// libs/graphql/src/operations/queries/PriceListQueries.ts
import { graphql } from 'react-relay';

export const PriceListsQuery = graphql`
  query PriceListQueriesQuery(
    $skip: Int, 
    $limit: Int, 
    $supplier_id: ID,
    $is_active: Boolean,
    $date_from: String,
    $date_to: String
  ) {
    price_lists(
      skip: $skip, 
      limit: $limit, 
      supplier_id: $supplier_id,
      is_active: $is_active,
      date_from: $date_from,
      date_to: $date_to
    ) {
      ...PriceListFragments_list
    }
  }
`;

export const PriceListQuery = graphql`
  query PriceListQueriesPriceListQuery($id: ID!) {
    price_list(id: $id) {
      ...PriceListFragments_priceListDetails
    }
  }
`;

export const PriceListItemsQuery = graphql`
  query PriceListQueriesItemsQuery(
    $price_list_id: ID!,
    $search: String,
    $skip: Int,
    $limit: Int
  ) {
    price_list_items(
      price_list_id: $price_list_id,
      search: $search,
      skip: $skip,
      limit: $limit
    ) {
      ...PriceListFragments_priceListItemList
    }
  }
`;

export const CurrentMaterialPriceQuery = graphql`
  query PriceListQueriesCurrentMaterialPriceQuery($material_id: ID!, $supplier_id: ID!) {
    current_material_price(material_id: $material_id, supplier_id: $supplier_id) {
      ...PriceListFragments_currentMaterialPrice
    }
  }
`;