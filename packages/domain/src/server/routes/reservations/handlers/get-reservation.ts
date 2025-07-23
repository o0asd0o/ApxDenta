import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  id: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const result = await ctx.db
    .selectFrom('Reservation')
    .selectAll()
    .where('Reservation.id', '=', input.id)
    .executeTakeFirstOrThrow();

  return { status: 'SUCCESS' as const, data: result };
};

export { inputSchema, handler };
