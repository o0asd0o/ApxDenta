import FilterButton from '@/components/FilterButton';
import type { PaginationState } from '@/components/__types';
import useLayoutState from '@/hooks/use-layout-state';
import type { TreatmentVisitType } from '@repo/domain/db';
import { Input, Separator } from '@repo/ui/components';
import type { SortingState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { Stethoscope } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { TreatmentActionsProvider } from './__common/context/TreatmentActionsProvider';
import ArchiveMultipleTreatment from './archive/ArchiveMultipleTreatment';
import ArchiveTreatment from './archive/ArchiveTreatment';
import FilterTreatmentDialog from './components/FilterTreatmentDialog';
import TotalTreatments from './components/TotalTreatments';
import TreatmentActions from './components/TreatmentActions';
import TreatmentCardLayout from './components/TreatmentCardLayout';
import TreatmentListLayout from './components/TreatmentListLayout';
import UpdateTreatment from './update/UpdateTreatment';

type Props = {
  status: 'ACTIVE' | 'INACTIVE';
};

const Treatments: React.FC<Props> = ({ status }) => {
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
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 300),
    [],
  );
  const [layoutTab, setLayoutTab] = useLayoutState();

  return (
    <div className="gap-5 flex flex-col">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex">
          <div className="flex items-center gap-1.5">
            <span className="p-1.5 rounded-sm bg-accent">
              <Stethoscope className="size-4" />
            </span>
            <TotalTreatments treatmentStatus={status} />
            <span className="text-xs text-gray-400">Treatment(s)</span>
          </div>
          <TreatmentActions
            className="lg:hidden flex ml-auto"
            layoutTab={layoutTab}
            setLayoutTab={setLayoutTab}
            setPagination={setPagination}
            status={status}
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
            status={status}
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
          <UpdateTreatment />
          <ArchiveTreatment />
          <ArchiveMultipleTreatment />
          {layoutTab === 'card' && (
            <TreatmentCardLayout
              status={status}
              filters={filters}
              pagination={pagination}
              sorting={sorting}
              setSorting={setSorting}
              setPagination={setPagination}
            />
          )}
          {layoutTab === 'list' && (
            <TreatmentListLayout
              status={status}
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

export default Treatments;
