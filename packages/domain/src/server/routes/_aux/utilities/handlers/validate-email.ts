import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  email: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const existing = await ctx.db
    .selectFrom('user')
    .select(['id'])
    .where('email', '=', input.email)
    .executeTakeFirst();

  if (existing) {
    return { status: 'FAILED', data: null, message: 'User already exists' };
  }

  return { status: 'SUCCESS' as const, data: null };
};

export { inputSchema, handler };
