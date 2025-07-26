import { accessControl } from './__common';

export const genStaff = accessControl.newRole({
  clinic: ['view', 'update', 'create', 'delete', 'cancel'],
  finance: ['view', 'update', 'delete'],
  physicalAsset: ['view', 'update', 'delete'],
});
