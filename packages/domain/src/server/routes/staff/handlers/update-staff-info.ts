import * as errors from '@/server/common/errors';
import type { HandlerType } from '@/server/types';
import { staffInfoSchema } from '@repo/schemas';
import { z } from 'zod';
import { updateStaffInfo } from './db-operations/updateStaffInfo';

const inputSchema = z.object({
  staffId: z.string(),
  staffData: staffInfoSchema
    .omit({ file: true })
    .extend({ file: z.object({ id: z.string() }).optional() })
    .partial(),
});

export type UpdateStaffInfoParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: UpdateStaffInfoParams) => {
  try {
    await updateStaffInfo(ctx.db, input.staffId, input.staffData);
    return { status: 'SUCCESS' as const, data: null };
  } catch (error) {
    console.error('Error tying staff to account:', error);
    throw errors.serverError();
  }
};

export { inputSchema, handler };
