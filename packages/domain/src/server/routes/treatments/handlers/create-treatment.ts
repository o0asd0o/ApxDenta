import type { HandlerType } from '@/server/types';
import type { InsertResult } from 'kysely';
import { z } from 'zod';
import {
  createComponentForTreatment,
  createTreatment,
  createVisitsForTreatment,
} from './db-operations/createTreatment';

const inputSchema = z.object({
  name: z.string(),
  category: z.enum(['MEDICAL_SERVICE', 'COSMETIC_SERVICE']),
  description: z.string(),
  visitType: z.enum(['MULTIPLE_VISIT', 'SINGLE_VISIT']),
  duration: z.number(),
  pricePerduration: z.number(),
  unit: z.string().optional(),
  status: z.enum(['SAMPLE', 'FINALIZED']),
  components: z
    .object({
      medicalComponentId: z.string(),
      quantity: z.number(),
      free: z.boolean().optional(),
      freeUpTo: z.number().optional(),
    })
    .array()
    .optional(),
  visits: z.array(z.object({ treatmentId: z.string() })).optional(),
});

export type CreateTreatmentParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: CreateTreatmentParams) => {
  const created = await createTreatment({ input, ctx });

  const promises: Promise<InsertResult[]>[] = [];

  if ((input.components?.length || 0) > 0) {
    promises.push(createComponentForTreatment({ ctx, input }, created.id));
  }

  if ((input.visits?.length || 0) > 0) {
    promises.push(createVisitsForTreatment({ ctx, input }, created.id));
  }

  await Promise.all(promises);

  return { status: 'SUCCESS' as const, id: created.id };
};

export { inputSchema, handler };
