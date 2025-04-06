// libs/ui/src/lib/components/common/Pagination.tsx
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../../utils';

export interface PaginationInfo {
  pageIndex: number;    // Текущая страница (0-based)
  pageSize: number;     // Количество элементов на странице
  totalCount: number;   // Общее количество элементов
  totalPages: number;   // Общее количество страниц
  hasNextPage: boolean; // Есть ли следующая страница
  hasPrevPage: boolean; // Есть ли предыдущая страница
}

interface PaginationProps {
  paginationInfo: PaginationInfo;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
  showPageSizeOptions?: boolean;
  pageSizeOptions?: number[];
  showFirstLastButtons?: boolean;
  maxVisiblePages?: number;  // Максимальное количество видимых номеров страниц
}

export function Pagination({
  paginationInfo,
  onPageChange,
  onPageSizeChange,
  className,
  showPageSizeOptions = true,
  pageSizeOptions = [10, 25, 50, 100],
  showFirstLastButtons = true,
  maxVisiblePages = 5
}: PaginationProps) {
  // Деструктурируем paginationInfo для удобства
  const { pageIndex, pageSize, totalCount, totalPages, hasNextPage, hasPrevPage } = paginationInfo;
  
  // Локальное состояние для текущей страницы и размера страницы
  const [currentPageIndex, setCurrentPageIndex] = useState(pageIndex);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  // Синхронизация локального состояния с пропсами
  useEffect(() => {
    setCurrentPageIndex(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    setCurrentPageSize(pageSize);
  }, [pageSize]);

  // Обработчик изменения страницы
  const handlePageChange = (newPageIndex: number) => {
    // Проверяем границы
    if (newPageIndex < 0 || newPageIndex >= totalPages) {
      return;
    }
    
    setCurrentPageIndex(newPageIndex);
    onPageChange(newPageIndex);
  };

  // Обработчик изменения размера страницы
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setCurrentPageSize(newPageSize);
    
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
      
      // Корректируем текущую страницу при изменении размера страницы
      const maxPossiblePageIndex = Math.ceil(totalCount / newPageSize) - 1;
      const newPageIndex = Math.min(currentPageIndex, maxPossiblePageIndex);
      
      if (newPageIndex !== currentPageIndex) {
        setCurrentPageIndex(newPageIndex);
        onPageChange(newPageIndex);
      }
    }
  };

  // Функция для определения видимых номеров страниц
  const getVisiblePageNumbers = () => {
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(0, currentPageIndex - halfVisiblePages);
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
    // Корректируем startPage, если не хватает страниц в конце
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }
    
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  // Вычисляем диапазон отображаемых элементов
  const fromItem = totalCount === 0 ? 0 : currentPageIndex * currentPageSize + 1;
  const toItem = Math.min(totalCount, (currentPageIndex + 1) * currentPageSize);

  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0", className)}>
      {/* Информация о записях и выбор количества элементов на странице */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          Показано {fromItem}-{toItem} из {totalCount}
        </span>
        
        {showPageSizeOptions && onPageSizeChange && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Элементов на странице:</span>
            <select
              value={currentPageSize}
              onChange={handlePageSizeChange}
              className="h-8 w-16 rounded border border-input bg-background px-2 text-sm"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      {/* Кнопки навигации */}
      <div className="flex items-center space-x-1">
        {/* Кнопка "Первая страница" */}
        {showFirstLastButtons && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(0)}
            disabled={!hasPrevPage}
          >
            <span className="sr-only">На первую страницу</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}
        
        {/* Кнопка "Предыдущая страница" */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(currentPageIndex - 1)}
          disabled={!hasPrevPage}
        >
          <span className="sr-only">На предыдущую страницу</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {/* Номера страниц */}
        {getVisiblePageNumbers().map(pageNumber => (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPageIndex ? "default" : "outline"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(pageNumber)}
          >
            <span>{pageNumber + 1}</span>
          </Button>
        ))}
        
        {/* Кнопка "Следующая страница" */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(currentPageIndex + 1)}
          disabled={!hasNextPage}
        >
          <span className="sr-only">На следующую страницу</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        {/* Кнопка "Последняя страница" */}
        {showFirstLastButtons && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={!hasNextPage}
          >
            <span className="sr-only">На последнюю страницу</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}