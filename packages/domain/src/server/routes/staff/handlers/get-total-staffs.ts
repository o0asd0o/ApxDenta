import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getAllStaffCount } from './db-operations/getAllStaffCount';

const inputSchema = z.object({
  staffType: z.enum(['DOCTOR', 'STAFF']).optional(),
});

export type GetAllStaffsProps = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: GetAllStaffsProps) => {
  const result = await getAllStaffCount(
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
