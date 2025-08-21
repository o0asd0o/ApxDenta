import mailer from '@/server/common/lib/mailer';

export const sendResetPasswordEmail = async (data: {
  email: string;
  name: string;
  token: string;
}) => {
  const email = data.email;
  await mailer.sendEmail({
    template: 'forgot-password',
    to: email,
    data: {
      email,
      name: data.name,
      firstName: data.name.split(' ')[0] as string,
      token: data.token,
    },
  });
};

export const sendVerificationEmail = async (data: {
  email: string;
  name: string;
  token: string;
}) => {
  const email = data.email;
  await mailer.sendEmail({
    template: 'email-verification',
    to: email,
    data: {
      email,
      firstName: data.name.split(' ')[0] as string,
      token: data.token,
    },
  });
};
