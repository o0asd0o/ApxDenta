import { Input } from '@repo/ui/components';
import { debounce } from 'lodash';
import { Stethoscope } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import TotalTreatments from './components/TotalTreatments';

const ActiveTreatments: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [filters, setFilters] = useState<{ search?: string }>({});
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 300),
    [],
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
          {/* <StaffActions
            staffType="STAFF"
            className="lg:hidden flex ml-auto"
            layoutTab={layoutTab}
            setLayoutTab={setLayoutTab}
            setPagination={setPagination}
          /> */}
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
          {/* <FilterButton
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
            staffType="STAFF"
            className="hidden lg:flex"
            layoutTab={layoutTab}
            setLayoutTab={setLayoutTab}
            setPagination={setPagination}
          />
          */}
        </div>
        {/* <FilterStaffDialog
          type="STAFF"
          applyFilters={setFilters}
          defaultFilters={filters}
          open={filterOpen}
          setOpen={setFilterOpen}
        /> */}
      </div>
      <div>table</div>
    </div>
  );
};

export default ActiveTreatments;
