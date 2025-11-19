import type { DatabaseInstance } from '@/db';
import { GET_DETAULT_UPDATED_AT } from '@/server/utils/helpers';
import type { UpdateStaffParams } from '../../update-staff-info';

export const updateStaffInfo = async (
  db: DatabaseInstance,
  staffId: string,
  staffData: UpdateStaffParams['input']['staffData'],
) => {
  const qb = db.updateTable('Staff').set({
    avatarId: staffData?.file?.id || undefined,
    firstName: staffData?.firstName || undefined,
    lastName: staffData?.lastName || undefined,
    contactNumber: staffData?.phoneNumber || undefined,
    employmentType: staffData?.type || undefined,
    email: staffData?.email || undefined,
    address: staffData?.address || undefined,
    specialistsRecordId: staffData?.specialistId || undefined,
    updatedAt: GET_DETAULT_UPDATED_AT(),
  });

  return qb.where('id', '=', staffId).executeTakeFirstOrThrow();
};
