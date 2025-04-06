// libs/ui/src/lib/hooks/usePagination.ts
import { useState, useCallback, useEffect } from 'react';
import { PaginationInfo } from '../components/common/Pagination';

interface PaginationOptions {
  initialPageIndex?: number;
  initialPageSize?: number;
  defaultTotalCount?: number;
}

interface PaginationResult {
  paginationInfo: PaginationInfo;
  pageIndex: number;
  pageSize: number;
  skip: number;
  limit: number;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalCount: (totalCount: number) => void;
  resetPagination: () => void;
  getPaginationVariables: () => { skip: number; limit: number };
}

/**
 * Хук для управления пагинацией в списках
 * @param options Настройки пагинации
 * @returns Состояние и методы для управления пагинацией
 */
export function usePagination({
  initialPageIndex = 0,
  initialPageSize = 10,
  defaultTotalCount = 0
}: PaginationOptions = {}): PaginationResult {
  // Основное состояние пагинации
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalCount, setTotalCount] = useState(defaultTotalCount);

  // Вычисляемые значения
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const hasNextPage = pageIndex < totalPages - 1;
  const hasPrevPage = pageIndex > 0;
  const skip = pageIndex * pageSize;
  const limit = pageSize;

  // Объект с информацией о пагинации для передачи в компонент
  const paginationInfo: PaginationInfo = {
    pageIndex,
    pageSize,
    totalCount,
    totalPages,
    hasNextPage,
    hasPrevPage
  };

  // Обработчик изменения страницы с валидацией границ
  const handlePageChange = useCallback((newPageIndex: number) => {
    const validPageIndex = Math.max(0, Math.min(newPageIndex, totalPages - 1));
    setPageIndex(validPageIndex);
  }, [totalPages]);

  // Обработчик изменения размера страницы
  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    
    // Корректируем текущую страницу при изменении размера страницы
    const maxPossiblePageIndex = Math.ceil(totalCount / newPageSize) - 1;
    if (pageIndex > maxPossiblePageIndex) {
      setPageIndex(Math.max(0, maxPossiblePageIndex));
    }
  }, [pageIndex, totalCount]);

  // Сброс пагинации к начальным значениям
  const resetPagination = useCallback(() => {
    setPageIndex(initialPageIndex);
    setPageSize(initialPageSize);
  }, [initialPageIndex, initialPageSize]);

  // Получение переменных для GraphQL запроса
  const getPaginationVariables = useCallback(() => {
    return { skip, limit };
  }, [skip, limit]);

  // Если общее количество меняется, проверяем, что текущая страница все еще валидна
  useEffect(() => {
    if (totalCount === 0) {
      setPageIndex(0);
      return;
    }
    
    const maxPageIndex = Math.ceil(totalCount / pageSize) - 1;
    if (pageIndex > maxPageIndex) {
      setPageIndex(maxPageIndex);
    }
  }, [totalCount, pageSize, pageIndex]);

  return {
    paginationInfo,
    pageIndex,
    pageSize,
    skip,
    limit,
    setPageIndex: handlePageChange,
    setPageSize: handlePageSizeChange,
    setTotalCount,
    resetPagination,
    getPaginationVariables
  };
}