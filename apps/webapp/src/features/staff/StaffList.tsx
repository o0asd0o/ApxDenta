import Paginate from '@/components/Paginate';
import { DataTable } from '@/components/data-table/DataTable';
import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import type { PaginationState } from '@/components/types';
import { useTRPC } from '@/lib/trpc';
import { Button, Input } from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import type { SortingState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { ListFilterIcon, Stethoscope } from 'lucide-react';
import type React from 'react';
import { useCallback, useState } from 'react';
import { columns } from './__columns';
import type { StaffFilterType } from './__types';
import CreateStaff from './add/CreateStaff';
import { CreateStaffProvider } from './add/context/CreateStaffProvider';
import FilterStaffDialog from './components/FilterStaffDialog';

export const StaffList: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
  });

  const [filters, setFilters] = useState<StaffFilterType>({});

  const [searchInput, setSearchInput] = useState<string>('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const trpc = useTRPC();
  const { data: staffList, isLoading } = useQuery(
    trpc.staffs.getAllStaffs.queryOptions({
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

              <span className="text-lg font-bold">{staffList?.count}</span>
              <span className="text-xs text-gray-400">Doctor</span>
            </div>
            <div className="ml-auto flex gap-2 items-center">
              <Input
                value={searchInput}
                placeholder="Search name, email, and phone"
                className="w-[400px]!"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchInput(e.target.value);
                  handleSearchChange(e.target.value);
                }}
                type="search"
              />

              <Button variant="outline" onClick={() => setFilterOpen(true)}>
                <div className="relative inline-flex mr-1">
                  <ListFilterIcon className="size-3" />
                  <span className="right-[-1px] top-[-1px] absolute rounded-full size-2 bg-[#61B0FF] border-2 border-white" />
                </div>
                Filter
              </Button>

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
          <div className="">
            <DataTable
              data={staffList?.data || []}
              sort={{ sorting, setSorting }}
              loading={isLoading}
              columns={columns}
            />
          </div>
          {staffList && (staffList.data || []).length > 0 && (
            <Paginate
              listCount={staffList.count}
              pagination={{ setState: setPagination, state: pagination }}
            />
          )}
        </TabContent>
        <TabContent value="general">General Staff content</TabContent>
      </Root>
    </div>
  );
};
