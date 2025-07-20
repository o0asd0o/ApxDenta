import FilterButton from '@/components/FilterButton';
import PillTabs from '@/components/PillTabs';
import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import type { PaginationState } from '@/components/types';
import { Input, Separator } from '@repo/ui/components';
import type { SortingState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { LayoutGrid, ListIcon, Stethoscope } from 'lucide-react';
import type React from 'react';
import { useCallback, useState } from 'react';
import type { StaffFilterType } from './__types';
import CreateStaff from './add/CreateStaff';
import { CreateStaffProvider } from './add/context/CreateStaffProvider';
import FilterStaffDialog from './components/FilterStaffDialog';
import StaffCardLayout from './components/StaffCardLayout';
import StaffListLayout from './components/StaffListLayout';
import TotalStaff from './components/TotalStaff';

const StaffList: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
  });

  const [filters, setFilters] = useState<StaffFilterType>({});
  const [layoutTab, setLayoutTab] = useState<'card' | 'list'>('list');

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
          <div className="flex">
            <div className="flex items-center gap-1.5">
              <span className="p-1.5 rounded-sm bg-accent">
                <Stethoscope className="size-4" />
              </span>
              <TotalStaff staffType="DOCTOR" />
              <span className="text-xs text-gray-400">Doctor(s)</span>
            </div>
            <div className="ml-auto flex gap-2 items-center">
              <Input
                value={searchInput}
                placeholder="Search name, email, or phone"
                className="w-[400px]!"
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
                className="mx-1"
                style={{ height: '30px' }}
              />
              <PillTabs
                selectedTab={layoutTab}
                onChangeTab={(value) => {
                  setPagination({
                    current: 1,
                    pageSize: value === 'card' ? 12 : 10,
                  });
                  setLayoutTab(value);
                }}
                defaultSelectedTab="list"
                tabs={[
                  { label: <ListIcon className="size-4" />, value: 'list' },
                  { label: <LayoutGrid className="size-4" />, value: 'card' },
                ]}
              />
              <CreateStaffProvider>
                <CreateStaff />
              </CreateStaffProvider>
            </div>
            <FilterStaffDialog
              applyFilters={setFilters}
              defaultFilters={filters}
              open={filterOpen}
              setOpen={setFilterOpen}
            />
          </div>
          <div>
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
          </div>
          {/* {staffList &&
            (staffList.data || []).length > 0 &&
            layoutTab === 'list' && (
              <Paginate
                listCount={staffList.count}
                pagination={{ setState: setPagination, state: pagination }}
              />
            )} */}
        </TabContent>
        <TabContent value="general">General Staff content</TabContent>
      </Root>
    </div>
  );
};

export default StaffList;
