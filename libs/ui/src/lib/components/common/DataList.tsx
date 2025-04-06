// libs/ui/src/lib/components/common/DataList.tsx
import React, { ReactNode } from 'react';
import { Pagination, PaginationInfo } from './Pagination';
import { cn } from '../../utils';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from './Table';

export type SortDirection = 'asc' | 'desc';

export interface SortingState {
  field: string;
  direction: SortDirection;
}

export interface Column<T> {
  id: string;                       
  header: string | ReactNode;       
  accessorKey?: keyof T;            
  cell?: (item: T) => ReactNode;    
  sortable?: boolean;               
  className?: string;               
}

interface DataListProps<T> {
  columns: Column<T>[];                               
  data: T[];                                          
  keyField: keyof T;                                  
  isLoading?: boolean;                                
  noDataMessage?: string;                             
  className?: string;                                 
  paginationInfo?: PaginationInfo;                    
  onPageChange?: (pageIndex: number) => void;         
  onPageSizeChange?: (pageSize: number) => void;      
  sorting?: SortingState;                             
  onSortingChange?: (sorting: SortingState) => void;  
  onRowClick?: (item: T) => void;                     
  rowClassName?: (item: T) => string;                 
}

export function DataList<T>({
  columns,
  data,
  keyField,
  isLoading = false,
  noDataMessage = 'Данные не найдены',
  className,
  paginationInfo,
  onPageChange,
  onPageSizeChange,
  sorting,
  onSortingChange,
  onRowClick,
  rowClassName
}: DataListProps<T>) {
  const handleSortClick = (columnId: string) => {
    if (!onSortingChange) return;
    const column = columns.find(col => col.id === columnId);
    if (!column?.sortable) return;
    let direction: SortDirection = 'asc';
    if (sorting && sorting.field === columnId) {
      direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    onSortingChange({ field: columnId, direction });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-sm text-muted-foreground">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  const getItemKey = (item: T) => {
    const key = item[keyField];
    return key !== undefined && key !== null ? String(key) : crypto.randomUUID();
  };

  return (
    <div className="space-y-4">
      <div className={cn("rounded-md border", className)}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead
                  key={column.id}
                  className={cn(
                    column.sortable && "cursor-pointer select-none",
                    column.className
                  )}
                  onClick={() => column.sortable && handleSortClick(column.id)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && sorting && sorting.field === column.id && (
                      <span className="ml-1">
                        {sorting.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {noDataMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, rowIndex) => {
                const itemKey = getItemKey(item);
                return (
                  <TableRow
                    key={itemKey}
                    className={cn(
                      onRowClick && "cursor-pointer hover:bg-muted/50",
                      rowClassName && rowClassName(item)
                    )}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                    {columns.map(column => (
                      <TableCell
                        key={`${itemKey}-${column.id}`}
                        className={column.className}
                      >
                        {column.cell
                          ? column.cell(item)
                          : column.accessorKey
                            ? String(item[column.accessorKey] ?? '')
                            : null
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {paginationInfo && onPageChange && (
        <Pagination
          paginationInfo={paginationInfo}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}