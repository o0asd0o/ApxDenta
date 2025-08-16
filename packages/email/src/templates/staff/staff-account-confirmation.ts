import templateShell from '@/template-shell';
// import type { StaffAccountConfirmationProps } from './staff-account-confirmation';

export interface StaffAccountConfirmationProps {
  firstName?: string;
  staffId: string;
  createdDate?: Date;
}

export const staffAccountConfirmation = ({
  firstName,
  staffId,
  createdDate,
}: StaffAccountConfirmationProps) => {
  const formattedDate = new Date(createdDate || new Date()).toLocaleString(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  return templateShell(
    /*html*/ `
      <div style="padding:1.35rem;padding-bottom:0;">
        <img
          src="https://d1o0iervdpova7.cloudfront.net/apx-denta-string-only.png"
          alt="ApxDenta"
          style="width:auto;height:30px;display:block;"
        />
      </div>

      <!-- Main content -->
      <div style="padding:0.625rem 1.25rem;width:100%;box-sizing:border-box;">
        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">Hi ${firstName},</p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          Please confirm your staff account registration by clicking the link below:
        </p>

        <a
          href="https://www.dev.apxdenta.trackd-ph.cc/register?staffId=${staffId}"
          style="display:inline-block;width:calc(100% - 22px);background-color:#4258eb;border-radius:0.375rem;color:#fff;font-size:1rem;text-decoration:none;text-align:center;padding:0.75rem;margin:0.25rem 0 1em 0;box-sizing:border-box;"
        >
          Confirm your account
        </a>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          Remember to use a password that is both strong and unique to your
          ApxDenta account. To learn more about how to create a strong and
          unique password,
          <a href="https://www.dev.apxdenta.trackd-ph.cc" style="color:#4258eb;text-decoration:underline;">
            click here.
          </a>
        </p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          Still have questions? Please contact
          <a href="https://www.dev.apxdenta.trackd-ph.cc" style="color:#4258eb;text-decoration:underline;">
            ApxDenta Support
          </a>
        </p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;padding-top:2.5rem;">
          Thanks,<br />
          ApxDenta Support Team
        </p>
      </div>
    `,
    `You have been created an account for ApxDenta last ${formattedDate}`,
  );
};
