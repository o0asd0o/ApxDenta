import type { DB, DatabaseInstance, StaffType, WorkingDay } from '@/db';
import { GET_DETAULT_DATES } from '@/server/utils/helpers';
import { executeWithOffsetPagination } from '@/server/utils/pagination/offset';
import type { Transaction } from 'kysely';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import {
  getFormattedWorkScheduleByDay,
  getWorkScheduleByDayFromWorkingHours,
} from './__helpers';
import type { CreateStaffParams } from './create-staff';
import type { GetAllStaffsProps } from './get-all-staffs';

class StaffDbAfterSaveActions {
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
      .values(dayOffs.map((dayOff) => ({ ...dayOff, staffId: this.staffId })))
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
}

const saveStaff = async (
  transaction: Transaction<DB>,
  input: CreateStaffParams['input'],
) => {
  return transaction
    .insertInto('Staff')
    .values({
      firstName: input.staffInfo.firstName,
      lastName: input.staffInfo.lastName,
      contactNumber: input.staffInfo.phoneNumber,
      position: 'N/A', // leave for now
      email: input.staffInfo.email,
      type: input.type,
      address: input.staffInfo.address,
      employmentType: input.staffInfo.type,
      specialistsRecordId: input.staffInfo.specialistId,
      ...GET_DETAULT_DATES(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();
};

export const getAllStaff = async (
  db: DatabaseInstance,
  input: GetAllStaffsProps['input'],
) => {
  let query = db
    .selectFrom('Staff')
    .selectAll()
    .select((eb) => {
      return jsonObjectFrom(
        eb
          .selectFrom('SpecialistsRecord')
          .select(['SpecialistsRecord.title', 'SpecialistsRecord.code'])
          .whereRef('SpecialistsRecord.id', '=', 'Staff.specialistsRecordId'),
      ).as('specialistRecord');
    })
    .select((eb) => {
      return jsonArrayFrom(
        eb
          .selectFrom('WorkSchedule')
          .select('WorkSchedule.day')
          .whereRef('WorkSchedule.staffId', '=', 'Staff.id'),
      ).as('workSchedules');
    })
    .select((eb) => {
      return jsonArrayFrom(
        eb
          .selectFrom('Treatment')
          .select(['Treatment.name', 'Treatment.id'])
          .innerJoin(
            '_StaffAssignedTreatment',
            '_StaffAssignedTreatment.B',
            'Treatment.id',
          )
          .whereRef('_StaffAssignedTreatment.A', '=', 'Staff.id'),
      ).as('assignedServices');
    });

  if (!input.orderBy) {
    query = query.orderBy('createdAt', 'desc');
  }

  if (input.search) {
    query = query.where((eb) => {
      const search = input.search?.toLowerCase();
      return eb.or([
        eb(db.fn('lower', ['firstName']), 'like', `%${search}%`),
        eb(db.fn('lower', ['lastName']), 'like', `%${search}%`),
        eb(db.fn('lower', ['email']), 'like', `%${search}%`),
        eb(db.fn('lower', ['contactNumber']), 'like', `%${search}%`),
      ]);
    });
  }

  if (input.orderBy) {
    const { field, direction } = input.orderBy;
    query = query.orderBy(field, direction);
  }

  if (input.specialistIn?.length) {
    query = query.where('specialistsRecordId', 'in', input.specialistIn);
  }

  if (input.assignedServicesIn?.length) {
    query = query.where(({ selectFrom, exists }) => {
      return exists(
        selectFrom('_StaffAssignedTreatment')
          .select('id')
          .whereRef('_StaffAssignedTreatment.A', '=', 'Staff.id')
          .where('B', 'in', input.assignedServicesIn || []),
      );
    });
  }

  if (input.schedulesIn?.length) {
    query = query.where(({ selectFrom, exists }) => {
      return exists(
        selectFrom('WorkSchedule')
          .select('id')
          .whereRef('WorkSchedule.staffId', '=', 'Staff.id')
          .where('day', 'in', input.schedulesIn || []),
      );
    });
  }

  if (input.perPage) {
    return executeWithOffsetPagination(query, {
      page: input.page || 1,
      perPage: input.perPage,
      excludeTotalCount: input.excludeTotalCount,
    });
  }

  const items = await query.execute();

  return {
    items,
    hasNextPage: false,
    hasPrevPage: false,
    endCursor: null,
    count: items.length,
  };
};

export const getAllStaffCount = async (
  db: DatabaseInstance,
  staffType?: StaffType,
) => {
  let query = db
    .selectFrom('Staff')
    .select((eb) => eb.fn.countAll().as('count'));

  if (staffType) {
    query = query.where('type', '=', staffType);
  }

  return query
    .executeTakeFirstOrThrow()
    .then((result) => result.count as number);
};

export const getStaffById = async (db: DatabaseInstance, staffId: string) => {
  return db
    .selectFrom('Staff')
    .selectAll()
    .where('Staff.id', '=', staffId)
    .executeTakeFirstOrThrow();
};

export const staffDbActions = {
  saveStaff,
  getAllStaff,
  getAllStaffCount,
  getStaffById,
  StaffDbAfterSaveActions,
};
