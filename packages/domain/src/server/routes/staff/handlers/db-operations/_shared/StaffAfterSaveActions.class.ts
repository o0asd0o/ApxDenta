import type { DB, WorkingDay } from '@/db';
import { GET_DETAULT_DATES } from '@/server/utils/helpers';
import dayjs from 'dayjs';
import type { Transaction } from 'kysely';
import {
  getFormattedWorkScheduleByDay,
  getWorkScheduleByDayFromWorkingHours,
} from '../../__helpers';
import type { CreateStaffParams } from '../../create-staff';

export class StaffDbAfterSaveActions {
  transaction: Transaction<DB>;
  staffId: string;

  constructor(_transaction: Transaction<DB>, _staffId: string) {
    this.transaction = _transaction;
    this.staffId = _staffId;
  }

  saveStaffExtraDayOffs = async (
    extraDayOffs: CreateStaffParams['input']['extraDayOffs'],
  ) => {
    const dayOffs = extraDayOffs || [];
    return this.transaction
      .insertInto('DayOff')
      .values(dayOffs)
      .returning('id')
      .execute();
  };

  saveStaffAssignedServices = async (
    assignedServices: CreateStaffParams['input']['assignedServices'],
  ) => {
    const services = [
      ...assignedServices.cosmeticServices,
      ...assignedServices.treatmentService,
    ];

    await this.transaction
      .insertInto('_StaffAssignedTreatment')
      .values(
        services.map((treatmentId) => ({ A: this.staffId, B: treatmentId })),
      )
      .execute();
  };

  saveStaffWorkSchedules = async (
    workingHours: CreateStaffParams['input']['workingHours'],
  ) => {
    const workScheduleByDay = getWorkScheduleByDayFromWorkingHours(
      workingHours,
      this.staffId,
    );
    const schedules = getFormattedWorkScheduleByDay(workScheduleByDay);

    await this.transaction
      .insertInto('WorkSchedule')
      .values(
        schedules.map((item) => ({
          day: item.day?.toUpperCase() as WorkingDay,
          from: item.startTime,
          to: item.endTime,
          staffId: this.staffId,
          ...GET_DETAULT_DATES(),
        })),
      )
      .execute();
  };

  saveStaffDayOffs = async (
    dayOffs: CreateStaffParams['input']['dayOffs']['dayOffs'],
  ) => {
    await this.transaction
      .insertInto('_StaffDayOff')
      .values(dayOffs.map((dayOffId) => ({ A: dayOffId, B: this.staffId })))
      .execute();
  };

  createInvitation = async ({ input, ctx }: CreateStaffParams) => {
    return await this.transaction
      .insertInto('invitation')
      .values({
        expiresAt: dayjs().add(7, 'day').toDate(),
        email: input.staffInfo.email,
        inviterId: ctx.session?.user.id as string,
        organizationId: ctx.organizationId as string,
        status: 'pending',
        id: crypto.randomUUID(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  };
}
