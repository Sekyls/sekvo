export function getSekvoOtpEmailHtml(otp: string) {
  return `
 <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sekvo OTP Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:transparent; font-family:Arial, Helvetica, sans-serif;">
    <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:0; border-radius:10px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#011627; padding:30px;">
                <img src="https://tinyurl.com/sekvo" alt="Sekvo" width="140" style="display:block;" />
              </td>
            </tr>
            
            <!-- Body -->
            <tr>
              <td style="padding:40px 30px; text-align:center;">
                <p style="background-color:#4b5563; color:#ffffff; display:inline-block; font-size:12px; font-weight:bold; border-radius:6px; padding:6px 12px; margin:0 0 20px;">
                  Security Verification
                </p>

                <h1 style="color:#1a1a1a; font-size:26px; margin:10px 0;">Verify Your Identity</h1>
                <p style="color:#6b7280; font-size:15px; line-height:22px; margin:0 0 30px;">
                  Enter the verification code below to complete your authentication. 
                  This code will expire in 5 minutes.
                </p>

                <table align="center" cellpadding="0" cellspacing="0" width="220" style="background-color:#f71735; border-radius:6px; margin:0 auto;">
                  <tr>
                    <td style="padding:20px 0; text-align:center; color:#ffffff; font-size:32px; font-weight:bold; letter-spacing:8px;">
                      ${otp}
                    </td>
                  </tr>
                </table>

                <hr style="border:none; border-top:1px solid #e5e7eb; margin:40px 0;" />

                <table width="100%" style="text-align:left; color:#111827;">
                  <tr><td style="font-weight:bold; font-size:14px; padding-bottom:10px;">Security Tips</td></tr>
                  <tr><td style="font-size:14px; color:#4b5563;">• Never share this code with anyone.</td></tr>
                  <tr><td style="font-size:14px; color:#4b5563;">• Sekvo will never ask for your code via phone or email.</td></tr>
                  <tr><td style="font-size:14px; color:#4b5563;">• If you didn’t request this code, you can safely ignore this email.</td></tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color:#011627; color:#ffffff; padding:20px;">
                <p style="font-size:13px; margin:0;">© 2025 Sekvo. All rights reserved.</p>
                <p style="font-size:12px; color:#9ca3af; margin:4px 0 0;">This is an automated message. Please do not reply.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
