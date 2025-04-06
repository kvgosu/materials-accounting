import { useState, ChangeEvent, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../common/Table';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../common/Select';
import { formatCurrency } from '../../utils';
import { Trash2, Plus, RefreshCw } from 'lucide-react';
import { useCurrentMaterialPrice, PriceListFragments_currentMaterialPrice } from '@materials-accounting/graphql';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../common/Tooltip';
import { useFragment } from 'react-relay';

interface TableMaterialOption {
  id: string;
  name: string;
  unit: string;
}

export interface InvoiceItem {
  id?: string;
  materialId: string;
  materialName?: string;
  unit?: string;
  quantity: number;
  price: number;
  amount: number;
  amountWithMarkup: number;
}

interface NewInvoiceItem {
  materialId: string;
  materialName?: string;
  unit?: string;
  quantity: number;
  price: number;
}

interface InvoiceItemTableProps {
  items: InvoiceItem[];
  materials: TableMaterialOption[]; 
  markupPercentage: number;
  supplierId?: string; 
  readOnly?: boolean;
  onChange: (items: InvoiceItem[]) => void;
  onLoadingChange?: (loading: boolean) => void; 
}

export function InvoiceItemTable({
  items,
  materials,
  markupPercentage,
  supplierId,
  readOnly = false,
  onChange,
  onLoadingChange,
}: InvoiceItemTableProps) {
  const [newItem, setNewItem] = useState<NewInvoiceItem>({
    materialId: '',
    quantity: 1,
    price: 0,
  });
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [materialIdForPrice, setMaterialIdForPrice] = useState<string | null>(null);
  const isValidId = (id: string | undefined | null): boolean => {
    return Boolean(id && id.trim() && id !== 'undefined' && id !== 'null' && id !== '00000000-0000-0000-0000-000000000000');
  };
  const validMaterialId = isValidId(materialIdForPrice);
  const validSupplierId = isValidId(supplierId);
  const materialIdParam = validMaterialId ? materialIdForPrice! : '';
  const supplierIdParam = validSupplierId ? supplierId! : '';
  const { current_material_price: priceDataRaw, loading: priceLoading, error: priceError } =
    useCurrentMaterialPrice(materialIdParam, supplierIdParam);

  const priceData = useFragment(
    PriceListFragments_currentMaterialPrice,
    priceDataRaw
  );

  useEffect(() => {
    const isLoading = priceLoading || loadingPrice;
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [priceLoading, loadingPrice, onLoadingChange, materialIdForPrice]);

  useEffect(() => {
    if (!materialIdForPrice) {
      return;
    }
    if (priceData && priceData.price !== undefined) {
      const itemIndex = items.findIndex(item => String(item.materialId) === String(materialIdForPrice));     
      if (itemIndex !== -1) {
        const updatedItems = [...items];
        const item = { ...updatedItems[itemIndex] };
        const oldPrice = item.price;
        item.price = priceData.price;
        item.amount = calculateAmount(item.quantity, item.price);
        item.amountWithMarkup = calculateAmountWithMarkup(item.amount);
        updatedItems[itemIndex] = item;
        onChange(updatedItems);
      } else {
        if (String(newItem.materialId) === String(materialIdForPrice)) {
          setNewItem(prev => ({
            ...prev,
            price: priceData.price
          }));
        }
      }
      setMaterialIdForPrice(null);
      setLoadingPrice(false);
    } else if (priceError) {
      setLoadingPrice(false);
      setMaterialIdForPrice(null);
    } else if (priceLoading === false && !priceData) {
      setLoadingPrice(false);
      setMaterialIdForPrice(null);
    }
  }, [priceData, priceLoading, priceError, materialIdForPrice, items, newItem.materialId, onChange]);

  const calculateAmount = (quantity: number, price: number) => {
    return quantity * price;
  };
  const calculateAmountWithMarkup = (amount: number) => {
    return amount * (1 + markupPercentage / 100);
  };
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...items];
    const item = { ...updatedItems[index] };
    (item as any)[field] = value;
    if (field === 'quantity' || field === 'price') {
      item.amount = calculateAmount(
        field === 'quantity' ? Number(value) : item.quantity,
        field === 'price' ? Number(value) : item.price
      );
      item.amountWithMarkup = calculateAmountWithMarkup(item.amount);
    }
    if (field === 'materialId') {
      const material = materials.find((m) => m.id === value);
      if (material) {
        item.materialName = material.name;
        item.unit = material.unit;
        const newMaterialId = value as string;
        if (isValidId(supplierId) && isValidId(newMaterialId)) {
          setMaterialIdForPrice(newMaterialId);
        }
      }
    }
    updatedItems[index] = item;
    onChange(updatedItems);
  };
  const fetchPriceForItem = (index: number) => {
    const materialId = items[index].materialId;
    if (!isValidId(supplierId) || !isValidId(materialId)) {
      return;
    }
    setMaterialIdForPrice(materialId);
    setLoadingPrice(true);
  };
  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    onChange(updatedItems);
  };
  const handleNewItemChange = (field: keyof NewInvoiceItem, value: string | number) => {
    setNewItem((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field === 'materialId') {
      const material = materials.find((m) => m.id === value);
      if (material) {
        setNewItem(prev => ({
          ...prev,
          materialName: material.name,
          unit: material.unit,
        }));
        const newMaterialId = value as string;
        if (isValidId(supplierId) && isValidId(newMaterialId)) {
          setMaterialIdForPrice(newMaterialId);
        }
      }
    }
  };
  const handleNumberInput = (
    field: 'quantity' | 'price',
    e: ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const value = parseFloat(e.target.value) || 0;

    if (index !== undefined) {
      handleItemChange(index, field, value);
    } else {
      handleNewItemChange(field, value);
    }
  };
  const handleAddItem = () => {
    if (!newItem.materialId || newItem.quantity <= 0 || newItem.price <= 0) {
      return; 
    }
    const amount = calculateAmount(newItem.quantity, newItem.price);
    const amountWithMarkup = calculateAmountWithMarkup(amount);
    const material = materials.find((m) => m.id === newItem.materialId);
    const item: InvoiceItem = {
      materialId: newItem.materialId,
      materialName: material?.name,
      unit: material?.unit,
      quantity: newItem.quantity,
      price: newItem.price,
      amount,
      amountWithMarkup,
    };
    onChange([...items, item]);
    setNewItem({
      materialId: '',
      quantity: 1,
      price: 0,
    });
  };
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const totalAmountWithMarkup = items.reduce((sum, item) => sum + item.amountWithMarkup, 0);

  console.log("materials", materials);
  console.log("items", items);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Материал</TableHead>
            <TableHead>Ед. изм.</TableHead>
            <TableHead className="text-right">Количество</TableHead>
            <TableHead className="text-right">Цена</TableHead>
            {!readOnly && supplierId && <TableHead className="w-[50px]"></TableHead>}
            <TableHead className="text-right">Сумма</TableHead>
            <TableHead className="text-right">Сумма с наценкой</TableHead>
            {!readOnly && <TableHead className="w-[50px]"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id || index}>
              <TableCell>
                {readOnly ? (
                  item.materialName
                ) : (
                  <Select
                    value={item.materialId || ''}
                    onValueChange={(value) => handleItemChange(index, 'materialId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell className="text-right">
                {readOnly ? (
                  item.quantity
                ) : (
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={item.quantity ?? 0}
                    onChange={(e) => handleNumberInput('quantity', e, index)}
                    className="w-24 text-right"
                  />
                )}
              </TableCell>
              <TableCell className="text-right">
                {readOnly ? (
                  formatCurrency(item.price)
                ) : (
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={item.price ?? 0}
                    onChange={(e) => handleNumberInput('price', e, index)}
                    className="w-32 text-right"
                  />
                )}
              </TableCell>
              {!readOnly && supplierId && (
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            console.log("Кнопка обновления цены нажата для индекса:", index);
                            console.log("item.materialId:", items[index].materialId);
                            console.log("supplierId:", supplierId);
                            console.log("isValidId(item.materialId):", isValidId(items[index].materialId));
                            console.log("isValidId(supplierId):", isValidId(supplierId));
                            console.log("disabled state:", !isValidId(items[index].materialId) || !isValidId(supplierId) ||
                              (loadingPrice && materialIdForPrice === items[index].materialId));
                            fetchPriceForItem(index);
                          }}
                        >
                          <RefreshCw className={`h-4 w-4 ${(priceLoading || loadingPrice) && materialIdForPrice === items[index].materialId ? 'animate-spin' : ''}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Получить актуальную цену</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              )}
              <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.amountWithMarkup)}</TableCell>
              {!readOnly && (
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}

          {!readOnly && (
            <TableRow>
              <TableCell>
                <Select
                  value={newItem.materialId || ''}
                  onValueChange={(value) => handleNewItemChange('materialId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите материал" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material.id} value={material.id}>
                        {material.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{newItem.unit}</TableCell>
              <TableCell className="text-right">
                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={newItem.quantity ?? 0}
                  onChange={(e) => handleNumberInput('quantity', e)}
                  className="w-24 text-right"
                />
              </TableCell>
              <TableCell className="text-right">
                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={newItem.price ?? 0}
                  onChange={(e) => handleNumberInput('price', e)}
                  className="w-32 text-right"
                  disabled={loadingPrice}
                />
              </TableCell>
              {supplierId && (
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => isValidId(newItem.materialId) && setMaterialIdForPrice(newItem.materialId)}
                          disabled={!isValidId(newItem.materialId) || !isValidId(supplierId) || loadingPrice}
                        >
                          <RefreshCw className={`h-4 w-4 ${loadingPrice ? 'animate-spin' : ''}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Получить актуальную цену</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              )}
              <TableCell className="text-right">
                {formatCurrency(
                  calculateAmount(newItem.quantity || 0, newItem.price || 0)
                )}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(
                  calculateAmountWithMarkup(
                    calculateAmount(newItem.quantity || 0, newItem.price || 0)
                  )
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddItem}
                  disabled={!isValidId(newItem.materialId) || newItem.quantity <= 0 || newItem.price <= 0 || loadingPrice}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end space-x-4">
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">Итого:</p>
          <p className="text-xl font-bold">{formatCurrency(totalAmount)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">Итого с наценкой ({markupPercentage}%):</p>
          <p className="text-xl font-bold">{formatCurrency(totalAmountWithMarkup)}</p>
        </div>
      </div>
    </div>
  );
}