import { useTRPC } from '@/lib/trpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react';

const DoctorSeeder: React.FC = () => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const { data: treatments, isLoading } = useQuery({
    ...trpc.staffs.getAllStaffs.queryOptions({
      type: 'DOCTOR',
      page: 1,
      perPage: 1,
    }),
    enabled: import.meta.env.VITE_ENABLE_SEEDERS === '1',
  });

  const { mutate: seedDoctors, isPending } = useMutation(
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

  const loading = isLoading || isPending;

  return (
    <button
      className="bg-none border-none underline text-primary-400 text-sm ml-2 font-normal"
      type="button"
      onClick={() => seedDoctors({ type: 'DOCTOR' })}
    >
      <>
        {!loading && 'seed'}
        {loading && <Loader2 className="animate-spin size-4" />}
      </>
    </button>
  );
};

export default DoctorSeeder;
