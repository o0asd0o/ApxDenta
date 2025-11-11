import { Skeleton, TableCell, TableRow } from '@repo/ui/components';
import React from 'react';

type Props = {
  key: string;
};
const TreatmentListLoaderItem: React.FC<Props> = ({ key }) => {
  return (
    <TableRow key={key}>
      {/* Select checkbox */}
      <TableCell
        key={`${key}-select`}
        className="h-[54px] first:pl-3 last:pr-3 w-5"
      >
        <Skeleton className="size-4.5 rounded-sm" />
      </TableCell>
      {/* Treatment Name + SAMPLE badge */}
      <TableCell key={`${key}-name`} className="first:pl-3 last:pr-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-32 rounded" />
        </div>
      </TableCell>
      {/* Price */}
      <TableCell key={`${key}-price`} className="first:pl-3 last:pr-3">
        <div className="flex items-center gap-1">
          <span className="text-gray-500 text-sm">Start from</span>
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      </TableCell>
      {/* Estimate Duration */}
      <TableCell key={`${key}-duration`} className="first:pl-3 last:pr-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12 rounded" />
          <span className="text-gray-500 text-xs">/ treatment</span>
        </div>
      </TableCell>
      {/* Type of Visit badge */}
      <TableCell key={`${key}-type`} className="first:pl-3 last:pr-3 w-[80px]">
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>
      {/* Rating (star + value) */}
      <TableCell key={`${key}-rating`} className="first:pl-3 last:pr-3">
        <div className="inline-flex items-center gap-1">
          <Skeleton className="size-4 rounded-full text-gray-500 " />
          <Skeleton className="h-4 w-8 rounded" />
        </div>
      </TableCell>
      {/* Reviews count */}
      <TableCell key={`${key}-reviews`} className="first:pl-3 last:pr-3">
        <Skeleton className="h-4 w-16 rounded" />
      </TableCell>
      {/* Actions */}
      <TableCell
        key={`${key}-actions`}
        className="first:pl-3 last:pr-3 w-[50px]"
      >
        <Skeleton className="h-8 w-8 rounded-full" />
      </TableCell>
    </TableRow>
  );
};

export default TreatmentListLoaderItem;
