import type { DatabaseInstance } from '@/db/client';
import mailer from '@/server/common/lib/mailer';
import { betterAuth } from 'better-auth';
import { organization } from 'better-auth/plugins';
import { getOrganizationIdForUser } from './db-operations/organization';
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
    },
    emailVerification: {
      async sendVerificationEmail({ user, token }) {
        const email = user.email;

        await mailer.sendEmail({
          template: 'email-verification',
          to: email,
          data: {
            email,
            firstName: user.name.split(' ')[0] as string,
            token,
          },
        });
      },

      sendOnSignUp: true,
      expiresIn: 3600, // 1 hour
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,

      async sendResetPassword({ user, token }) {
        const email = user.email;
        await mailer.sendEmail({
          template: 'forgot-password',
          to: email,
          data: {
            email,
            name: user.name,
            firstName: user.name.split(' ')[0] as string,
            token,
          },
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
        async sendInvitationEmail(data) {
          // await resend.emails.send({
          //   from: process.env.RESEND_EMAIL as string,
          //   to: data.email,
          //   subject: "You've been invited to join an organization",
          //   text: 'You are are invited',
          // });
        },
      }),
    ],
  });
};
