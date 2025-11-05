import { useTRPC } from '@/lib/trpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react';

const TreatmentSeeder: React.FC = () => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const { data: treatments, isLoading } = useQuery({
    ...trpc.treatments.getAllTreatments.queryOptions({
      status: 'ACTIVE',
      page: 1,
      perPage: 1,
    }),
    enabled: import.meta.env.VITE_ENABLE_SEEDERS === '1',
  });

  const { mutate: seedTreatments, isPending } = useMutation(
    trpc.seeder.seedTreatments.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.treatments.getAllTreatments.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.treatments.getTotalTreatments.queryKey(),
        });
      },
    }),
  );
  if (
    import.meta.env.VITE_ENABLE_SEEDERS === '0' ||
    treatments?.data.length !== 0
  ) {
    return null;
  }

  const loading = isLoading || isPending;

  return (
    <button
      className="bg-none border-none underline text-primary-400 text-sm ml-2 font-normal"
      type="button"
      onClick={() => seedTreatments({})}
    >
      {!loading && 'seed'}
      {loading && <Loader2 className="animate-spin size-5" />}
    </button>
  );
};

export default TreatmentSeeder;
