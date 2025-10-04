import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  title: z.string(),
  code: z.string(),
  description: z.string().optional(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const created = await ctx.db
    .insertInto('SpecialistsRecord')
    .values(input)
    .returning('id')
    .executeTakeFirstOrThrow();

  return { status: 'SUCCESS' as const, id: created.id };
};

export { inputSchema, handler };
