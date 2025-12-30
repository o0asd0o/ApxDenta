import Paginate from '@/components/Paginate';
import { DataTable } from '@/components/data-table/DataTable';
import { useTRPC } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPatientColumns } from '../__columns';
import { useDeleteMultiplePatientAction } from '../__common/context/context';
import type { LayoutProps } from '../__types';
import PatientsListLoaderItem from './PatientsListLoaderItem';

const PatientsListLayout: React.FC<LayoutProps> = ({
  isActive,
  filters,
  pagination,
  sorting,
  setSorting,
  setPagination,
}) => {
  const trpc = useTRPC();
  const onShowDeleteMultipleModal = useDeleteMultiplePatientAction();
  const { data: patientsList, isLoading } = useQuery(
    trpc.patients.getAllPatients.queryOptions({
      isActive,
      search: filters.search,
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
        data={patientsList?.data || []}
        sort={{ sorting, setSorting }}
        loading={isLoading}
        columns={getPatientColumns()}
        LoaderRow={PatientsListLoaderItem}
        loaderCount={pagination.pageSize}
        onDeleteItems={async (items, callback) =>
          onShowDeleteMultipleModal(
            items.map((item) => ({
              id: item.id,
              name: `${item.firstName} ${item.lastName}`,
              avatar: item.avatar?.url || null,
            })),
            callback,
          )
        }
      />
      {patientsList?.count !== 0 && !isLoading && (
        <Paginate
          listCount={patientsList?.count || 0}
          pagination={{ setState: setPagination, state: pagination }}
        />
      )}
    </div>
  );
};

export default PatientsListLayout;
