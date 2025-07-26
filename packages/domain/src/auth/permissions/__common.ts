import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements } from 'better-auth/plugins/organization/access';

const statement = {
  ...defaultStatements,
  clinic: ['view', 'create', 'update', 'delete', 'cancel'],
  finance: ['view', 'create', 'update', 'delete'],
  physicalAsset: ['view', 'create', 'update', 'delete'],
} as const;

export const accessControl = createAccessControl(statement);
