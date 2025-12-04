import { useTRPC } from '@/lib/trpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react';

const PatientSeeder: React.FC = () => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const { data: treatments, isLoading } = useQuery({
    ...trpc.patients.getAllPatients.queryOptions({
      page: 1,
      perPage: 1,
    }),
    enabled: import.meta.env.VITE_ENABLE_SEEDERS === '1',
  });

  const { mutate: seedPatients, isPending } = useMutation(
    trpc.seeder.seedPatients.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.patients.getAllPatients.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.patients.getTotalPatients.queryKey(),
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
      onClick={() => seedPatients({})}
    >
      <>
        {!loading && 'seed'}
        {loading && <Loader2 className="animate-spin size-4" />}
      </>
    </button>
  );
};

export default PatientSeeder;
