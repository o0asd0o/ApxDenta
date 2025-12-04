import PatientSeeder from '@/components/@seeders/PatientSeender';
import type { PaginationState } from '@/components/__types';
import { Input, Separator } from '@repo/ui/components';
import type { SortingState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { Users } from 'lucide-react';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import React, { useCallback, useState } from 'react';
import type { PatientFilterType } from './__types';
import PatientsActions from './components/PatientsActions';
import PatientsCardLayout from './components/PatientsCardLayout';
import PatientsListLayout from './components/PatientsListLayout';
import TotalPatients from './components/TotalPatients';

type Props = {
  isActive: boolean;
};

const PatientsTab: React.FC<Props> = ({ isActive }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
  });

  const [filters, setFilters] = useState<PatientFilterType>({});

  const [layoutTab, setLayoutTab] = useQueryState(
    'layoutTab',
    parseAsStringEnum<'card' | 'list'>(['card', 'list']).withDefault('list'),
  );

  const [searchInput, setSearchInput] = useState<string>('');

  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setFilters((prev: PatientFilterType) => ({ ...prev, search: value }));
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
              <Users className="size-4" />
            </span>
            <TotalPatients isActive={isActive} />
            <span className="text-xs text-gray-400">
              {isActive ? 'Active' : 'Inactive'} Patient(s)
            </span>
            <PatientSeeder />
          </div>
          <PatientsActions
            className="lg:hidden flex ml-auto"
            layoutTab={layoutTab}
            setLayoutTab={setLayoutTab}
            setPagination={setPagination}
          />
        </div>

        <div className="lg:ml-auto flex gap-2 items-center">
          <Input
            value={searchInput}
            placeholder="Search name, email, phone, or address"
            className="flex-1 w-full lg:w-[400px]!"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value);
              handleSearchChange(e.target.value);
            }}
            type="search"
          />
          <Separator
            orientation="vertical"
            className="mx-1 hidden lg:block"
            style={{ height: '30px', width: '1px' }}
          />
          <PatientsActions
            className="hidden lg:flex"
            layoutTab={layoutTab}
            setLayoutTab={setLayoutTab}
            setPagination={setPagination}
          />
        </div>
      </div>
      <div>
        {layoutTab === 'card' && (
          <PatientsCardLayout
            isActive={isActive}
            filters={filters}
            pagination={pagination}
            sorting={sorting}
            setSorting={setSorting}
            setPagination={setPagination}
          />
        )}
        {layoutTab === 'list' && (
          <PatientsListLayout
            isActive={isActive}
            filters={filters}
            pagination={pagination}
            sorting={sorting}
            setSorting={setSorting}
            setPagination={setPagination}
          />
        )}
      </div>
    </div>
  );
};

export default PatientsTab;
