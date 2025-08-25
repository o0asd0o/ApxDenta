import Paginate from '@/components/Paginate';
import { DataTable } from '@/components/data-table/DataTable';
import { useTRPC } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { columns } from '../__columns';
import type { LayoutProps } from '../__types';

const StaffListLayout: React.FC<LayoutProps> = ({
  filters,
  pagination,
  sorting,
  setSorting,
  setPagination,

  // staff actions
  onDeleteStaff,
  onViewStaff,
}) => {
  const trpc = useTRPC();
  const { data: staffList, isLoading } = useQuery(
    trpc.staffs.getAllStaffs.queryOptions({
      search: filters.search,
      assignedServicesIn: filters.assignedServices,
      schedulesIn: filters.schedules,
      specialistIn: filters.specialists,
      statusIn: filters.status,

      perPage: pagination.pageSize,
      page: pagination.current,
      ...(sorting.length > 0 && {
        orderBy: {
          field: 'firstName',
          direction: sorting[0]?.desc ? 'desc' : 'asc',
        },
      }),
    }),
  );

  return (
    <div className="flex flex-col gap-4 flex-1 overflow-auto">
      <DataTable
        data={staffList?.data || []}
        sort={{ sorting, setSorting }}
        loading={isLoading}
        columns={columns({
          onView: onViewStaff,
          onDelete: onDeleteStaff,
        })}
        onDeleteItems={(items) => Promise.resolve(console.log({ items }))}
      />
      {staffList?.count !== 0 && (
        <Paginate
          listCount={staffList?.count || 0}
          pagination={{ setState: setPagination, state: pagination }}
        />
      )}
    </div>
  );
};

export default StaffListLayout;
