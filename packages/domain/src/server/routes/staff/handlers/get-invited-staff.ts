import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getStaffById } from './db-operations/queries/get-staff.query';

const inputSchema = z.object({
  id: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const result = await getStaffById(ctx.db, input.id);

  const minimalInfo = {
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email,
    avatar: result.avatar,
  };

  return { status: 'SUCCESS' as const, data: minimalInfo };
};

export { inputSchema, handler };
