import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import {
  getStaffCertifications,
  getStaffEducations,
  getStaffOverviewStats,
  getStaffRecentActivities,
} from './db-operations/queries/get-staff-overview.query';

const inputSchema = z.object({
  staffId: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const [stats, recentActivities, certifications, educations] =
    await Promise.all([
      getStaffOverviewStats(ctx.db, input.staffId),
      getStaffRecentActivities(ctx.db, input.staffId, 10),
      getStaffCertifications(ctx.db, input.staffId),
      getStaffEducations(ctx.db, input.staffId),
    ]);

  return {
    status: 'SUCCESS' as const,
    data: {
      stats,
      recentActivities,
      certifications,
      educations,
    },
  };
};

export { inputSchema, handler };
