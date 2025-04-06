// libs/graphql/src/operations/mutations/PriceListMutations.ts
import { graphql } from 'react-relay';

export const UploadPriceListMutation = graphql`
  mutation PriceListMutationsUploadMutation($input: UploadPriceListInput!) {
    upload_price_list(input: $input) {
      price_list {
        ...PriceListFragments_priceListDetails
      }
      processed_items
      skipped_items
    }
  }
`;

export const DeactivatePriceListMutation = graphql`
  mutation PriceListMutationsDeactivateMutation($id: ID!) {
    deactivate_price_list(id: $id) {
      success
    }
  }
`;

export const ActivatePriceListMutation = graphql`
  mutation PriceListMutationsActivateMutation($id: ID!) {
    activate_price_list(id: $id) {
      success
    }
  }
`;

export const GenerateTemplateMutation = graphql`
  mutation PriceListMutationsGenerateTemplateMutation($supplier_id: ID!) {
    generate_template(supplier_id: $supplier_id) {
      download_url
    }
  }
`;

export const LinkItemToMaterialMutation = graphql`
  mutation PriceListMutationsLinkItemToMaterialMutation($item_id: ID!, $material_id: ID!) {
    link_price_list_item_to_material(item_id: $item_id, material_id: $material_id) {
      item {
        ...PriceListFragments_priceListItemDetails
      }
      material {
        ...MaterialFragments_materialDetails
      }
    }
  }
`;

export const UpdatePriceListItemMutation = graphql`
  mutation PriceListMutationsUpdateItemMutation($item_id: ID!, $input: UpdatePriceListItemInput!) {
    update_price_list_item(item_id: $item_id, input: $input) {
      item {
        ...PriceListFragments_priceListItemDetails
      }
    }
  }
`;