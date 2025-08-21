import type { Staff, invitation, organization } from '@/db';
import mailer from '@/server/common/lib/mailer';
import type { WorkingHoursFormType } from '@repo/schemas';
import type { Selectable } from 'kysely';
import type { WorkScheduleByDay } from './__types';

export const getFormattedWorkScheduleByDay = (
  workScheduleByDay: WorkScheduleByDay[],
) => {
  return workScheduleByDay
    .filter((item) => !!item?.endTime && !!item?.startTime)
    .map((item) => {
      const startHour = `${String(item?.startTime).padStart(4, '0').slice(0, 2)}`;
      const startMin = `${String(item?.startTime).padStart(4, '0').slice(2)}`;

      const endHour = `${String(item?.endTime).padStart(4, '0').slice(0, 2)}`;
      const endMin = `${String(item?.endTime).padStart(4, '0').slice(2)}`;

      return {
        ...item,
        startTime: `${startHour}:${startMin}:00`,
        endTime: `${endHour}:${endMin}:00`,
      };
    });
};

export const getWorkScheduleByDayFromWorkingHours = (
  workingHours: WorkingHoursFormType,
  staffId: string,
) => {
  return Object.entries(workingHours).map(([day, hours]) => ({
    staffId,
    day: day.toUpperCase(),
    ...hours,
  }));
};

export const sendStaffConfirmationEmail = async (params: {
  staff: Selectable<Staff>;
  invitation: Selectable<invitation>;
  organization: Pick<organization, 'id' | 'name' | 'logo'>;
}) => {
  await mailer.sendEmail({
    template: 'staff-account-confirmation',
    to: params.staff.email as string,
    data: {
      firstName: params.staff.firstName,
      name: `${params.staff.firstName} ${params.staff.lastName}`,
      staffId: params.staff.id,
      createdDate: new Date().toISOString(),
      invitationId: params.invitation.id,
      organization: params.organization,
    },
  });
};
