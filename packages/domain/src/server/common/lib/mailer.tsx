import { env } from '@/env';
import { createResend } from '@/lib';
import {
  type EmailTemplate,
  type EmailTemplateProps,
  getSubject,
  renderEmail,
} from '@repo/email';

import * as errors from '@/server/common/errors';

console.log(env);
const transporter = createResend({ apiKey: env.SERVER_RESEND_API_KEY });

type EmailSender = <T extends EmailTemplate>(email: {
  template: T;
  to: string | string[];
  data: EmailTemplateProps<T>;
}) => Promise<void>;

const createEmailSender = (): EmailSender => {
  return async (email) => {
    try {
      await transporter.emails.send({
        from: `ApxDenta Admin <${env.SERVER_RESEND_EMAIL}>`,
        to: email.to,
        subject: getSubject(email.template),
        html: renderEmail(email.template, email.data),
      });
    } catch (error) {
      console.log({ error: JSON.stringify(error, undefined, 2) });
      throw errors.serverError();
    }
  };
};

const sendEmail = createEmailSender();

const mailer = { sendEmail };
export default mailer;
