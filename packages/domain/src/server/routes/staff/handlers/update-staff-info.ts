import * as errors from '@/server/common/errors';
import type { HandlerType } from '@/server/types';
import {
  additionalDaysOffSchema,
  assignedServicesSchema,
  dayOffsSchema,
  staffInfoSchema,
  workingHoursSchema,
} from '@repo/schemas';
import { z } from 'zod';
import { updateStaffAssignedServices } from './db-operations/commands/update-assigned-services.command';
import { updateStaffDayOffs } from './db-operations/commands/update-days-off.command';
import { updateStaffInfo } from './db-operations/commands/update-staff-info.command';
import { updateStaffWorkSchedules } from './db-operations/commands/update-working-hours.command';

const inputSchema = z.object({
  staffId: z.string(),
  staffData: staffInfoSchema
    .partial()
    .omit({ file: true })
    .extend({ file: z.object({ id: z.string() }).optional() })
    .optional(),
  assignedServices: assignedServicesSchema.optional(),
  dayOffs: dayOffsSchema.optional(),
  extraDayOffs: additionalDaysOffSchema.optional(),
  workingHours: workingHoursSchema.optional(),
});

export type UpdateStaffParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: UpdateStaffParams) => {
  try {
    if (input.staffData) {
      await updateStaffInfo(ctx.db, input.staffId, input.staffData);
    }

    if (input.assignedServices) {
      await updateStaffAssignedServices(
        ctx.db,
        input.staffId,
        input.assignedServices,
      );
    }

    if (input.dayOffs) {
      await updateStaffDayOffs(
        ctx.db,
        input.staffId,
        input.dayOffs,
        input.extraDayOffs,
      );
    }

    if (input.workingHours) {
      await updateStaffWorkSchedules(ctx.db, input.staffId, input.workingHours);
    }

    return { status: 'SUCCESS' as const, data: null };
  } catch (error) {
    console.error('Error updating staff information:', error);
    throw errors.serverError();
  }
};

export { inputSchema, handler };
