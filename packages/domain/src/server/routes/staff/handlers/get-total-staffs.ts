import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getAllStaffCount } from './db-operations/queries/get-staff-count.query';

const inputSchema = z.object({
  staffType: z.enum(['DOCTOR', 'STAFF']).optional(),
});

export type GetAllStaffsProps = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: GetAllStaffsProps) => {
  const result = await getAllStaffCount(
    ctx.db,
    ctx.organizationId as string,
    input.staffType,
  );

  return {
    status: 'SUCCESS' as const,
    total: result,
  };
};

export { inputSchema, handler };
