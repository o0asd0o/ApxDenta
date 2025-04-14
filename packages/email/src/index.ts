import type { AccountCreationProps } from 'templates/employees/account-creation';
import type { ApplyLeaveForApproverProps } from 'templates/leaves/apply-leave-for-approver';
import type { ApplyLeaveForEmployeeProps } from 'templates/leaves/apply-leave-for-employee';
import type { ApprovedLeaveFirstForApproverProps } from 'templates/leaves/approved-leave-first-for-approver';
import type { ApprovedLeaveFirstForEmployeeProps } from 'templates/leaves/approved-leave-first-for-employee';
import type { ApprovedLeaveSecondForEmployeeProps } from 'templates/leaves/approved-leave-second-for-employee';
import type { ForgotPasswordProps } from 'templates/users/forgot-password';
import type { MigrationNewPasswordProps } from 'templates/users/migration-new-password';
import { renderEmail as renderEmailFn } from './render-email';

type TemplateMap = {
  'account-creation': AccountCreationProps;
  'apply-leave-for-approver': ApplyLeaveForApproverProps;
  'apply-leave-for-employee': ApplyLeaveForEmployeeProps;
  'approved-leave-first-for-approver': ApprovedLeaveFirstForApproverProps;
  'approved-leave-first-for-employee': ApprovedLeaveFirstForEmployeeProps;
  'approved-leave-second-for-employee': ApprovedLeaveSecondForEmployeeProps;
  'migrate-new-password': MigrationNewPasswordProps;
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
    'account-creation': 'Account Created | Systech Industries.',
    'apply-leave-for-approver': 'Leave Approval | Systech Industries.',
    'apply-leave-for-employee': 'Processing Leave | Systech Industries.',
    'approved-leave-first-for-approver': 'Leave Approval | Systech Industries.',
    'approved-leave-first-for-employee':
      'Processing Leave | Systech Industries.',
    'approved-leave-second-for-employee':
      'Successfully Filed Leave | Systech Industries',
    'migrate-new-password': 'Migration to new URL | Systech Industries',
    'forgot-password': 'Password Reset | Systech Industries',
  };

  return subjectMap[template];
};

export { getSubject, renderEmail };
export type { EmailTemplate, EmailTemplateProps };
