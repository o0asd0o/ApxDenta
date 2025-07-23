import type { Header } from '@tanstack/react-table';

export const getColumnTitle = <TData>(header: Header<TData, unknown>) => {
  return header.column.getCanSort()
    ? header.column.getNextSortingOrder() === 'asc'
      ? 'Sort ascending'
      : header.column.getNextSortingOrder() === 'desc'
        ? 'Sort descending'
        : 'Clear sort'
    : undefined;
};
