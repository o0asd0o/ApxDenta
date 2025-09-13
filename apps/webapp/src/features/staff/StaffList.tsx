import FilterButton from '@/components/FilterButton';
import type { PaginationState } from '@/components/__types';
import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import { Input, Separator } from '@repo/ui/components';
import type { SortingState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { Stethoscope } from 'lucide-react';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import type React from 'react';
import { useCallback, useState } from 'react';
import type { StaffFilterType } from './__types';
import ArchiveMultipleStaff from './archive/ArchiveMultipleStaff';
import ArchiveStaff from './archive/ArchiveStaff';
import FilterStaffDialog from './components/FilterStaffDialog';
import StaffActions from './components/StaffActions';
import StaffCardLayout from './components/StaffCardLayout';
import StaffListLayout from './components/StaffListLayout';
import TotalStaff from './components/TotalStaff';
import UpdateStaff from './update/UpdateStaff';
import { UpdateStaffProvider } from './update/context/UpdateStaffProvider';

const StaffList: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
  });

  const [filters, setFilters] = useState<StaffFilterType>({});

  const [layoutTab, setLayoutTab] = useQueryState(
    'layoutTab',
    parseAsStringEnum<'card' | 'list'>(['card', 'list']).withDefault('list'),
  );

  const [searchInput, setSearchInput] = useState<string>('');

  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 300),
    [],
  );

  return (
    <div>
      <Root defaultValue="doctor">
        <List>
          <ListItem value="doctor">Doctor Staff</ListItem>
          <ListItem value="general">General Staff</ListItem>
        </List>
        <TabContent value="doctor" className="py-5 gap-5 flex flex-col">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex">
              <div className="flex items-center gap-1.5">
                <span className="p-1.5 rounded-sm bg-accent">
                  <Stethoscope className="size-4" />
                </span>
                <TotalStaff staffType="DOCTOR" />
                <span className="text-xs text-gray-400">Doctor(s)</span>
              </div>
              <StaffActions
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
                  return (
                    key !== 'search' && value !== undefined && value !== ''
                  );
                })}
              />
              <Separator
                orientation="vertical"
                className="mx-1 hidden lg:block"
                style={{ height: '30px', width: '1px' }}
              />
              <StaffActions
                className="hidden lg:flex"
                layoutTab={layoutTab}
                setLayoutTab={setLayoutTab}
                setPagination={setPagination}
              />
            </div>
            <FilterStaffDialog
              applyFilters={setFilters}
              defaultFilters={filters}
              open={filterOpen}
              setOpen={setFilterOpen}
            />
          </div>
          <div>
            <UpdateStaffProvider>
              <UpdateStaff />
              <ArchiveStaff />
              <ArchiveMultipleStaff />
              {layoutTab === 'card' && (
                <StaffCardLayout
                  filters={filters}
                  pagination={pagination}
                  sorting={sorting}
                  setSorting={setSorting}
                  setPagination={setPagination}
                />
              )}
              {layoutTab === 'list' && (
                <StaffListLayout
                  filters={filters}
                  pagination={pagination}
                  sorting={sorting}
                  setSorting={setSorting}
                  setPagination={setPagination}
                />
              )}
            </UpdateStaffProvider>
          </div>
        </TabContent>
        <TabContent value="general">General Staff content</TabContent>
      </Root>
    </div>
  );
};

export default StaffList;
