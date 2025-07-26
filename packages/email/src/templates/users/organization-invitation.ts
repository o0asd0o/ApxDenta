import templateShell from '@/template-shell';

export interface OrganizationInvitationProps {
  firstName: string;
  inviterName: string;
  organizationName: string;
  email: string;
  token: string;
  role?: string;
}

export const organizationInvitation = ({
  firstName,
  inviterName,
  organizationName,
  email,
  token,
  role = 'team member',
}: OrganizationInvitationProps) => {
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

      <!-- Main content section -->
      <div class="content">
        <p class="text">Hi ${firstName},</p>

        <p class="text">
          You have been invited by <span class="font-bold">${inviterName}</span> to join 
          <span class="font-bold">${organizationName}</span> on ApxDenta as a ${role}.
        </p>

        <p class="text">
          <code class="code-block">
            Organization: <span class="font-bold">${organizationName}</span><br />
            Your email: <span class="font-bold">${email}</span><br />
            Role: <span class="font-bold">${role}</span>
          </code>
        </p>

        <p class="text">
          To accept this invitation and join the organization, please click the button below:
        </p>

        <a
          href="https://www.apxdenta.trackd.cc/accept-invitation?token=${token}"
          class="button"
        >
          Accept Invitation
        </a>

        <p class="text">
          If you don't want to join this organization or if this invitation was sent by mistake, 
          you can safely ignore this email. The invitation will expire in 7 days.
        </p>

        <p class="text">
          Once you accept the invitation, you'll be able to access the organization's 
          dashboard and collaborate with your team members. Make sure to set up a strong 
          and unique password for your account.
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
    `You're invited to join ${organizationName} on ApxDenta`,
  );
};
