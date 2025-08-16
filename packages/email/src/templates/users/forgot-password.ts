import templateShell from '@/template-shell';
// import type { StaffAccountConfirmationProps } from './staff-account-confirmation';
export type ForgotPasswordProps = {
  firstName: string;
  name: string;
  email: string;
  token: string;
};

export const forgotPassword = ({
  firstName,
  name,
  email,
  token,
}: ForgotPasswordProps) => {
  return templateShell(
    /*html*/ `
      <div style="padding:1.35rem;padding-bottom:0;">
        <img
          src="https://d1o0iervdpova7.cloudfront.net/apx-denta-string-only.png"
          alt="ApxDenta"
          style="width:auto;height:80px;display:block;"
        />
      </div>

      <!-- Main content section -->
      <div style="padding:0.625rem 1.25rem;width:100%;box-sizing:border-box;">
        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">Hi ${firstName},</p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          Someone has requested a password reset for the following account:
        </p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          <code style="display:block;background:#f3f4f6;padding:0.5em 1em;border-radius:4px;font-size:0.875rem;">
            Name: <span style="font-weight:bold;">${name}</span><br />
            Email: <span style="font-weight:bold;">${email}</span>
          </code>
        </p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          To reset your password please click on the following link:
        </p>

        <a
          href="https://www.dev.apxdenta.trackd-ph.cc/reset-password?token=${token}"
          style="display:inline-block;width:calc(100% - 22px);background-color:#4258eb;border-radius:0.375rem;color:#fff;font-size:1rem;text-decoration:none;text-align:center;padding:0.75rem;margin:0.25rem 0 1em 0;box-sizing:border-box;"
        >
          Reset password
        </a>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          If it was a mistake, please ignore this email and nothing will happen.
        </p>

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
    'Password reset | ApxDenta',
  );
};
