import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getStaffById } from './db-operations/queries/get-staff.query';

const inputSchema = z.object({
  id: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const result = await getStaffById(ctx.db, input.id);

  return { status: 'SUCCESS' as const, data: result };
};

export { inputSchema, handler };
