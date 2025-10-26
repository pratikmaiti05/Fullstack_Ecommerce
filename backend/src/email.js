const nodemailer = require('nodemailer');
let transporter = null;
let transporterReady = false;
async function initTransporter() {
  if (transporter) return transporter;

  // Prefer OAuth2 when credentials are present
  if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.REFRESH_TOKEN) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
  } else if (process.env.EMAIL_PASSWORD) {
    // Fallback to SMTP using an app password (recommended for personal Gmail with 2FA)
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  } else {
    // As a last resort create a test account (useful for local dev)
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.warn('No real email credentials found. Using Ethereal test account for local testing.');
  }

  // Verify and log actionable messages for common failures
  try {
    await transporter.verify();
    transporterReady = true;
    console.log('Email server is ready to send messages');
  } catch (err) {
    // Provide clearer guidance for OAuth2 EAUTH / invalid_grant
    console.error('Error connecting to email server:', err);
    if (err && err.code === 'EAUTH' && err.command === 'AUTH XOAUTH2') {
      console.error('OAuth2 authentication failed (invalid_grant). Common causes:');
      console.error('- The refresh token was revoked or expired.');
      console.error("- You need to re-generate the refresh token using Google's OAuth2 flow (include 'access_type=offline' and 'prompt=consent' to get a refresh token).");
      console.error("- Alternatively, set an app-specific password and add EMAIL_PASSWORD to .env (works if the account has 2FA enabled).");
    }
  }

  return transporter;
}

// Ensure transporter is initialized before sending
const sendEmail = async (to, subject, text, html) => {
  try {
    const t = await initTransporter();
    if (!t) throw new Error('No transporter available');

    const info = await t.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    // Preview URL is only available for Ethereal
    if (nodemailer.getTestMessageUrl(info)) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {sendEmail};