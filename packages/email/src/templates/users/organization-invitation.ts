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
      <div style="padding:1.35rem;padding-bottom:0;">
        <img
          src="https://i.postimg.cc/kgBFbthG/apx-denta.png"
          alt="ApxDenta"
          style="width:80px;height:auto;display:block;"
        />
      </div>

      <!-- Main content section -->
      <div style="padding:0.625rem 1.25rem;width:100%;box-sizing:border-box;">
        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">Hi ${firstName},</p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          You have been invited by <span style="font-weight:bold;">${inviterName}</span> to join 
          <span style="font-weight:bold;">${organizationName}</span> on ApxDenta as a ${role}.
        </p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          <code style="display:block;background:#f3f4f6;padding:0.5em 1em;border-radius:4px;font-size:0.875rem;">
            Organization: <span style="font-weight:bold;">${organizationName}</span><br />
            Your email: <span style="font-weight:bold;">${email}</span><br />
            Role: <span style="font-weight:bold;">${role}</span>
          </code>
        </p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          To accept this invitation and join the organization, please click the button below:
        </p>

        <a
          href="https://www.dev.apxdenta.trackd-ph.cc/accept-invitation?token=${token}"
          style="display:inline-block;width:calc(100% - 22px);background-color:#4258eb;border-radius:0.375rem;color:#fff;font-size:1rem;text-decoration:none;text-align:center;padding:0.75rem;margin:0.25rem 0 1em 0;box-sizing:border-box;"
        >
          Accept Invitation
        </a>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          If you don't want to join this organization or if this invitation was sent by mistake, 
          you can safely ignore this email. The invitation will expire in 7 days.
        </p>

        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          Once you accept the invitation, you'll be able to access the organization's 
          dashboard and collaborate with your team members. Make sure to set up a strong 
          and unique password for your account.
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
    `You're invited to join ${organizationName} on ApxDenta`,
  );
};
