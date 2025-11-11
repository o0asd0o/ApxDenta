import type { DatabaseInstance } from '@/db/client';
import { betterAuth, logger } from 'better-auth';
import { APIError } from 'better-auth/api';
import { createAuthMiddleware, organization } from 'better-auth/plugins';
import { getOrganizationIdForUser } from './db-operations/organization';
import {
  getInActiveStaffByEmail,
  getInactiveStaffByUserId,
} from './db-operations/staffs';
import { sendResetPasswordEmail, sendVerificationEmail } from './emails/user';
import { accessControl } from './permissions/__common';
import { admin } from './permissions/admin';
import { doctor } from './permissions/doctor';
import { genStaff } from './permissions/genStaff';
import { owner } from './permissions/owner';

export interface AuthOptions {
  webUrl: string;
  googleCredentials: {
    clientId: string;
    clientSecret: string;
  };
  authSecret: string;
  db: DatabaseInstance;
}

export type AuthInstance = ReturnType<typeof createAuth>;

export const createAuth: (_: AuthOptions) => ReturnType<typeof betterAuth> = ({
  webUrl,
  db,
  authSecret,
  googleCredentials,
}: AuthOptions) => {
  return betterAuth({
    rateLimit: { window: 20, max: 80 },

    logger: {
      disabled: false,
      level: 'error',
      log: (level, message, ...args) => {
        logger[level](
          message,
          `timestamp: ${new Date().toISOString()}`,
          ...args,
        );
      },
    },
    databaseHooks: {
      session: {
        create: {
          async before(session, ctx) {
            const [activeOrganizationId, inactiveStaff] = await Promise.all([
              getOrganizationIdForUser(db, session.userId),
              getInactiveStaffByUserId(db, session.userId),
            ]);

            if (inactiveStaff?.id) {
              ctx?.error?.('UNAUTHORIZED', {
                message: 'No active organization found for the user.',
                code: 'UNAUTHORIZED',
              });
            }

            return { data: { ...session, activeOrganizationId } };
          },
        },
      },
    },
    secret: authSecret,
    trustedOrigins: [webUrl].map((url) => new URL(url).origin),
    database: { db, type: 'postgres' },

    session: {
      expiresIn: 60 * 60 * 24 * 1,
      updateAge: 60 * 60 * 4,
      cookieCache: {
        enabled: true,
        maxAge: 1 * 60 * 60, // 1 hour
      },
    },

    emailVerification: {
      autoSignInAfterVerification: true,
      async sendVerificationEmail({ user, token }) {
        sendVerificationEmail({
          email: user.email,
          name: user.name,
          token,
        });
      },

      sendOnSignUp: true,
      expiresIn: 3600, // 1 hour
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      minPasswordLength: 8,
      revokeSessionsOnPasswordReset: true,
      resetPasswordTokenExpiresIn: 3600, // 1 hour
      requireEmailVerification: true,

      async sendResetPassword({ user, token }) {
        sendResetPasswordEmail({
          email: user.email,
          name: user.name,
          token,
        });
      },
    },

    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ['google'],
      },
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },

    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path.startsWith('/sign-in/email')) {
          const email = ctx.body.email;
          if (email) {
            const staff = await getInActiveStaffByEmail(db, email as string);
            if (staff?.id) {
              throw new APIError('UNAUTHORIZED', {
                message:
                  'Your account is deactivated. Please contact admin for more information.',
              });
            }
          }
        }
      }),
    },
    socialProviders: {
      google: { ...googleCredentials },
    },
    plugins: [
      organization({
        organizationDeletion: { disabled: false },
        ac: accessControl,
        roles: { genStaff, admin, doctor, owner },
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
