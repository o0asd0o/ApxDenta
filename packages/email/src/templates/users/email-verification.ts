import templateShell from '@/template-shell';

export type EmailVerificationProps = {
  firstName: string;
  email: string;
  token: string;
};

export const emailVerification = ({
  firstName,
  email,
  token,
}: EmailVerificationProps) => {
  return templateShell(
    /*html*/ `
      <div style="padding:1.35rem;padding-bottom:0;">
        <img
          src="https://d1o0iervdpova7.cloudfront.net/apx-denta-string-only.png"
          alt="ApxDenta"
          style="width:auto;height:30px;display:block;"
        />
      </div>
      <div style="padding:0.625rem 1.25rem;width:100%;box-sizing:border-box;">
        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">Hi ${firstName},</p>
        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          Please verify your email address to complete your registration:
        </p>
        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          <code style="display:block;background:#f3f4f6;padding:0.5em 1em;border-radius:4px;font-size:0.875rem;">
            Email: <span style="font-weight:bold;">${email}</span>
          </code>
        </p>
        <a

          href="https://www.dev.apxdenta.trackd-ph.cc/verify-email?token=${token}"
          style="display:inline-block;width:calc(100% - 22px);background-color:#4258eb;border-radius:0.375rem;color:#fff;font-size:1rem;text-decoration:none;text-align:center;padding:0.75rem;margin:0.25rem 0 1em 0;box-sizing:border-box;"
        >
          Verify Email
        </a>
        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;">
          If you did not create an account, you can safely ignore this email.
        </p>
        <p style="line-height:1.5;font-size:0.875rem;margin:0 0 1rem 0;padding-top:2.5rem;">
          Thanks,<br />
          ApxDenta Support Team
        </p>
      </div>
    `,
    'Verify your email | ApxDenta',
  );
};
