import { adminAc } from 'better-auth/plugins/organization/access';
import { accessControl } from './__common';

export const admin = accessControl.newRole({
  ...adminAc.statements,
  clinic: ['view', 'update', 'delete', 'cancel'],
  finance: ['view', 'create', 'update', 'delete'],
  physicalAsset: ['view', 'create', 'update', 'delete'],
});
