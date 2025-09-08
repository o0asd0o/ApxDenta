import type { DatabaseInstance } from '@/db';
import type { UpdateStaffParams } from '../update-staff-info';
import { StaffDbAfterSaveActions } from './StaffAfterSaveActions.class';

export const updateStaffDayOffs = async (
  db: DatabaseInstance,
  staffId: string,
  _dayOffs: UpdateStaffParams['input']['dayOffs'],
  extraDayOffs?: UpdateStaffParams['input']['extraDayOffs'],
) => {
  let dayOffs = _dayOffs?.dayOffs || [].slice(0);
  await db.transaction().execute(async (tx) => {
    const saveStaff = new StaffDbAfterSaveActions(tx, staffId);

    if ((extraDayOffs || []).length > 0) {
      const result = await saveStaff.saveStaffExtraDayOffs(
        extraDayOffs?.filter((item) => item.id === undefined) || [],
      );
      dayOffs = dayOffs.concat(result.map((item) => item.id));
    }

    await tx.deleteFrom('_StaffDayOff').where('B', '=', staffId).execute();
    await tx
      .insertInto('_StaffDayOff')
      .values(dayOffs.map((dayOffId) => ({ A: dayOffId, B: staffId })))
      .execute();
  });
};
