import FilterButton from '@/components/FilterButton';
import type { PaginationState } from '@/components/__types';
import type { TreatmentVisitType } from '@repo/domain/db';
import { Input, Separator } from '@repo/ui/components';
import type { SortingState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { Stethoscope } from 'lucide-react';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import React, { useCallback, useState } from 'react';
import { TreatmentActionsProvider } from './__common/context/TreatmentActionsProvider';
import FilterTreatmentDialog from './components/FilterTreatmentDialog';
import TotalTreatments from './components/TotalTreatments';
import TreatmentActions from './components/TreatmentActions';
import TreatmentListLayout from './components/TreatmentListLayout';

const ActiveTreatments: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filters, setFilters] = useState<{
    search?: string;
    type?: TreatmentVisitType | 'ALL';
  }>({});

  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 300),
    [],
  );
  const [layoutTab, setLayoutTab] = useQueryState(
    'layoutTab',
    parseAsStringEnum<'card' | 'list'>(['card', 'list']).withDefault('list'),
  );

  return (
    <div className="gap-5 flex flex-col">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex">
          <div className="flex items-center gap-1.5">
            <span className="p-1.5 rounded-sm bg-accent">
              <Stethoscope className="size-4" />
            </span>
            <TotalTreatments treatmentStatus="ACTIVE" />
            <span className="text-xs text-gray-400">Treatment(s)</span>
          </div>
          <TreatmentActions
            className="lg:hidden flex ml-auto"
            layoutTab={layoutTab}
            setLayoutTab={setLayoutTab}
            setPagination={setPagination}
          />
        </div>

        <div className="lg:ml-auto flex gap-2 items-center">
          <Input
            value={searchInput}
            placeholder="Search treatment name"
            className="flex-1 w-full lg:w-[400px]!"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value);
              handleSearchChange(e.target.value);
            }}
            type="search"
          />
          <FilterButton
            onClick={() => setFilterOpen(true)}
            hasFilters={Object.entries(filters).some(([key, value]) => {
              return key !== 'search' && value !== undefined && value !== '';
            })}
          />
          <Separator
            orientation="vertical"
            className="mx-1 hidden lg:block"
            style={{ height: '30px', width: '1px' }}
          />
          <TreatmentActions
            className="hidden lg:flex"
            layoutTab={layoutTab}
            setLayoutTab={setLayoutTab}
            setPagination={setPagination}
          />
        </div>
        <FilterTreatmentDialog
          applyFilters={setFilters}
          defaultFilters={filters}
          open={filterOpen}
          setOpen={setFilterOpen}
        />
      </div>
      <div>
        <TreatmentActionsProvider>
          {/* <UpdateStaff type="DOCTOR" />
          <ArchiveStaff />
          <ArchiveMultipleStaff /> */}
          {/* {layoutTab === 'card' && (
            <StaffCardLayout
              type="DOCTOR"
              filters={filters}
              pagination={pagination}
              sorting={sorting}
              setSorting={setSorting}
              setPagination={setPagination}
            />
          )} */}
          {layoutTab === 'list' && (
            <TreatmentListLayout
              status="ACTIVE"
              filters={filters}
              pagination={pagination}
              sorting={sorting}
              setSorting={setSorting}
              setPagination={setPagination}
            />
          )}
        </TreatmentActionsProvider>
      </div>
    </div>
  );
};

export default ActiveTreatments;
