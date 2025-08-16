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
import { staffDbActions } from './__db-actions';
import { sendStaffConfirmationEmail } from './__helpers';

const inputSchema = z.object({
  type: z.enum(['DOCTOR', 'STAFF']),
  staffInfo: staffInfoSchema
    .omit({ file: true })
    .extend({ file: z.object({ id: z.string() }).optional() }),
  assignedServices: assignedServicesSchema,
  dayOffs: dayOffsSchema,
  extraDayOffs: additionalDaysOffSchema.optional(),
  workingHours: workingHoursSchema,
});

export type CreateStaffParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: CreateStaffParams) => {
  const dayOffs = input.dayOffs.dayOffs.slice(0);

  try {
    const returnedStaff = await ctx.db
      .transaction()
      .execute(async (transaction) => {
        const staff = await staffDbActions.saveStaff(
          transaction,
          input,
          ctx.organizationId,
        );

        const staffDbAfterCreate = new staffDbActions.StaffDbAfterSaveActions(
          transaction,
          staff.id,
        );

        if ((input.extraDayOffs || []).length > 0) {
          const extraDayOffs = await staffDbAfterCreate.saveStaffExtraDayOffs(
            input.extraDayOffs,
          );
          dayOffs.concat(extraDayOffs.map((dayOff) => dayOff.id));
        }

        await Promise.all([
          /** ASSIGNED TREATMENTS (M2M) */
          staffDbAfterCreate.saveStaffAssignedServices(input.assignedServices),
          /** WORK SCHEDULES */
          staffDbAfterCreate.saveStaffWorkSchedules(input.workingHours),
          /** DAY OFFS M2M */
          staffDbAfterCreate.saveStaffDayOffs(dayOffs),
        ]);

        return staff;
      });

    await sendStaffConfirmationEmail(returnedStaff, input.staffInfo.email);
  } catch (error) {
    console.error('Error creating staff:', error);
    throw errors.serverError();
  }
};

export { inputSchema, handler };
