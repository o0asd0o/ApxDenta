// import { StaffList } from '@/features/staff/StaffList';
import LoadingCard from '@/components/LoaderCard';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

const StaffList = React.lazy(() => import('@/features/staff/StaffList'));

export const Route = createFileRoute('/_protected/(clinic)/staff-list/')({
  component: StaffList,
  loader: async ({ context }) => {
    console.log({ context });
    if (context.trpc) {
      await context.queryClient.ensureQueryData(
        context.trpc.staffs.getAllStaffs.queryOptions({
          type: 'DOCTOR',
          search: '',
          assignedServicesIn: [],
          schedulesIn: [],
          specialistIn: [],
          statusIn: [],
          perPage: 12,
          page: 1,
        }),
      );
    }
  },
  pendingComponent: () => (
    <div className="flex h-[500px] justify-center items-center w-full">
      <LoadingCard />
    </div>
  ),
});
