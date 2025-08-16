import { ownerAc } from 'better-auth/plugins/organization/access';
import { accessControl } from './__common';

export const owner = accessControl.newRole({
  ...ownerAc.statements,
  clinic: ['view', 'update', 'delete', 'cancel'],
  finance: ['view', 'create', 'update', 'delete'],
  physicalAsset: ['view', 'create', 'update', 'delete'],
});
