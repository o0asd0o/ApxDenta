import type { DatabaseInstance } from '@/db';
import { GET_DETAULT_UPDATED_AT } from '@/server/utils/helpers';
import type { UpdateStaffInfoParams } from '../update-staff-info';

export const updateStaffInfo = async (
  db: DatabaseInstance,
  staffId: string,
  staffData: UpdateStaffInfoParams['input']['staffData'],
) => {
  let qb = db.updateTable(['Staff', 'File']).set({
    firstName: staffData.firstName,
    lastName: staffData.lastName,
    contactNumber: staffData.phoneNumber,
    email: staffData.email,
    address: staffData.address,
    specialistsRecordId: staffData.specialistId,
    updatedAt: GET_DETAULT_UPDATED_AT(),
  });

  if (staffData.file?.id) {
    qb = qb
      .set({ url: staffData.file.id })
      .whereRef('File.id', '=', 'Staff.avatarId');
  }

  return qb.where('id', '=', staffId).executeTakeFirstOrThrow();
};
