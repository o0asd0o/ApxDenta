import type { useTRPC } from '@/lib/trpc';
import type { QueryClient } from '@tanstack/react-query';

export const invalidateTreatmentList = async (
  queryClient: QueryClient,
  trpc: ReturnType<typeof useTRPC>,
) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: trpc.treatments.getTotalTreatments.queryKey(),
    }),
    queryClient.invalidateQueries({
      queryKey: trpc.treatments.getAllTreatments.queryKey(),
    }),
    queryClient.invalidateQueries({ queryKey: ['treatmentList'] }),
  ]);
};
