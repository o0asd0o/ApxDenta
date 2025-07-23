const templateShell = (
  children: string,
  previewText: string,
  additionlStyles?: string,
) => /*html*/ `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Staff Account Confirmation - ApxDenta</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, sans-serif;
        color: #000;
        line-height: 1.5;
      }

      .container {
        max-width: 576px;
        margin: 2rem auto;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
      }

      .header {
        padding: 1.35rem;
        padding-bottom: 0;
      }

      .logo {
        width: 80px;
        height: auto;
      }

      .content {
        padding: 0.625rem 1.25rem;
        width: 100%;
        box-sizing: border-box;
      }

      .text {
        line-height: 1.5;
        font-size: 0.875rem;
        margin: 0 0 1rem 0;
      }

      .button {
        display: inline-block;
        width: calc(100% - 22px);
        background-color: #4258eb;
        border-radius: 0.375rem;
        color: #fff;
        font-size: 1rem;
        text-decoration: none;
        text-align: center;
        padding: 0.75rem;
        margin: 0.25rem 0;
        margin-bottom: 1em;
        box-sizing: border-box;
      }

      .button:hover {
        background-color: #3b4de6;
      }

      .link {
        color: #4258eb;
        text-decoration: underline;
      }

      .link:hover {
        text-decoration: none;
      }

      .footer {
        max-width: 576px;
        margin: 0 auto;
        padding: 1rem;
      }

      .social-row {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .social-col {
        text-align: center;
        padding: 0 0.5rem;
      }

      .social-col img {
        max-width: 24px;
        height: auto;
      }

      .copyright {
        text-align: center;
        color: #6b7280;
        font-size: 0.875rem;
        margin: 0;
      }

      .pt-10 {
        padding-top: 2.5rem;
      }

      /* Email client compatibility */
      table {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      @media only screen and (max-width: 600px) {
        .container {
          margin: 1rem;
          max-width: calc(100% - 2rem);
        }

        .button {
          width: 100%;
        }
      }

      ${additionlStyles}
    </style>
  </head>
  <body>
    <!-- Preview text for email clients -->
    <div style="display: none; max-height: 0; overflow: hidden">
      ${previewText}
      <!-- You have been created an account for ApxDenta last June 23, 2025 at
      4:06:00 PM -->
    </div>

    <!-- Main container -->
    <div class="container">
      ${children}
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="social-row">
        <div class="social-col">
          <img
            src="https://react-email-demo-ed2e9vja9-resend.vercel.app/static/twitch-icon-twitter.png"
            alt="Twitter"
          />
        </div>
        <div class="social-col">
          <img
            src="https://react-email-demo-ed2e9vja9-resend.vercel.app/static/twitch-icon-facebook.png"
            alt="Facebook"
          />
        </div>
      </div>

      <p class="copyright">
        © 2025 ApxDenta, All Rights Reserved<br />
        Bocaue, Bulacan, 3018 PH
      </p>
    </div>
  </body>
</html>
`;
export default templateShell;
