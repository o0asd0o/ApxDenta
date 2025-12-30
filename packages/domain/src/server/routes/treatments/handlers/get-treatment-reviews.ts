import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getTreatmentReviews } from './db-operations/queries/get-treatment-reviews.query';

const inputSchema = z.object({
  treatmentId: z.string(),
  page: z.number().default(1),
  perPage: z.number().default(10),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const reviews = await getTreatmentReviews(ctx.db, {
    treatmentId: input.treatmentId,
    page: input.page,
    perPage: input.perPage,
  });

  return {
    status: 'SUCCESS' as const,
    data: reviews,
  };
};

export { inputSchema, handler };
