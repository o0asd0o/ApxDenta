import FilterButton from '@/components/FilterButton';
import type { PaginationState } from '@/components/__types';
import useLayoutState from '@/hooks/use-layout-state';
import type { StaffType } from '@repo/domain/db';
import { Input, Separator } from '@repo/ui/components';
import type { SortingState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { UsersRound } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { StaffActionsProvider } from './__common/context/StaffActionsProvider';
import type { StaffFilterType } from './__types';
import ArchiveMultipleStaff from './archive/ArchiveMultipleStaff';
import ArchiveStaff from './archive/ArchiveStaff';
import FilterStaffDialog from './components/FilterStaffDialog';
import StaffActions from './components/StaffActions';
import StaffCardLayout from './components/StaffCardLayout';
import StaffListLayout from './components/StaffListLayout';
import TotalStaff from './components/TotalStaff';
import UpdateStaff from './update/UpdateStaff';

type Props = {
  type: StaffType;
};
const Staffs: React.FC<Props> = ({ type }) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
  });

  const [filters, setFilters] = useState<StaffFilterType>({});

  const [layoutTab, setLayoutTab] = useLayoutState();

  const [searchInput, setSearchInput] = useState<string>('');

  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, search: value }));
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 300),
    [],
  );
  return (
    <div className="gap-5 flex flex-col">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex">
          <div className="flex items-center gap-1.5">
            <span className="p-1.5 rounded-sm bg-accent">
              <UsersRound className="size-4" />
            </span>
            <TotalStaff staffType={type} />
            <span className="text-xs text-gray-400">{type === 'DOCTOR' ? "Doctor" : "Staff"}(s)</span>
          </div>
          <StaffActions
            staffType={type}
            className="lg:hidden flex ml-auto"
            layoutTab={layoutTab}
            setLayoutTab={setLayoutTab}
            setPagination={setPagination}
          />
        </div>

        <div className="lg:ml-auto flex gap-2 items-center">
          <Input
            value={searchInput}
            placeholder="Search name, email, or phone"
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
          <StaffActions
            staffType={type}
            className="hidden lg:flex"
            layoutTab={layoutTab}
            setLayoutTab={setLayoutTab}
            setPagination={setPagination}
          />
        </div>
        <FilterStaffDialog
          type={type}
          applyFilters={setFilters}
          defaultFilters={filters}
          open={filterOpen}
          setOpen={setFilterOpen}
        />
      </div>
      <div>
        <StaffActionsProvider>
          <UpdateStaff type={type} />
          <ArchiveStaff />
          <ArchiveMultipleStaff />
          {layoutTab === 'card' && (
            <StaffCardLayout
              type={type}
              filters={filters}
              pagination={pagination}
              sorting={sorting}
              setSorting={setSorting}
              setPagination={setPagination}
            />
          )}
          {layoutTab === 'list' && (
            <StaffListLayout
              type={type}
              filters={filters}
              pagination={pagination}
              sorting={sorting}
              setSorting={setSorting}
              setPagination={setPagination}
            />
          )}
        </StaffActionsProvider>
      </div>
    </div>
  );
};

export default Staffs;
