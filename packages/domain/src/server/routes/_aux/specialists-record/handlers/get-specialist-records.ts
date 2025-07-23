import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.void();

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const result = await ctx.db
    .selectFrom('SpecialistsRecord')
    .select(['id', 'title', 'code'])
    .execute();

  return { status: 'SUCCESS' as const, data: result };
};

export { inputSchema, handler };
