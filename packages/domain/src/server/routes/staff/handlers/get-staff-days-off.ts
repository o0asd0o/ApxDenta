import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getStaffDaysOff } from './db-operations/getStaffDaysOff';

const inputSchema = z.object({
  id: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const result = await getStaffDaysOff(ctx.db, input.id);

  return { status: 'SUCCESS' as const, data: result };
};

export { inputSchema, handler };
