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
      <div class="header">
        <img
          src="https://i.postimg.cc/kgBFbthG/apx-denta.png"
          alt="ApxDenta"
          class="logo"
          width="80"
        />
      </div>

      <!-- Main content -->
      <div class="content">
        <p class="text ">Hi ${firstName},</p>

        <p class="text">
          Please confirm your staff account registration by clicking the link
          below:
        </p>

        <a
          href="https://www.apxdenta.trackd.cc/register?staffId=${staffId}"
          class="button"
        >
          Confirm your account
        </a>

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
    `You have been created an account for ApxDenta last ${formattedDate}`,
  );
};
