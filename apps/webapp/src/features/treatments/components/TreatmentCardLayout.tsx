import { useTRPCClient } from '@/lib/trpc';
import { Loader, Separator } from '@repo/ui/components';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { LayoutProps } from '../__types';
import TreatmentCard from './TreatmentCard';

const TreatmentCardLayout: React.FC<LayoutProps> = ({
  filters,
  pagination,
  sorting,
  status,
}) => {
  const trpc = useTRPCClient();
  const {
    data: treatmentList = { pages: [], pageParams: [] },
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['treatmentList', { filters, pagination, sorting, status }],
    queryFn: ({ pageParam = 1 }) => {
      return trpc.treatments.getAllTreatments.query({
        status,
        excludeTotalCount: true,
        search: filters.search,
        type: filters.type === 'ALL' ? undefined : filters.type,
        rating: filters.rating,
        priceRange: filters.priceRange,
        perPage: 12,
        page: pageParam,
        ...(sorting.length > 0 && {
          orderBy: {
            field: 'name',
            direction: sorting[0]?.desc ? 'desc' : 'asc',
          },
        }),
      });
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.hasNextPage ? lastPageParam + 1 : undefined;
    },

    initialPageParam: pagination.current,
  });

  const flatten = treatmentList.pages.flatMap((page) => page.data);

  return (
    <InfiniteScroll
      dataLength={flatten.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="h-[100px]">
          <Loader className="[&>svg]:size-9 [&>svg]:text-gray-300 h-full" />
        </div>
      }
      endMessage={
        !isLoading &&
        flatten.length !== 0 && (
          <div className="relative mt-10 mb-6 flex items-center justify-center overflow-hidden">
            <Separator />
            <div className="text-gray-500 px-4 text-center bg-background text-sm whitespace-nowrap">
              Nothing follows
            </div>
            <Separator />
          </div>
        )
      }
      refreshFunction={refetch}
      pullDownToRefresh={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {(flatten || []).map((treatment) => (
          <TreatmentCard key={treatment.id} treatment={treatment} />
        ))}
        {isLoading && (
          <div className="h-[567px] justify-center items-center w-full col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <Loader className="[&>svg]:size-[50px] [&>svg]:text-gray-300 h-full" />
          </div>
        )}
        {!isLoading && flatten.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-10">
            No results found.
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
};

export default TreatmentCardLayout;
