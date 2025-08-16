import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { staffDbActions } from './__db-actions';

const inputSchema = z.object({
  staffType: z.enum(['DOCTOR', 'STAFF']).optional(),
});

export type GetAllStaffsProps = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: GetAllStaffsProps) => {
  const result = await staffDbActions.getAllStaffCount(
    ctx.db,
    ctx.organizationId,
    input.staffType,
  );

  return {
    status: 'SUCCESS' as const,
    total: result,
  };
};

export { inputSchema, handler };
