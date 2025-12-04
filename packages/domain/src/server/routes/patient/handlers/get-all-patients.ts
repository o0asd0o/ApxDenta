import {
  cursorPaginationInput,
  offsetPaginationInput,
} from '@/server/common/schemas';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getAllPatients } from './db-operations/queries/get-all-patients.query';

const inputSchema = z
  .object({
    isActive: z.boolean().optional(),
    search: z.string().optional(),
    excludeTotalCount: z.boolean().default(false),
    // sort
    orderBy: z
      .object({
        field: z.enum(['firstName', 'createdAt', 'email']),
        direction: z.enum(['asc', 'desc']),
      })
      .optional(),
  })
  .merge(offsetPaginationInput)
  .merge(cursorPaginationInput);

export type GetAllPatientsProps = HandlerType<z.infer<typeof inputSchema>>;

const handler = async (context: GetAllPatientsProps) => {
  const result = await getAllPatients(context);

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
