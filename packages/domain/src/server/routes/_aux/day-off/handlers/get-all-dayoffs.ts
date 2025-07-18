import { getOffsetPaginatedRowsFromQuery } from '@/server/common/handlers';
import { offsetPaginationInput } from '@/server/common/schemas';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z
  .object({
    defaultOnly: z.boolean().optional(),
    nonDefaultOnly: z.boolean().optional(),
    search: z.string().optional(),
  })
  .merge(offsetPaginationInput)
  .optional();

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  let query = ctx.db.selectFrom('DayOff').selectAll();

  if (input?.defaultOnly) {
    query = query.where('isDefault', '=', true);
  }

  if (input?.nonDefaultOnly) {
    query = query.where('isDefault', '=', false);
  }

  if (input?.search) {
    query = query.where('name', 'like', `%${input.search}%`);
  }

  if (input?.perPage) {
    const response = await getOffsetPaginatedRowsFromQuery(query, input);
    return response;
  }

  const result = await query.execute();

  return { status: 'SUCCESS' as const, data: result };
};

export { inputSchema, handler };
