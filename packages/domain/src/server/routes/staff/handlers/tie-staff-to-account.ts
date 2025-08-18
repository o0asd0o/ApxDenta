import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { tieStaffToAccount } from './db-operations/tieStaffToAccount';

const inputSchema = z.object({
  staffId: z.string(),
  userId: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  await tieStaffToAccount(ctx.db, input.staffId, input.userId);
  return { status: 'SUCCESS' as const, data: null };
};

export { inputSchema, handler };
