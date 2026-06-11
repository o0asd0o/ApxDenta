import { useTRPC } from '@/lib/trpc';
import { useQuery } from '@tanstack/react-query';
import type React from 'react';

type Props = {
  isActive: boolean;
};

const TotalPatients: React.FC<Props> = ({ isActive }) => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.patients.getTotalPatients.queryOptions({
      isActive,
    }),
  );

  return <span className="font-semibold text-lg">{data?.data.count || 0}</span>;
};

export default TotalPatients;
