import { useTRPC } from '@/lib/trpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react';

const GenStaffSSeeder: React.FC = () => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const { data: treatments } = useQuery({
    ...trpc.staffs.getAllStaffs.queryOptions({
      type: 'STAFF',
      page: 1,
      perPage: 1,
    }),
    enabled: import.meta.env.VITE_ENABLE_SEEDERS === '1',
  });

  const { mutate: seedGetStaffs, isPending } = useMutation(
    trpc.seeder.seedStaff.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.staffs.getAllStaffs.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.staffs.getTotalStaffs.queryKey(),
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

  return (
    <button
      className="bg-none border-none underline text-primary-400 text-sm ml-2 font-normal"
      type="button"
      onClick={() => seedGetStaffs({ type: 'STAFF' })}
    >
      <>
        {!isPending && 'seed'}
        {isPending && <Loader2 className="animate-spin size-4" />}
      </>
    </button>
  );
};

export default GenStaffSSeeder;
