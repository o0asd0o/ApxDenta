import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import {
  getTreatmentRatingSummary,
  getTreatmentRatings,
} from './db-operations/queries/get-treatment-ratings.query';

const inputSchema = z.object({
  treatmentId: z.string(),
  page: z.number().default(1),
  perPage: z.number().default(10),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const [ratings, summary] = await Promise.all([
    getTreatmentRatings(ctx.db, {
      treatmentId: input.treatmentId,
      page: input.page,
      perPage: input.perPage,
    }),
    getTreatmentRatingSummary(ctx.db, input.treatmentId),
  ]);

  return {
    status: 'SUCCESS' as const,
    data: {
      ...ratings,
      summary,
    },
  };
};

export { inputSchema, handler };
