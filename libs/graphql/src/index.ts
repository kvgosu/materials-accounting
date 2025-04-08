// libs/graphql/src/index.ts
import {
  ClientBasic,
  ClientListFragment,
  ClientDetails
} from './operations/fragments/ClientFragments';
import {
  SupplierBasic,
  SupplierListFragment,
  SupplierDetails
} from './operations/fragments/SupplierFragments';
import {
  PriceListBasic,
  PriceListListFragment,
  PriceListDetails,
  PriceListItemBasic,
  PriceListItemListFragment,
  PriceListItemDetails,
  PriceListItemFragment,
  CurrentMaterialPriceFragment
} from './operations/fragments/PriceListFragments';
import {
  ContractBasic,
  ContractListFragment,
  ContractDetails
} from './operations/fragments/ContractFragments';
import {
  MaterialBasic,
  MaterialListFragment,
  MaterialDetails
} from './operations/fragments/MaterialFragments';
import {
  InvoiceBasic,
  InvoiceListFragment,
  InvoiceDetails,
  InvoiceItemDetails,
  InvoiceItemListFragment,
  InvoiceListWithoutStatusFragment
} from './operations/fragments/InvoiceFragments';
import {
  TransactionBasic,
  TransactionListFragment,
  TransactionDetails
} from './operations/fragments/TransactionFragments';
import {
  DebtMovementDetails,
  DebtMovementListFragment,
  DebtBalanceDetails,
  DebtBalanceListFragment,
  DebtTurnoverDetails,
  DebtTurnoverListFragment
} from './operations/fragments/DebtFragments';

export { ClientsQuery, ClientQuery } from './operations/queries/ClientQueries';
export { SuppliersQuery, SupplierQuery } from './operations/queries/SupplierQueries';
export { PriceListsQuery, PriceListQuery, PriceListItemsQuery } from './operations/queries/PriceListQueries';
export { ContractsQuery, ContractQuery } from './operations/queries/ContractQueries';
export { MaterialsQuery, MaterialQuery } from './operations/queries/MaterialQueries';
export { InvoicesQuery, InvoiceQuery } from './operations/queries/InvoiceQueries';
export { TransactionsQuery, TransactionQuery } from './operations/queries/TransactionQueries';
export { DebtBalancesQuery, DebtTurnoversQuery, DebtMovementsQuery } from './operations/queries/DebtQueries';
export { DashboardQuery } from './operations/queries/DashboardQueries';

import {
  ClientMutationsCreateMutation,
  ClientMutationsUpdateMutation,
  ClientMutationsDeleteMutation
} from './operations/mutations/ClientMutations';
export const CreateClientMutation = ClientMutationsCreateMutation;
export const UpdateClientMutation = ClientMutationsUpdateMutation;
export const DeleteClientMutation = ClientMutationsDeleteMutation;

export {
  CreateSupplierMutation,
  UpdateSupplierMutation,
  DeleteSupplierMutation, 
} from './operations/mutations/SupplierMutations';
export {
  UploadPriceListMutation,
  DeactivatePriceListMutation,
  GenerateTemplateMutation,
  LinkItemToMaterialMutation,
  UpdatePriceListItemMutation
} from './operations/mutations/PriceListMutations';

import {
  CreateContractMutation as ContractMutationsCreateMutation,
  UpdateContractMutation as ContractMutationsUpdateMutation,
  DeleteContractMutation as ContractMutationsDeleteMutation
} from './operations/mutations/ContractMutations';
export const CreateContractMutation = ContractMutationsCreateMutation;
export const UpdateContractMutation = ContractMutationsUpdateMutation;
export const DeleteContractMutation = ContractMutationsDeleteMutation;

