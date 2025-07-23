import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  limit: z.number().optional().default(10),
  cursor: z.string().optional(),
});

type Props = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Props) => {
  const result = await ctx.db.selectFrom('Asset').selectAll().execute();
  // TODO: implement
  return { status: 'SUCCESS' as const };
};

export { inputSchema, handler };
