'use client';

import { cn } from '@/lib/utils';
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components';
import {
  type ColumnDef,
  type OnChangeFn,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  noop,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import type React from 'react';
import FloatingActionBar from '../FloatingActionBar';
import { getColumnTitle } from './helpers';

interface DataTableProps<TData extends { id: string }, TValue, LMeta> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  LoaderRow?: React.FC<LMeta & { key: string }>;
  loaderCount?: number;
  loaderMeta?: LMeta;
  onDeleteItems?: (itemIds: TData[], callback: () => void) => Promise<void>;
  sort?: {
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
  };
  variant?: 'default' | 'card';
}

export function DataTable<TData extends { id: string }, TValue, LMeta>({
  columns,
  data,
  loading,
  LoaderRow,
  loaderCount,
  sort,
  onDeleteItems,
  loaderMeta,
  variant = 'default',
}: DataTableProps<TData, TValue, LMeta>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: sort?.setSorting,
    enableSorting: false,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting: sort?.sorting },
    getRowId: (row) => row.id as string,
  });

  const state = table.getState().rowSelection;
  return (
    <div className="rounded-md relative overflow-hidden">
      <Table className="">
        <TableHeader className="[&_tr]:border-none!">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-none!">
              {headerGroup.headers.map(({ column, ...header }) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      'font-medium first:pl-3 last:pr-3 bg-muted/90 text-xs uppercase text-grayish-blue',
                      variant === 'default' &&
                        'first:rounded-l-lg last:rounded-r-lg ',
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onKeyUp={noop}
                        className={cn(
                          'flex items-center',
                          column.getCanSort() && 'cursor-pointer select-none',
                        )}
                        onClick={column.getToggleSortingHandler()}
                        title={getColumnTitle({ column, ...header })}
                      >
                        {flexRender(
                          column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <ArrowUpIcon className="size-3" />,
                          desc: <ArrowDownIcon className="size-3" />,
                        }[column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b-grayish-blue-200"
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="first:pl-3 last:pr-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <>
              {loading &&
                [...Array(loaderCount || 5)].map((_, rowIdx) => {
                  if (LoaderRow)
                    return (
                      <LoaderRow
                        {...(loaderMeta as LMeta)}
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={`rowId${rowIdx}`}
                      />
                    );

                  return (
                    <TableRow
                      key={`rowId${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        rowIdx
                      }`}
                    >
                      {[...Array(columns.length)].map((_, colIdx) => (
                        <TableCell
                          key={`colId${
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            colIdx
                          }`}
                          className="first:pl-3 last:pr-3"
                        >
                          <Skeleton className="h-6 w-full rounded" />
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </>
          )}
        </TableBody>
      </Table>

      <FloatingActionBar
        selectedCount={Object.keys(state).filter((key) => state[key]).length}
        onDelete={async () => {
          if (onDeleteItems) {
            const rowsSelected = Object.keys(table.getState().rowSelection);
            const actualSelectedRows = table
              .getRowModel()
              .rows.filter((row) => rowsSelected.includes(row.id))
              .map((item) => item.original);

            await onDeleteItems(actualSelectedRows, () =>
              table.setRowSelection({}),
            );
          }
        }}
        onClear={() => table.setRowSelection({})}
      />
    </div>
  );
}
