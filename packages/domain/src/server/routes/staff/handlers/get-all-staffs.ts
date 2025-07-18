import {
  cursorPaginationInput,
  offsetPaginationInput,
  staffStatusEnum,
  workDayEnum,
} from '@/server/common/schemas';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { staffDbActions } from './__db-actions';

const inputSchema = z
  .object({
    search: z.string().optional(),
    specialistIn: z.string().array().optional(),
    assignedServicesIn: z.string().array().optional(),
    schedulesIn: workDayEnum.array().optional(),
    statusIn: staffStatusEnum.array().optional(),
    // sort
    orderBy: z
      .object({
        field: z.enum(['firstName']), // add more if needed
        direction: z.enum(['asc', 'desc']),
      })
      .optional(),
  })
  .merge(offsetPaginationInput)
  .merge(cursorPaginationInput);

export type GetAllStaffsProps = HandlerType<z.infer<typeof inputSchema>>;

// TODO:
// 1. Pagination for this route
// 2. context menu for every row of staff (view, edit, delete, resend confirmation email [for pending accounts])
// 3. Apply filters (e.g. by type, by status, search by name, etc.)
// 4. Sorting by name, type, status, etc.

const handler = async ({ input, ctx }: GetAllStaffsProps) => {
  const result = await staffDbActions.getAllStaff(ctx.db, input);
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
