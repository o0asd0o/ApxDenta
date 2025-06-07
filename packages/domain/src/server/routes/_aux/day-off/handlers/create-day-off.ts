import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  name: z.string(),
  from: z.date(),
  to: z.date(),

  repeat: z.boolean(),

  isDefault: z.boolean().optional(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  await ctx.db.insertInto('DayOff').values(input).execute();
  return { status: 'SUCCESS' as const };
};

export { inputSchema, handler };
