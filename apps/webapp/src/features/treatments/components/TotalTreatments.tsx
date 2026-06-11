import { useTRPC } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Props = {
  treatmentStatus: 'ACTIVE' | 'INACTIVE';
};
const TotalTreatments: React.FC<Props> = ({ treatmentStatus }) => {
  const trpc = useTRPC();
  const { data: totalTreatments } = useQuery(
    trpc.treatments.getTotalTreatments.queryOptions({
      status: treatmentStatus,
    }),
  );

  return (
    <span className="text-lg font-semibold">{totalTreatments?.data || ''}</span>
  );
};

export default TotalTreatments;
