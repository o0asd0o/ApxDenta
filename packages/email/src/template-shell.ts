const templateShell = (
  children: string,
  previewText: string,
) => /*html*/ `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ApxDenta Email</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;color:#000;line-height:1.5;">
    <!-- Preview text for email clients -->
    <div style="display:none;max-height:0;overflow:hidden;">
      ${previewText}
    </div>
    <!-- Main container -->
    <div style="max-width:576px;margin:2rem auto;background-color:#fff;border-radius:8px;overflow:hidden;">
      ${children}
    </div>
    <!-- Footer -->
    <div style="max-width:576px;margin:0 auto;padding:1rem;">
      <div style="display:flex;justify-content:center;margin-bottom:1rem;">
        <div style="text-align:center;padding:0 0.5rem;">
          <img
            src="https://react-email-demo-ed2e9vja9-resend.vercel.app/static/twitch-icon-twitter.png"
            alt="Twitter"
            style="max-width:24px;height:auto;"
          />
        </div>
        <div style="text-align:center;padding:0 0.5rem;">
          <img
            src="https://react-email-demo-ed2e9vja9-resend.vercel.app/static/twitch-icon-facebook.png"
            alt="Facebook"
            style="max-width:24px;height:auto;"
          />
        </div>
      </div>
      <p style="text-align:center;color:#6b7280;font-size:0.875rem;margin:0;">
        © 2025 ApxDenta, All Rights Reserved<br />
        Bocaue, Bulacan, 3018 PH
      </p>
    </div>
  </body>
</html>
`;
export default templateShell;
