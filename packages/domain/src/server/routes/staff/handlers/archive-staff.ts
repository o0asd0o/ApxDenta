import * as errors from '@/server/common/errors';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { archiveStaffByIds } from './db-operations/archiveStaffByIds';

const inputSchema = z.object({
  staffIds: z.array(z.string()),
});

export type ArchiveStaffParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: ArchiveStaffParams) => {
  try {
    await archiveStaffByIds(ctx.db, input.staffIds);
    return { data: null, status: 'SUCCESS' };
  } catch (error) {
    console.error('Error updating staff information:', error);
    throw errors.serverError();
  }
};

export { inputSchema, handler };
