'use client';
import { Contact } from '@/components/Contact';
import { PersonalInfo } from '@/components/PersonalInfo';
import { EMPLOYMENT_TYPE_BADGES } from '@/constants/badges';
import { STAFF_LIST } from '@/constants/options';
import { BASE_SCHEDULES } from '@/constants/schedules';
import { cn } from '@/lib/utils';
import { Tooltip } from '@radix-ui/react-tooltip';
import type { EmploymentType, WorkingDay } from '@repo/domain/db';
import {
  Button,
  Checkbox,
  TooltipContent,
  TooltipTrigger,
  V2,
} from '@repo/ui/components';
import type { ColumnDef } from '@tanstack/react-table';
import { EditIcon, EyeIcon, MoreVertical, Trash2Icon } from 'lucide-react';
import type { StaffColumnType } from './__types';

export const columns: ColumnDef<StaffColumnType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        className="shadow-none size-4.5 rounded-sm"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="shadow-none size-4.5 rounded-sm"
        aria-label="Select row"
      />
    ),
    enableHiding: false,
    size: 20,
  },
  {
    accessorKey: 'name',
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          className="text-grayish-blue uppercase text-xs p-1"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <PersonalInfo
          name={
            staff.account?.user.name || `${staff.firstName} ${staff.lastName}`
          }
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
        <Contact
          email={staff.account?.user.email}
          phone={staff.contactNumber}
        />
      );
    },
  },
  {
    accessorKey: 'workSchedules',
    header: 'Working Days',
    cell: ({ cell }) => {
      const value = cell.getValue<{ day: WorkingDay }[]>();
      return (
        <div className="flex gap-1">
          {Object.keys(BASE_SCHEDULES).map((sched) => {
            const hit = value.some(
              (item) => item.day === (sched as WorkingDay),
            );
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
    accessorKey: 'assignedServices',
    size: 200,
    header: 'Assigned Treatment',
    cell: ({ cell }) => {
      const assignedTreatments =
        cell.getValue<{ name: string; id: string }[]>();
      return (
        <div className="w-full items-center gap-1">
          <span className="text-[13px]">{assignedTreatments[0].name}</span>
          {assignedTreatments.length > 1 && (
            <Tooltip>
              <TooltipTrigger
                asChild
                className="bg-transparent text-primary text-xs font-bold"
              >
                <span className="ml-1 cursor-default">
                  +{assignedTreatments.length - 1}
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="bg-gray-200 text-shadow-gray-800 [&>span>svg]:bg-gray-200 [&>span>svg]:fill-gray-200"
              >
                <ul className="text-gray-950 list-disc pl-3">
                  {assignedTreatments.slice(1).map((treatment) => (
                    <li key={treatment.id} className="text-sm">
                      {treatment.name}
                    </li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      );
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
          <V2.DropdownMenu>
            <V2.DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </V2.DropdownMenuTrigger>
            <V2.DropdownMenuContent className="min-w-46">
              <V2.DropdownMenuLabel>Actions</V2.DropdownMenuLabel>
              <V2.DropdownMenuSeparator />
              <V2.DropdownMenuGroup>
                <V2.DropdownMenuItem>
                  <span className="flex items-center gap-x-2">
                    <EyeIcon className="size-4 text-inherit" />
                    <span>View Doctor</span>
                  </span>
                </V2.DropdownMenuItem>
                <V2.DropdownMenuItem>
                  <span className="flex items-center gap-x-2">
                    <EditIcon className="size-4 text-inherit" />
                    <span>Update Doctor</span>
                  </span>
                </V2.DropdownMenuItem>
                <V2.DropdownMenuItem>
                  <span className="flex items-center gap-x-2 text-red-500">
                    <Trash2Icon className="size-4 text-inherit" />
                    <span>Delete</span>
                  </span>
                </V2.DropdownMenuItem>
              </V2.DropdownMenuGroup>
              <V2.DropdownMenuSeparator />
            </V2.DropdownMenuContent>
          </V2.DropdownMenu>
        </div>
      );
    },
  },
];
