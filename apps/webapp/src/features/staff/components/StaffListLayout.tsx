import Paginate from '@/components/Paginate';
import { DataTable } from '@/components/data-table/DataTable';
import { useTRPC } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { columns } from '../__columns';
import { useArchiveMultipleStaffIdAction } from '../__common/context/context';
import type { LayoutProps } from '../__types';
import StaffListLoaderItem from './StaffListLoaderItem';

const StaffListLayout: React.FC<LayoutProps> = ({
  filters,
  pagination,
  sorting,
  setSorting,
  setPagination,
  type,
}) => {
  const trpc = useTRPC();
  const onShowArchiveMultipleModal = useArchiveMultipleStaffIdAction();
  const { data: staffList, isLoading } = useQuery(
    trpc.staffs.getAllStaffs.queryOptions({
      type,
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
        columns={columns}
        LoaderRow={StaffListLoaderItem}
        onDeleteItems={async (items, callback) =>
          onShowArchiveMultipleModal(items, callback)
        }
      />
      {staffList?.count !== 0 && !isLoading && (
        <Paginate
          listCount={staffList?.count || 0}
          pagination={{ setState: setPagination, state: pagination }}
        />
      )}
    </div>
  );
};

export default StaffListLayout;
