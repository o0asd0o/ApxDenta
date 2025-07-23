'use client';

import { cn } from '@/lib/utils';
import {
  Loader,
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
import FloatingActionBar from '../FloatingActionBar';
import { getColumnTitle } from './helpers';

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  sort?: {
    sorting: SortingState;
    setSorting: OnChangeFn<SortingState>;
  };
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  loading,
  sort,
}: DataTableProps<TData, TValue>) {
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
    <div className="rounded-md relative">
      <Table className="">
        <TableHeader className="[&_tr]:border-none!">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-none!">
              {headerGroup.headers.map(({ column, ...header }) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="font-medium first:pl-3 last:pr-3 first:rounded-l-lg last:rounded-r-lg bg-muted/90 text-xs uppercase text-grayish-blue"
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
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-[567px] text-center"
                  >
                    <Loader className="[&>svg]:size-[50px] [&>svg]:text-gray-300" />
                  </TableCell>
                </TableRow>
              )}
              {!loading && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>

      <FloatingActionBar
        selectedCount={Object.keys(state).filter((key) => state[key]).length}
        onDelete={() => {}}
        onClear={() => {}}
      />
    </div>
  );
}
