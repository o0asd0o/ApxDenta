import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  type: z.enum(['DOCTOR', 'STAFF']),
  employmentType: z.enum(['PART_TIME', 'FULL_TIME']),
  position: z.string(),
  contactNumber: z.string(),
  address: z.string().nullable(),
  lat: z.number().nullable(),
  long: z.number().nullable(),
  specialistsRecordId: z.string().nullable(),
  accountId: z.string().nullable(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  await ctx.db.insertInto('Staff').values(input).execute();
  return { status: 'SUCCESS' as const };
};

export { inputSchema, handler };
