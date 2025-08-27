import type { DatabaseInstance } from '@/db';
import { GET_DETAULT_UPDATED_AT } from '@/server/utils/helpers';
import type { UpdateStaffInfoParams } from '../update-staff-info';

export const updateStaffInfo = async (
  db: DatabaseInstance,
  staffId: string,
  staffData: UpdateStaffInfoParams['input']['staffData'],
) => {
  let qb = db
    .updateTable(staffData.file?.id ? ['Staff', 'File'] : ['Staff'])
    .set({
      firstName: staffData.firstName || undefined,
      lastName: staffData.lastName || undefined,
      contactNumber: staffData.phoneNumber || undefined,
      email: staffData.email || undefined,
      address: staffData.address || undefined,
      specialistsRecordId: staffData.specialistId || undefined,
      updatedAt: GET_DETAULT_UPDATED_AT(),
    });

  if (staffData.file?.id) {
    qb = qb
      .set({ url: staffData.file.id })
      .whereRef('File.id', '=', 'Staff.avatarId');
  }

  return qb.where('id', '=', staffId).executeTakeFirstOrThrow();
};
