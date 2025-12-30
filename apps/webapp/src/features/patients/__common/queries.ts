import type { useTRPC } from '@/lib/trpc';
import type { QueryClient } from '@tanstack/react-query';

export const invalidatePatientsList = async (
  queryClient: QueryClient,
  trpc: ReturnType<typeof useTRPC>,
) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: trpc.patients.getAllPatients.queryKey(),
    }),
    queryClient.invalidateQueries({
      queryKey: trpc.patients.getTotalPatients.queryKey(),
    }),
    queryClient.invalidateQueries({
      queryKey: ['patientsList'],
    }),
  ]);
};
