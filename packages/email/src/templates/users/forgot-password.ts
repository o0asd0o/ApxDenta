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
}: ForgotPasswordProps) => {
  return templateShell(
    /*html*/ `
      <div class="header">
        <img
          src="https://i.postimg.cc/kgBFbthG/apx-denta.png"
          alt="ApxDenta"
          class="logo"
        />
      </div>

      <!-- Main content section -->
      <div class="content">
        <p class="text">Hi ${firstName},</p>

        <p class="text">
          Someone has requested a password reset for the following account:
        </p>

        <p class="text">
          <code class="code-block">
            Name: <span class="font-bold">${name}</span><br />
            Email: <span class="font-bold">${email}</span>
          </code>
        </p>

        <p class="text">
          To reset your password please click on the following link:
        </p>

        <a
          href="https://www.apxdenta.trackd.cc/reset-password?token=123"
          class="button"
        >
          Reset password
        </a>

        <p class="text">
          If it was a mistake, please ignore this email and nothing will happen.
        </p>

        <p class="text">
          Remember to use a password that is both strong and unique to your
          ApxDenta account. To learn more about how to create a strong and
          unique password,
          <a href="https://www.apxdenta.trackd.cc" class="link">
            click here.
          </a>
        </p>

        <p class="text">
          Still have questions? Please contact
          <a href="https://www.apxdenta.trackd.cc" class="link">
            ApxDenta Support
          </a>
        </p>

        <p class="text pt-10">
          Thanks,<br />
          ApxDenta Support Team
        </p>
      </div>
    `,
    'Password reset | ApxDenta',
  );
};
