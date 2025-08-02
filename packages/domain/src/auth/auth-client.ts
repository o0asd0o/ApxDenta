import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient as createBetterAuthClient } from 'better-auth/react';
import { accessControl } from './permissions/__common';
import { admin } from './permissions/admin';
import { doctor } from './permissions/doctor';
import { genStaff } from './permissions/genStaff';

export interface AuthClientOptions {
  apiBaseUrl: string;
}

export const createAuthClient = ({ apiBaseUrl }: AuthClientOptions) => {
  return createBetterAuthClient({
    baseURL: apiBaseUrl,
    plugins: [
      organizationClient({
        ac: accessControl,
        roles: { genStaff, admin, doctor },
        schema: {
          organization: {
            additionalFields: {
              address: { type: 'string', required: false },
              lat: { type: 'number', required: false },
              long: { type: 'number', required: false },
              slogan: { type: 'string', required: true },
            },
          },
        },
      }),
    ],
  });
};
