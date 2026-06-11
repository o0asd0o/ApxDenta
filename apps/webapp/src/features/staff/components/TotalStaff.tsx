import { useTRPC } from '@/lib/trpc';
import type { StaffType } from '@repo/domain/db';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Props = {
  staffType: StaffType;
};
const TotalStaff: React.FC<Props> = ({ staffType }) => {
  const trpc = useTRPC();
  const { data: totalStaff } = useQuery(
    trpc.staffs.getTotalStaffs.queryOptions({ staffType }),
  );

  return (
    <span className="text-lg font-semibold">{totalStaff?.total || ''}</span>
  );
};

export default TotalStaff;
