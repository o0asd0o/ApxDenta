'use client';
import { PersonalInfo } from '@/components/PersonalInfo';
import { Button, Checkbox } from '@repo/ui/components';
import type { ColumnDef } from '@tanstack/react-table';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { PatientColumnType } from './__types';

export const getPatientColumns = (): ColumnDef<PatientColumnType>[] => [
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
          Patient Name
        </Button>
      );
    },
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <PersonalInfo
          id={patient.id}
          profile={''}
          name={`${patient.firstName} ${patient.lastName}`}
        />
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="flex items-center gap-2 text-sm">
          <Phone className="size-4 text-muted-foreground" />
          <span>{patient.phoneNumber}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="flex items-center gap-2 text-sm">
          <Mail className="size-4 text-muted-foreground" />
          <span className="truncate max-w-[200px]">{patient.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="size-4 text-muted-foreground" />
          <span className="truncate max-w-[250px]">{patient.address}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Registered',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="text-sm">
          {new Date(patient.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'lastVisit',
    header: 'Last Visit',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="text-sm">
          {patient.lastReservation ? (
            <>
              {new Date(patient.lastReservation.createdAt).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                },
              )}
            </>
          ) : (
            <span className="text-muted-foreground">No visits</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'lastTreatment',
    header: 'Last Treatment',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="text-sm">
          {patient.lastTreatment ? (
            <span className="font-medium">{patient.lastTreatment.name}</span>
          ) : (
            <span className="text-muted-foreground">None</span>
          )}
        </div>
      );
    },
  },
];
