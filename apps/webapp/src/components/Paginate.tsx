import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import {
  Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisible: number,
) => {
  // If maxVisible or fewer pages, show all
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];

  if (maxVisible === 3) {
    // Mobile: show 3 items
    if (currentPage === 1) {
      pages.push(1, 2, 'ellipsis', totalPages);
    } else if (currentPage === totalPages) {
      pages.push(1, 'ellipsis', totalPages - 1, totalPages);
    } else if (currentPage === 2) {
      pages.push(1, 2, 'ellipsis', totalPages);
    } else if (currentPage === totalPages - 1) {
      pages.push(1, 'ellipsis', totalPages - 1, totalPages);
    } else {
      pages.push(1, 'ellipsis', currentPage, 'ellipsis', totalPages);
    }
  } else {
    // Desktop: show 4 items
    pages.push(1);

    if (currentPage <= 3) {
      // Near the start: 1, 2, 3, ..., last
      pages.push(2, 3, 'ellipsis', totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Near the end: 1, ..., last-2, last-1, last
      pages.push('ellipsis', totalPages - 2, totalPages - 1, totalPages);
    } else {
      // In the middle: 1, ..., current, current+1, ..., last
      pages.push(
        'ellipsis',
        currentPage,
        currentPage + 1,
        'ellipsis',
        totalPages,
      );
    }
  }

  return pages;
};

const Paginate: React.FC<Props> = ({ pagination, listCount, className }) => {
  const { state, setState } = pagination;
  const isMobile = useIsMobile();

  const totalPages = Math.ceil(listCount / state.pageSize);
  const maxVisible = isMobile ? 3 : 4;

  return (
    <div
      className={cn(
        'flex items-center justify-between mt-4',
        totalPages === 0 ||
          (totalPages === 1 && state.pageSize === 10 && 'hidden'),
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
          {getVisiblePages(state.current, totalPages, maxVisible).map(
            (item, index) =>
              item === 'ellipsis' ? (
                <PaginationItem
                  key={`ellipsis-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    index
                  }`}
                >
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    href="#"
                    isActive={state.current === item}
                    onClick={() => {
                      if (state.current !== item) {
                        setState((prev) => ({
                          ...prev,
                          current: item,
                        }));
                      }
                    }}
                  >
                    {item}
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
