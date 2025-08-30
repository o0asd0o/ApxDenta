import type { DatabaseInstance, WorkingDay } from '@/db';
import { GET_DETAULT_DATES } from '@/server/utils/helpers';
import type { WorkingHoursFormType } from '@repo/schemas';
import {
  getFormattedWorkScheduleByDay,
  getWorkScheduleByDayFromWorkingHours,
} from '../__helpers';
import type { UpdateStaffParams } from '../update-staff-info';

export const updateStaffWorkSchedules = async (
  db: DatabaseInstance,
  staffId: string,
  workingHours: UpdateStaffParams['input']['workingHours'],
) => {
  const workScheduleByDay = getWorkScheduleByDayFromWorkingHours(
    workingHours as WorkingHoursFormType,
    staffId,
  );
  const schedules = getFormattedWorkScheduleByDay(workScheduleByDay);

  db.transaction().execute(async (tx) => {
    await tx
      .deleteFrom('WorkSchedule')
      .where('staffId', '=', staffId)
      .execute();

    await tx
      .insertInto('WorkSchedule')
      .values(
        schedules.map((item) => ({
          day: item.day?.toUpperCase() as WorkingDay,
          from: item.startTime,
          to: item.endTime,
          staffId,
          ...GET_DETAULT_DATES(),
        })),
      )
      .execute();
  });
};
