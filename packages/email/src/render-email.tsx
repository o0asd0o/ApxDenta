import { staffAccountConfirmation } from './templates/staff/staff-account-confirmation';
import { emailVerification } from './templates/users/email-verification';
import { forgotPassword } from './templates/users/forgot-password';

type TemplateType = (param: Record<string, string>) => string;

const templateMap = {
  'staff-account-confirmation': staffAccountConfirmation,
  'forgot-password': forgotPassword,
  'email-verification': emailVerification,
} as const;

const renderEmail = <T extends keyof typeof templateMap>(
  template: T,
  props: Record<string, string>,
): string => {
  const Template = templateMap[template] as TemplateType;

  return Template({ ...props }) as string;
};

type RenderEmail = typeof renderEmail;

export { renderEmail, templateMap };
export type { RenderEmail };
