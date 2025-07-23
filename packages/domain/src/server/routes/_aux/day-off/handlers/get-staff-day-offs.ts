import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  staffId: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const result = await ctx.db
    .selectFrom('DayOff')
    .selectAll()
    .innerJoin('_StaffDayOff', '_StaffDayOff.A', 'DayOff.id')
    .innerJoin('Staff', '_StaffDayOff.B', 'Staff.id')
    .where('Staff.id', '=', input.staffId)
    .execute();

  return { status: 'SUCCESS' as const, data: result };
};

export { inputSchema, handler };
