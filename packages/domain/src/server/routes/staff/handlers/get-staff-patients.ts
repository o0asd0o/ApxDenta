import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getStaffPatients } from './db-operations/queries/get-staff-patients.query';

const inputSchema = z.object({
  staffId: z.string(),
  page: z.number().min(1).default(1),
  perPage: z.number().min(1).max(100).default(10),
  status: z.enum(['NEW', 'ACTIVE', 'INACTIVE']).optional(),
  search: z.string().optional(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const result = await getStaffPatients(ctx.db, {
    staffId: input.staffId,
    page: input.page,
    perPage: input.perPage,
    status: input.status,
    search: input.search,
  });

  return {
    status: 'SUCCESS' as const,
    ...result,
  };
};

export { inputSchema, handler };
