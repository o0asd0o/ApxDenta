import type { useTRPC } from '@/lib/trpc';
import type { QueryClient } from '@tanstack/react-query';

export const invalidateStaffList = async (
  queryClient: QueryClient,
  trpc: ReturnType<typeof useTRPC>,
) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: trpc.staffs.getTotalStaffs.queryKey(),
    }),
    queryClient.invalidateQueries({
      queryKey: trpc.staffs.getAllStaffs.queryKey(),
    }),
    queryClient.invalidateQueries({ queryKey: ['staffList'] }),
  ]);
};
