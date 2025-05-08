'use client';
import { Contact } from '@/components/Contact';
import { PersonalInfo } from '@/components/PersonalInfo';
import { EMPLOYMENT_TYPE_BADGES } from '@/constants/badges';
import { STAFF_LIST } from '@/constants/options';
import { BASE_SCHEDULES } from '@/constants/schedules';
import { cn } from '@/lib/utils';
import type { EmploymentType } from '@repo/domain/db';
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import type { StaffType } from './__types';

export const columns: ColumnDef<StaffType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        className="shadow-none w-4"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="shadow-none"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 20,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="text-grayish-blue uppercase text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <PersonalInfo
          name={staff.account.user.name}
          role={STAFF_LIST.find((s) => s.value === staff.type)?.label as string}
        />
      );
    },
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <Contact email={staff.account.user.email} phone={staff.contactNumber} />
      );
    },
  },
  {
    accessorKey: 'workingDays',
    header: 'Working Days',
    cell: ({ cell }) => {
      const value = cell.getValue<string[]>();
      return (
        <div className="flex gap-1">
          {BASE_SCHEDULES.map((sched) => {
            const hit = value.includes(sched);
            return (
              <div
                key={sched}
                className={cn(
                  'h-5.5 w-5.5 rounded-full bg-gray-200 flex  text-gray-400 items-center justify-center text-[10px] font-medium',
                  hit && 'bg-[#61B0FF] text-primary-foreground border-blue-400',
                )}
              >
                {sched[0]}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'assignedTreatment',
    header: 'Assigned Treatment',
    cell: ({ cell }) => {
      const value = cell.getValue<string[]>();
      return value.map((item) => item).join(', ');
    },
  },
  {
    accessorKey: 'employmentType',
    header: 'Type',
    size: 70,
    cell: ({ cell }) => {
      const value = cell.getValue<EmploymentType>();
      return EMPLOYMENT_TYPE_BADGES[value];
    },
  },
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(staff.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
