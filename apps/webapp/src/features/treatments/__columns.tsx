'use client';
import { TREATMENT_TYPE_BADGES } from '@/constants/badges';
import type { TreatmentVisitType } from '@repo/domain/db';
import { Checkbox } from '@repo/ui/components';
import type { ColumnDef } from '@tanstack/react-table';
import { Star } from 'lucide-react';
// import { RenderStaffActions, renderWorkingDays } from './__renderers';
import type { TreatmentColumnType } from './__types';

export const columns: ColumnDef<TreatmentColumnType>[] = [
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
    header: 'Treatment Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const treatment = row.original;

      return (
        <span className="text-sm">
          Start from{' '}
          <span className="font-bold">
            ₱{treatment.pricePerDuration * treatment.duration}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: 'duration',
    header: 'Estimate Duration',
    cell: ({ row }) => {
      const treatment = row.original;

      if (treatment.visitType === 'SINGLE_VISIT')
        return <span>= {treatment.duration} hour(s)</span>;
      return (
        <span>= {treatment.averageDuration || 1} hour(s) / treatment</span>
      );
    },
  },
  {
    accessorKey: 'visitType',
    header: 'Type of Visit',
    size: 80,
    cell: ({ cell }) => {
      const visitType = cell.getValue<TreatmentVisitType>();
      return <div className="py-2">{TREATMENT_TYPE_BADGES[visitType]}</div>;
    },
  },
  {
    accessorKey: 'averageRating',
    header: 'Rating',
    cell: ({ cell }) => {
      const rating = cell.getValue<number | null>();

      if (rating) {
        return (
          <span className="inline-flex items-center gap-1 text-sm font-medium ">
            <Star className="text-yellow-500" />
            {rating.toFixed(1)}
          </span>
        );
      }
      return <span className="text-sm text-gray-400">No ratings</span>;
    },
  },
  {
    accessorKey: 'totalReviews',
    header: 'Reviews',
    cell: ({ cell }) => {
      const reviews = cell.getValue<number | null>();
      return (
        <span className="text-sm text-gray-400">{reviews || 0} Review(s)</span>
      );
    },
  },
  // {
  //   id: 'actions',
  //   size: 50,
  //   cell: ({ row }) => (
  //     <RenderStaffActions
  //       name={`${row.original.firstName} ${row.original.lastName}`}
  //       staffId={row.original.id}
  //       original={row.original}
  //     />
  //   ),
  // },
];
