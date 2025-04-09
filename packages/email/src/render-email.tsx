
import { render } from '@react-email/render'
import * as React from 'react'
import AccountCreation from 'templates/employees/account-creation'
import ApplyLeaveForApprover from 'templates/leaves/apply-leave-for-approver'
import ApplyLeaveForEmployee from 'templates/leaves/apply-leave-for-employee'
import ApprovedLeaveFirstForApprover from 'templates/leaves/approved-leave-first-for-approver'
import ApprovedLeaveFirstForEmployee from 'templates/leaves/approved-leave-first-for-employee'
import ApprovedLeaveSecondForEmployee from 'templates/leaves/approved-leave-second-for-employee'
import ForgotPassword from 'templates/users/forgot-password'
import MigrationNewPassword from 'templates/users/migration-new-password'

const templateMap = {
   'account-creation': AccountCreation,
   'apply-leave-for-approver': ApplyLeaveForApprover,
   'apply-leave-for-employee': ApplyLeaveForEmployee,
   'approved-leave-first-for-approver': ApprovedLeaveFirstForApprover,
   'approved-leave-first-for-employee': ApprovedLeaveFirstForEmployee,
   'approved-leave-second-for-employee': ApprovedLeaveSecondForEmployee,
   'migrate-new-password': MigrationNewPassword,
   'forgot-password': ForgotPassword,
}

const renderEmail = <T extends keyof typeof templateMap>(
   template: T,
   props: Record<string, string>,
   plainText?: boolean
): string => {
   const Template = templateMap[template] as React.FC<Record<string, string>>

   return render(<Template {...props} />, { plainText })
}

type RenderEmail = typeof renderEmail

export { renderEmail }
export type { RenderEmail }

