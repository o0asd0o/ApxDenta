import type { DatabaseInstance } from '@/db/client';
import { betterAuth, logger } from 'better-auth';
import { organization } from 'better-auth/plugins';
import { getOrganizationIdForUser } from './db-operations/organization';
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
          async before(session) {
            const activeOrganizationId = await getOrganizationIdForUser(
              db,
              session.userId,
            );

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
      // async onEmailVerification(user) {
      //   const email = user.email;
      // },

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
