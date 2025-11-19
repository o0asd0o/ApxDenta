import type { DatabaseInstance } from '@/db';
import type { UpdateStaffParams } from '../../update-staff-info';

export const updateStaffAssignedServices = async (
  db: DatabaseInstance,
  staffId: string,
  assignedServices: UpdateStaffParams['input']['assignedServices'],
) => {
  const services = [
    ...(assignedServices?.cosmeticServices || []),
    ...(assignedServices?.treatmentService || []),
  ];

  db.transaction().execute(async (tx) => {
    await tx
      .deleteFrom('_StaffAssignedTreatment')
      .where('A', '=', staffId)
      .execute();

    await tx
      .insertInto('_StaffAssignedTreatment')
      .values(services.map((treatmentId) => ({ A: staffId, B: treatmentId })))
      .execute();
  });
};
