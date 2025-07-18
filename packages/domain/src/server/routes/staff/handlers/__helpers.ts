import type { Staff } from '@/db';
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

export const sendStaffConfirmationEmail = async (
  staff: Selectable<Staff>,
  staffEmail: string,
) => {
  await mailer.sendEmail({
    template: 'staff-account-confirmation',
    to: staffEmail,
    data: {
      firstName: staff.firstName,
      name: `${staff.firstName} ${staff.lastName}`,
      staffId: staff.id,
      createdDate: new Date().toISOString(),
    },
  });
};
