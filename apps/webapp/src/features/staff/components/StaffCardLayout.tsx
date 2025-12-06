import { useTRPCClient } from '@/lib/trpc';
import { Loader, Separator } from '@repo/ui/components';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { LayoutProps } from '../__types';
import StaffCard from './StaffCard';

const StaffCardLayout: React.FC<LayoutProps> = ({
  filters,
  pagination,
  sorting,
  type,
}) => {
  const trpc = useTRPCClient();
  const {
    data: staffList = { pages: [], pageParams: [] },
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['staffList', { filters, pagination, sorting, type }],
    queryFn: ({ pageParam = 1 }) => {
      console.log({ pageParam });
      return trpc.staffs.getAllStaffs.query({
        type,
        excludeTotalCount: true,
        search: filters.search,
        assignedServicesIn: filters.assignedServices,
        schedulesIn: filters.schedules,
        specialistIn: filters.specialists,
        statusIn: filters.status,
        perPage: 12,
        page: pageParam,
        ...(sorting.length > 0 && {
          orderBy: {
            field: 'firstName',
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

  const flatten = staffList.pages.flatMap((page) => page.data);

  return (
    <InfiniteScroll
      dataLength={flatten.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="h-[100px]">
          <Loader className="[&>svg]:size-[36px] [&>svg]:text-gray-300 h-full" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {(flatten || []).map((staff) => (
          <StaffCard key={staff.id} staff={staff} />
        ))}
        {isLoading && (
          <div className="h-[567px] justify-center items-center w-full col-span-1 sm:col-span-2 md:col-span-3">
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

export default StaffCardLayout;
