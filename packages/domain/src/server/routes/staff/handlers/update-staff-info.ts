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
import { updateStaffAssignedServices } from './db-operations/updateAssignedServices';
import { updateStaffDayOffs } from './db-operations/updateDaysOff';
import { updateStaffInfo } from './db-operations/updateStaffInfo';
import { updateStaffWorkSchedules } from './db-operations/updateWorkingHours';

const inputSchema = z.object({
  staffId: z.string(),
  staffData: staffInfoSchema
    .partial()
    .omit({ file: true })
    .extend({ file: z.object({ id: z.string() }).optional() }),
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
