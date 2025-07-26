import type { DatabaseInstance } from '@/db/client';
import { betterAuth } from 'better-auth';
import { organization } from 'better-auth/plugins';
import { accessControl } from './permissions/__common';
import { admin } from './permissions/admin';
import { doctor } from './permissions/doctor';
import { genStaff } from './permissions/genStaff';

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

export const createAuth = ({
  webUrl,
  db,
  authSecret,
  googleCredentials,
}: AuthOptions) => {
  return betterAuth({
    secret: authSecret,
    trustedOrigins: [webUrl].map((url) => new URL(url).origin),
    database: { db, type: 'postgres' },

    // sendResetPassword: async ({ user, url, token }, request) => {
    //   // await sendEmail({
    //   //   to: user.email,
    //   //   subject: 'Reset your password',
    //   //   text: `Click the link to reset your password: ${url}`,
    //   // });
    // },
    // onPasswordReset: async ({ user }, request) => {
    //   // your logic here
    //   console.log(`Password for user ${user.email} has been reset.`);
    // },

    session: {
      expiresIn: 60 * 60 * 24 * 1,
      updateAge: 60 * 60 * 4,
    },
    emailVerification: {
      async onEmailVerification(user, request) {
        console.log('Email verification sent to:', user.email);
        // You can implement custom logic here, like sending a welcome email
      },
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: true,
      async sendResetPassword(data, request) {
        console.log({ data, request });
        // Send an email to the user with a link to reset their password
      },
    },

    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ['google'],
      },
    },
    socialProviders: {
      google: {
        ...googleCredentials,
      },
    },
    plugins: [
      organization({
        ac: accessControl,
        roles: { genStaff, admin, doctor },
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
