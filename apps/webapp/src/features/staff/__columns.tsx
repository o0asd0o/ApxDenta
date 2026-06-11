'use client';
import { Contact } from '@/components/Contact';
import { PersonalInfo } from '@/components/PersonalInfo';
import { EMPLOYMENT_TYPE_BADGES } from '@/constants/badges';
import { STAFF_LIST } from '@/constants/options';
import type { EmploymentType, StaffType, WorkingDay } from '@repo/domain/db';
import {
  Button,
  Checkbox,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components';
import type { ColumnDef } from '@tanstack/react-table';
import { RenderStaffActions, renderWorkingDays } from './__renderers';
import type { StaffColumnType } from './__types';

export const getStaffColumns = (
  type: StaffType,
): ColumnDef<StaffColumnType>[] => [
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
          id={staff.id}
          profile={staff.avatar?.url as string}
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
          email={staff.account?.user.email || (staff.email as string)}
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
      return renderWorkingDays(value, 'flex-nowrap');
    },
  },
  ...(type === 'STAFF'
    ? []
    : [
        {
          accessorKey: 'assignedServices',
          size: 200,
          header: 'Offered Services',

          cell: ({ cell }) => {
            const assignedTreatments =
              cell.getValue<{ name: string; id: string }[]>();
            return (
              <div className="w-full items-center gap-1">
                <span className="text-[13px]">
                  {assignedTreatments[0]?.name}
                </span>
                {assignedTreatments.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger
                      asChild
                      className="bg-transparent text-primary text-xs font-semibold"
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
        } satisfies ColumnDef<StaffColumnType>,
      ]),
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
    cell: ({ row }) => (
      <RenderStaffActions
        name={`${row.original.firstName} ${row.original.lastName}`}
        staffId={row.original.id}
        original={row.original}
      />
    ),
  },
];
