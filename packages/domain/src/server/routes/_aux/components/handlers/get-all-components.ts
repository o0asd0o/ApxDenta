import { getOffsetPaginatedRowsFromQuery } from '@/server/common/handlers';
import { offsetPaginationInput } from '@/server/common/schemas';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z
  .object({
    search: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
  })
  .merge(offsetPaginationInput)
  .optional();

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  let query = ctx.db.selectFrom('MedicalComponent').selectAll();

  if (input?.search) {
    query = query.where('name', 'like', `%${input.search}%`);
  }

  if (input?.minPrice !== undefined) {
    query = query.where('price', '>=', input.minPrice);
  }

  if (input?.maxPrice !== undefined) {
    query = query.where('price', '<=', input.maxPrice);
  }

  query = query.orderBy('name', 'asc');

  if (input?.perPage) {
    const response = await getOffsetPaginatedRowsFromQuery(query, input);
    return response;
  }

  const result = await query.execute();

  return { status: 'SUCCESS' as const, data: result };
};

export { inputSchema, handler };
