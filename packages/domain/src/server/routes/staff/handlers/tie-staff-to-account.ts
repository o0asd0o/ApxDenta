import * as errors from '@/server/common/errors';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { tieStaffToAccount } from './db-operations/tieStaffToAccount';

const inputSchema = z.object({
  staffId: z.string(),
  userId: z.string(),
  invitationId: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  try {
    await tieStaffToAccount(
      ctx.db,
      input.staffId,
      input.userId,
      input.invitationId,
    );
    return { status: 'SUCCESS' as const, data: null };
  } catch (error) {
    console.error('Error tying staff to account:', error);
    throw errors.serverError();
  }
};

export { inputSchema, handler };
