import { useTRPC } from '@/lib/trpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react';

const MedicalComponentSeeder: React.FC = () => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const { data: components, isLoading } = useQuery({
    ...trpc.components.getAllComponents.queryOptions({ page: 1, perPage: 1 }),
    enabled: import.meta.env.VITE_ENABLE_SEEDERS === '1',
  });

  const { mutate: seedComponents, isPending } = useMutation(
    trpc.seeder.seedMedicalComponents.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.components.getAllComponents.queryKey(),
        });
      },
    }),
  );
  if (
    import.meta.env.VITE_ENABLE_SEEDERS === '0' ||
    components?.data.length !== 0
  ) {
    return null;
  }

  const loading = isLoading || isPending;
  return (
    <button
      className="bg-none border-none underline text-primary-300 text-sm ml-2 font-normal"
      type="button"
      onClick={() => seedComponents({})}
    >
      {!loading && 'seed'}
      {loading && <Loader2 className="animate-spin size-5" />}
    </button>
  );
};

export default MedicalComponentSeeder;
