import {
  TREATMENT_STATUS_BADGES,
  TREATMENT_TYPE_BADGES,
} from '@/constants/badges';
import type { TreatmentVisitType } from '@repo/domain/db';
import { Checkbox } from '@repo/ui/components';
import type { ColumnDef } from '@tanstack/react-table';
import { Star } from 'lucide-react';
import { RenderTreatmentActions } from './__renderers';
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
    cell: ({ cell, row }) => {
      const status = row.original.status;

      const name = cell.getValue<string>();
      return (
        <span className="font-medium">
          {name}{' '}
          {status === 'SAMPLE' && TREATMENT_STATUS_BADGES['SAMPLE' as const]}
        </span>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const treatment = row.original;
      const price = treatment.pricePerDuration * treatment.duration;
      const formattedPrice = new Intl.NumberFormat('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);

      return (
        <span className="text-sm text-gray-500">
          Starts from{' '}
          <span className="font-medium text-black">₱{formattedPrice}</span>
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
        <span className="font-medium">
          = {treatment.averageDuration || 1} hour(s){' '}
          <span className="text-gray-500 font-normal">/ treatment</span>
        </span>
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
            <Star className="fill-yellow-500 text-yellow-500 size-4" />
            {rating.toFixed(1)}
          </span>
        );
      }
      return <span className="text-sm">No ratings</span>;
    },
  },
  {
    accessorKey: 'totalReviews',
    header: 'Reviews',
    cell: ({ cell }) => {
      const reviews = cell.getValue<number | null>();
      return <span className="text-sm">{reviews || 0} Review(s)</span>;
    },
  },
  {
    id: 'actions',
    size: 50,
    cell: ({ row }) => (
      <RenderTreatmentActions
        name={`${row.original.name}`}
        treatmentId={row.original.id}
        original={row.original}
      />
    ),
  },
];
