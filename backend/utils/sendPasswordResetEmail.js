import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");

  if (!host || !user || !pass) return null;

  transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  return transporter;
}

export async function sendPasswordResetEmail(to, resetUrl) {
  const mailer = getTransporter();
  if (!mailer) return false;

  const from =
    process.env.MAIL_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "TrackTruck <noreply@localhost>";

  try {
    await mailer.sendMail({
      from,
      to,
      subject: "Reset your TrackTruck password",
      text: `Reset your password (valid for 1 hour):\n${resetUrl}`,
      html: `
        <div>
          <h2>TrackTruck Password Reset</h2>
          <p>This link is valid for 1 hour.</p>
          <a href="${resetUrl}">Reset Password</a>
        </div>
      `,
    });
    return true;
  } catch {
    return false;
  }
}
