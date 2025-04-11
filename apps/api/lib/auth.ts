import { db } from '@/common/db/database';
import { betterAuth } from 'better-auth';
import { organization } from 'better-auth/plugins';
import resend from '~/lib/resend';

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: {
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
});
