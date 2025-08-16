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
    <table width="576" align="center" cellpadding="0" cellspacing="0" style="margin:0 auto;padding:1rem;">
      <tr>
        <td align="center" style="padding-bottom:1rem;width:100%;">
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td style="text-align:center;padding:0 0.5rem;">
                <img
                  src="https://react-email-demo-ed2e9vja9-resend.vercel.app/static/twitch-icon-twitter.png"
                  alt="Twitter"
                  style="max-width:24px;height:auto;"
                />
              </td>
              <td style="text-align:center;padding:0 0.5rem;">
                <img
                  src="https://react-email-demo-ed2e9vja9-resend.vercel.app/static/twitch-icon-facebook.png"
                  alt="Facebook"
                  style="max-width:24px;height:auto;"
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="color:#6b7280;font-size:0.875rem;margin:0;">
          © 2025 ApxDenta, All Rights Reserved<br />
          Bocaue, Bulacan, 3018 PH
        </td>
      </tr>
    </table>
  </body>
</html>
`;
export default templateShell;
