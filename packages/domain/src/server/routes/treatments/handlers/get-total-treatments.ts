import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getAllTreatmentCount } from './db-operations/queries/get-total-treatments.query';

const inputSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ ctx, input }: Params) => {
  const result = await getAllTreatmentCount(
    ctx.db,
    ctx.organizationId as string,
    input.status,
  );

  return { status: 'SUCCESS' as const, data: result };
};

export { inputSchema, handler };
