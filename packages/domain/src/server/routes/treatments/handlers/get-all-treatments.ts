import { offsetPaginationInput } from '@/server/common/schemas';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getAllTreatments } from './db-operations/getAllTreatments';

const inputSchema = z
  .object({
    status: z.enum(['ACTIVE', 'INACTIVE']),
    search: z.string().optional(),
    rating: z.array(z.number()).length(2).optional(),
    priceRange: z.array(z.number()).length(2).optional(),
    type: z.enum(['MULTIPLE_VISIT', 'SINGLE_VISIT']).optional(),
    excludeTotalCount: z.boolean().default(false),

    // sorting
    orderBy: z
      .object({
        field: z.enum(['name', 'rating', 'review']), // add more if needed
        direction: z.enum(['asc', 'desc']),
      })
      .optional(),
  })
  .merge(offsetPaginationInput);

export type GetAllTreatmentsParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async (params: GetAllTreatmentsParams) => {
  const result = await getAllTreatments(params);

  return {
    status: 'SUCCESS' as const,
    data: result.items,
    endCursor: result.endCursor,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    count: result.count,
  };
};

export { inputSchema, handler };
