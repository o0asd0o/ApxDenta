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
import { sendStaffConfirmationEmail } from './__helpers';
import { StaffDbAfterSaveActions } from './db-operations/StaffAfterSaveActions.class';
import { getOrganizationById } from './db-operations/getOrganization';
import { saveStaff } from './db-operations/saveStaff';

const inputSchema = z.object({
  type: z.enum(['DOCTOR', 'STAFF']),
  staffInfo: staffInfoSchema.omit({ file: true, specialistId: true }).extend({
    file: z.object({ id: z.string() }).optional(),
    specialistId: z.string().optional(),
  }),
  assignedServices: assignedServicesSchema,
  dayOffs: dayOffsSchema,
  extraDayOffs: additionalDaysOffSchema.optional(),
  workingHours: workingHoursSchema,
});

export type CreateStaffParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: CreateStaffParams) => {
  let dayOffs = input.dayOffs.dayOffs.slice(0);

  try {
    const [returnedStaff, staffInvite] = await ctx.db
      .transaction()
      .execute(async (transaction) => {
        const staff = await saveStaff(
          transaction,
          input,
          ctx.organizationId as string,
        );

        const staffDbAfterCreate = new StaffDbAfterSaveActions(
          transaction,
          staff.id,
        );

        if ((input.extraDayOffs || []).length > 0) {
          const extraDayOffs = await staffDbAfterCreate.saveStaffExtraDayOffs(
            input.extraDayOffs,
          );

          dayOffs = dayOffs.concat(extraDayOffs.map((dayOff) => dayOff.id));
        }

        const [invite] = await Promise.all([
          /** INVITATION */
          staffDbAfterCreate.createInvitation({ input, ctx }),
          /** ASSIGNED TREATMENTS (M2M) */
          staffDbAfterCreate.saveStaffAssignedServices(input.assignedServices),
          /** WORK SCHEDULES */
          staffDbAfterCreate.saveStaffWorkSchedules(input.workingHours),
          /** DAY OFFS M2M */
          staffDbAfterCreate.saveStaffDayOffs(dayOffs),
        ]);

        return [staff, invite];
      });

    const org = await getOrganizationById(ctx.db, ctx.organizationId as string);

    await sendStaffConfirmationEmail({
      staff: returnedStaff,
      invitation: staffInvite,
      organization: org,
      user: ctx.session?.user,
    });
  } catch (error) {
    console.error('Error creating staff:', error);
    throw errors.serverError();
  }
};

export { inputSchema, handler };
