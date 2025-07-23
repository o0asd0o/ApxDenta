import type { StaffAccountConfirmationProps } from '@/templates/staff/staff-account-confirmation';
import type { ForgotPasswordProps } from '@/templates/users/forgot-password';
import { renderEmail as renderEmailFn, templateMap } from './render-email';

type TemplateMap = {
  'staff-account-confirmation': StaffAccountConfirmationProps;
  'forgot-password': ForgotPasswordProps;
};

type EmailTemplate = keyof TemplateMap;
type EmailTemplateProps<T extends EmailTemplate> = TemplateMap[T];
type RenderEmail = <T extends keyof TemplateMap>(
  template: T,
  props: TemplateMap[T],
  plainText?: boolean,
) => string;

const renderEmail = renderEmailFn as RenderEmail;

const getSubject = (template: keyof TemplateMap): string => {
  const subjectMap = {
    'staff-account-confirmation': 'Account Confirmation | ApxDenta',
    'forgot-password': 'Password Reset | ApxDenta',
  } as const;

  return subjectMap[template];
};

export { getSubject, renderEmail, templateMap };
export type { EmailTemplate, EmailTemplateProps };
