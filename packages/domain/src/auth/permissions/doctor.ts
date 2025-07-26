import { accessControl } from './__common';

export const doctor = accessControl.newRole({
  clinic: ['view', 'update', 'delete', 'cancel'],
});
