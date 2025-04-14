import type { DatabaseInstance } from '@/db/client';
import { betterAuth } from 'better-auth';
import { organization } from 'better-auth/plugins';

export interface AuthOptions {
  webUrl: string;
  googleCredentials: {
    clientId: string;
    clientSecret: string;
  };
  authSecret: string;
  db: DatabaseInstance;
}

export type AuthInstance = ReturnType<typeof betterAuth>;

/**
 * 
 * @param param0 database: {
    db,
    type: 'postgres',
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google'],
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 1,
    updateAge: 60 * 60 * 4,
  },

  trustedOrigins: ['http://localhost:3001'],
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    organization({
      async sendInvitationEmail(data) {
        await resend.emails.send({
          from: process.env.RESEND_EMAIL as string,
          to: data.email,
          subject: "You've been invited to join an organization",
          text: 'You are are invited',
        });
      },
    }),
  ],
 * @returns 
 */
export const createAuth = ({
  webUrl,
  db,
  authSecret,
  googleCredentials,
}: AuthOptions): AuthInstance => {
  return betterAuth({
    secret: authSecret,
    trustedOrigins: [webUrl].map((url) => new URL(url).origin),
    database: {
      db,
      type: 'postgres',
    },
    session: {
      expiresIn: 60 * 60 * 24 * 1,
      updateAge: 60 * 60 * 4,
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
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
      google: googleCredentials,
    },
    plugins: [
      organization({
        async sendInvitationEmail(data) {
          console.log({ data });
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
