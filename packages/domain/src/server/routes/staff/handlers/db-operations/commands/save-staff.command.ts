import type { DB } from '@/db';
import { GET_DETAULT_DATES } from '@/server/utils/helpers';
import type { Transaction } from 'kysely';
import type { CreateStaffParams } from '../../create-staff';

export const saveStaff = async (
  transaction: Transaction<DB>,
  input: CreateStaffParams['input'],
  orgId: string,
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
      ...(!!input.staffInfo.specialistId && {
        specialistsRecordId: input.staffInfo.specialistId,
      }),
      avatarId: input.staffInfo.file?.id,
      organizationId: orgId,
      ...GET_DETAULT_DATES(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();
};
