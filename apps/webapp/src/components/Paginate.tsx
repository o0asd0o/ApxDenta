import { cn } from '@/lib/utils';
import {
  Label,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components';
import { produce } from 'immer';
import React from 'react';

type Props = {
  className?: string;
  listCount: number;
  pagination: {
    state: {
      current: number;
      pageSize: number;
    };
    setState: React.Dispatch<
      React.SetStateAction<{ current: number; pageSize: number }>
    >;
  };
};
const Paginate: React.FC<Props> = ({ pagination, listCount, className }) => {
  const { state, setState } = pagination;

  const totalPages = Math.ceil(listCount / state.pageSize);

  return (
    <div
      className={cn(
        'flex items-center justify-between mt-4',
        totalPages === 0 && 'hidden',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap sm:flex hidden">
          Rows per page:
        </Label>
        <Label className="whitespace-nowrap sm:hidden">Rows</Label>
        <Select
          value={state.pageSize.toString()}
          onValueChange={(rowsPerPage) =>
            pagination.setState(
              produce((draft) => {
                draft.current = 1; // Reset to first page on page size change
                draft.pageSize = Number.parseInt(rowsPerPage, 10);
              }),
            )
          }
        >
          <SelectTrigger className="w-[75px] px-2 py-1 sm:px-3 sm:py-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Pagination className={cn('justify-end', className)}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                if (state.current > 1) {
                  setState(
                    produce((draft) => {
                      draft.current -= 1;
                    }),
                  );
                }
              }}
              disabled={state.current === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  isActive={state.current === pageNum}
                  onClick={() => {
                    if (state.current !== pageNum) {
                      setState((prev) => ({
                        ...prev,
                        current: pageNum,
                      }));
                    }
                  }}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                if (state.current < totalPages) {
                  setState((prev) => ({
                    ...prev,
                    current: prev.current + 1,
                  }));
                }
              }}
              disabled={state.current === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginate;
