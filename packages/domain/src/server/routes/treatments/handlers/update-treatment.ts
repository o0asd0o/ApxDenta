import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { updateTreatment } from './db-operations/commands/update-treatment.command';

const inputSchema = z.object({
  id: z.string(),
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
      id: z.string().optional(),
      medicalComponentId: z.string(),
      quantity: z.number(),
      free: z.boolean().optional(),
      freeUpTo: z.number().optional(),
    })
    .array()
    .optional(),
  visits: z
    .array(
      z.object({
        id: z.string().optional(),
        treatmentId: z.string(),
        gracePeriod: z
          .number()
          .min(0, 'Grace period must be at least 0')
          .optional(),
        gracePeriodUnit: z.enum(['DAYS', 'WEEKS', 'MONTHS']).optional(),
      }),
    )
    .optional(),
});

export type UpdateTreatmentParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: UpdateTreatmentParams) => {
  const updated = await updateTreatment({ input, ctx });

  return { status: 'SUCCESS' as const, id: updated.id };
};

export { inputSchema, handler };
