import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  note: z.string().nullable(),
  status: z.enum(['DONE', 'CANCELLED', 'PENDING', 'ENCOUNTER', 'NO_SHOW']),
  staffId: z.string(),
  initialTreatmentId: z.string(),
  patientId: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  await ctx.db.insertInto('Reservation').values(input).execute();
  return { status: 'SUCCESS' as const };
};

export { inputSchema, handler };
