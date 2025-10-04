import Paginate from '@/components/Paginate';
import { DataTable } from '@/components/data-table/DataTable';
import { useTRPC } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { columns } from '../__columns';
import { useArchiveMultipleTreatmentIdAction } from '../__common/context/context';
import type { LayoutProps } from '../__types';
import TreatmentListLoaderItem from './TreatmentListLoaderItem';

const TreatmentListLayout: React.FC<LayoutProps> = ({
  filters,
  pagination,
  status,
  sorting,
  setSorting,
  setPagination,
}) => {
  const trpc = useTRPC();
  const onShowArchiveMultipleModal = useArchiveMultipleTreatmentIdAction();
  const { data: treatmentsList, isLoading } = useQuery(
    trpc.treatments.getAllTreatments.queryOptions({
      search: filters.search,
      status,
      type: filters.type === 'ALL' ? undefined : filters.type,
      priceRange: filters.priceRange,
      rating: filters.rating,
      perPage: pagination.pageSize,
      page: pagination.current,
      ...(sorting.length > 0 && {
        orderBy: {
          field: 'name',
          direction: sorting[0]?.desc ? 'desc' : 'asc',
        },
      }),
    }),
  );

  return (
    <div className="flex flex-col gap-4 flex-1 overflow-auto">
      <DataTable
        data={treatmentsList?.data || []}
        sort={{ sorting, setSorting }}
        loading={isLoading}
        columns={columns}
        LoaderRow={TreatmentListLoaderItem}
        onDeleteItems={async (items, callback) =>
          onShowArchiveMultipleModal(items, callback)
        }
      />
      {treatmentsList?.count !== 0 && !isLoading && (
        <Paginate
          listCount={treatmentsList?.count || 0}
          pagination={{ setState: setPagination, state: pagination }}
        />
      )}
    </div>
  );
};

export default TreatmentListLayout;
