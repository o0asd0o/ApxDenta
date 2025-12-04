import LoadingCard from '@/components/LoaderCard';
import Patients from '@/features/patients/Patients';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(clinic)/patients')({
  component: Patients,
  loader: async ({ context }) => {
    if (context.trpc) {
      await context.queryClient.ensureQueryData(
        context.trpc.patients.getAllPatients.queryOptions({
          isActive: true,
          search: '',
          perPage: 10,
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
