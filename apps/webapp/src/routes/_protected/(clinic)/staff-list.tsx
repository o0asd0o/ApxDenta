// import { StaffList } from '@/features/staff/StaffList';
import { Loader } from '@repo/ui/components';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

const StaffList = React.lazy(() => import('@/features/staff/StaffList'));

export const Route = createFileRoute('/_protected/(clinic)/staff-list')({
  component: StaffList,
  loader: async ({ context }) => {
    if (context.trpc) {
      await context.queryClient.ensureQueryData(
        context.trpc.staffs.getAllStaffs.queryOptions({
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
    <div className="h-[400px] justify-center items-center w-full">
      <Loader className="[&>svg]:size-[50px] [&>svg]:text-gray-300 h-full" />
    </div>
  ),
});
