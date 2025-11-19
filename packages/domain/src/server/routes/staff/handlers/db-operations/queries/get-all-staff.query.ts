import { executeWithOffsetPagination } from '@/server/utils/pagination';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import type { GetAllStaffsProps } from '../../get-all-staffs';

export const getAllStaff = async (context: GetAllStaffsProps) => {
  const {
    ctx: { db, organizationId },
    input,
  } = context;

  let query = db
    .selectFrom('Staff')
    .selectAll()
    .where('Staff.organizationId', '=', organizationId)
    .where('Staff.isArchived', '=', false)
    .where('Staff.type', '=', input.type)
    .select((eb) => {
      return jsonObjectFrom(
        eb
          .selectFrom('SpecialistsRecord')
          .select(['SpecialistsRecord.title', 'SpecialistsRecord.code'])
          .whereRef('SpecialistsRecord.id', '=', 'Staff.specialistsRecordId'),
      ).as('specialistRecord');
    })
    .select((eb) => {
      return jsonObjectFrom(
        eb
          .selectFrom('File')
          .select(['File.url'])
          .whereRef('File.id', '=', 'Staff.avatarId'),
      ).as('avatar');
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
