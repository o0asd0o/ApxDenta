import { Resend } from 'resend';

export const createResend = ({ apiKey }: { apiKey: string }) => {
  return new Resend(apiKey);
};

export default createResend;