import {
  CreateMaterialMutation as MaterialMutationsCreateMutation,
  UpdateMaterialMutation as MaterialMutationsUpdateMutation,
  DeleteMaterialMutation as MaterialMutationsDeleteMutation
} from './operations/mutations/MaterialMutations';
export const CreateMaterialMutation = MaterialMutationsCreateMutation;
export const UpdateMaterialMutation = MaterialMutationsUpdateMutation;
export const DeleteMaterialMutation = MaterialMutationsDeleteMutation;

import {
  CreateInvoiceMutation as InvoiceMutationsCreateMutation,
  UpdateInvoiceMutation as InvoiceMutationsUpdateMutation,
  DeleteInvoiceMutation as InvoiceMutationsDeleteMutation,
  ProcessInvoiceMutation as InvoiceMutationsProcessMutation,
  CloseInvoiceMutation as InvoiceMutationsCloseMutation
} from './operations/mutations/InvoiceMutations';
export const CreateInvoiceMutation = InvoiceMutationsCreateMutation;
export const UpdateInvoiceMutation = InvoiceMutationsUpdateMutation;
export const DeleteInvoiceMutation = InvoiceMutationsDeleteMutation;
export const ProcessInvoiceMutation = InvoiceMutationsProcessMutation;
export const CloseInvoiceMutation = InvoiceMutationsCloseMutation;

import {
  RegisterClientPaymentMutation as PaymentMutationsRegisterClientMutation,
  RegisterSupplierPaymentMutation as PaymentMutationsRegisterSupplierMutation
} from './operations/mutations/PaymentMutations';
export const RegisterClientPaymentMutation = PaymentMutationsRegisterClientMutation;
export const RegisterSupplierPaymentMutation = PaymentMutationsRegisterSupplierMutation;

export const ClientFragments_client = ClientBasic;
export const ClientFragments_list = ClientListFragment;
export const ClientFragments_clientDetails = ClientDetails;

export const SupplierFragments_supplier = SupplierBasic;
export const SupplierFragments_list = SupplierListFragment;
export const SupplierFragments_supplierDetails = SupplierDetails;

export const PriceListFragments_priceList = PriceListBasic;
export const PriceListFragments_item = PriceListItemFragment;
export const PriceListFragments_currentMaterialPrice = CurrentMaterialPriceFragment;
export const PriceListFragments_list = PriceListListFragment;
export const PriceListFragments_priceListDetails = PriceListDetails;
export const PriceListFragments_priceListItem = PriceListItemBasic;
export const PriceListFragments_priceListItemList = PriceListItemListFragment;
export const PriceListFragments_priceListItemDetails = PriceListItemDetails;

export const ContractFragments_contract = ContractBasic;
export const ContractFragments_list = ContractListFragment;
export const ContractFragments_contractDetails = ContractDetails;

export const MaterialFragments_material = MaterialBasic;
export const MaterialFragments_list = MaterialListFragment;
export const MaterialFragments_materialDetails = MaterialDetails;

export const InvoiceFragments_invoiceBasic = InvoiceBasic;
export const InvoiceFragments_list = InvoiceListFragment;
export const InvoiceFragments_listWithoutStatus = InvoiceListWithoutStatusFragment;
export const InvoiceFragments_invoiceDetails = InvoiceDetails;
export const InvoiceFragments_invoiceItem = InvoiceItemDetails;
export const InvoiceFragments_invoiceItemList = InvoiceItemListFragment;

export const TransactionFragments_transaction = TransactionBasic;
export const TransactionFragments_list = TransactionListFragment;
export const TransactionFragments_transactionDetails = TransactionDetails;

export const DebtFragments_debtMovement = DebtMovementDetails;
export const DebtFragments_debtMovementList = DebtMovementListFragment;
export const DebtFragments_debtBalance = DebtBalanceDetails;
export const DebtFragments_debtBalanceList = DebtBalanceListFragment;
export const DebtFragments_debtTurnover = DebtTurnoverDetails;
export const DebtFragments_debtTurnoverList = DebtTurnoverListFragment;

export * from './hooks';