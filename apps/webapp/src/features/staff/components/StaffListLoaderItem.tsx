import { BASE_SCHEDULES } from '@/constants/schedules';
import type { StaffType } from '@repo/domain/db';
import { Skeleton, TableCell, TableRow } from '@repo/ui/components';
import React from 'react';

type Props = {
  key: string;
  type: StaffType;
};

const StaffListLoaderItem: React.FC<Props> = ({ key, type }) => {
  return (
    <TableRow key={key}>
      <TableCell key={`${key}11`} className="h-[61px] first:pl-3 last:pr-3">
        <Skeleton className="size-4.5 w-full rounded" />
      </TableCell>
      <TableCell key={`${key}12`} className="first:pl-3 last:pr-3">
        <div className="flex gap-2.5 items-center animate-pulse">
          <Skeleton className="size-7 rounded-full" />
          <div className="flex gap-1 flex-col">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-14 rounded" />
          </div>
        </div>
      </TableCell>
      <TableCell key={`${key}13`} className="first:pl-3 last:pr-3">
        <div className="flex gap-1 flex-col">
          <Skeleton className="h-4 w-30 rounded" />
          <Skeleton className="h-4 w-44 rounded" />
        </div>
      </TableCell>
      <TableCell key={`${key}14`} className="first:pl-3 last:pr-3">
        <div className="gap-1 flex">
          {Object.keys(BASE_SCHEDULES).map((sched) => {
            return <Skeleton key={sched} className={'size-5.5 rounded-full'} />;
          })}
        </div>
      </TableCell>
      {type === 'DOCTOR' && (
        <TableCell key={`${key}15`} className="first:pl-3 last:pr-3">
          <Skeleton className="h-4 w-full rounded" />
        </TableCell>
      )}
      <TableCell key={`${key}16`} className="first:pl-3 last:pr-3">
        <Skeleton className="h-4 w-20 rounded-full" />
      </TableCell>
      <TableCell key={`${key}17`} className="first:pl-3 last:pr-3">
        <div className="w-full flex justify-end pr-4">
          <Skeleton className="h-6 w-3 rounded" />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StaffListLoaderItem;
