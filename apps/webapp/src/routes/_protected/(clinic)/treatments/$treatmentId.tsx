import ViewTreatment from '@/features/treatments/view/ViewTreatment';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute(
  '/_protected/(clinic)/treatments/$treatmentId',
)({
  params: z.object({ treatmentId: z.string() }),
  loader: async ({ context, params }) => {
    if (context.trpc) {
      await context.queryClient.ensureQueryData(
        context.trpc.treatments.getTreatment.queryOptions({
          id: params.treatmentId,
        }),
      );
    }
  },
  component: ViewTreatment,
});
