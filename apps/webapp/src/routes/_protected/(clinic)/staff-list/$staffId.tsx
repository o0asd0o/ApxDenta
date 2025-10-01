import ViewStaff from '@/features/staff/view/ViewStaff';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/_protected/(clinic)/staff-list/$staffId')({
  params: z.object({ staffId: z.string() }),
  loader: async ({ context, params }) => {
    if (context.trpc) {
      await context.queryClient.ensureQueryData(
        context.trpc.staffs.getStaff.queryOptions({ id: params.staffId }),
      );
    }
  },
  component: ViewStaff,
});
