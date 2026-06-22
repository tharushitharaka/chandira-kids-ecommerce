import nodemailer from 'nodemailer';

const hasEmailConfig = () =>
  process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;

export const sendEmail = async ({ to, subject, html }) => {
  if (!hasEmailConfig()) {
    console.log(`[email skipped] ${subject} -> ${to}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Chandira Kids <no-reply@chandirakids.com>',
    to,
    subject,
    html
  });
};

export const orderConfirmationTemplate = (order) => `
  <h2>Thank you for your order, ${order.shippingAddress.fullName}</h2>
  <p>Your Chandira Kids order <strong>${order.orderNumber}</strong> is confirmed.</p>
  <p>Total: ${order.currency} ${order.total.toFixed(2)}</p>
`;

export const welcomeTemplate = (user) => `
  <h2>Welcome to Chandira Kids, ${user.name}</h2>
  <p>Your account is ready. You can now save addresses, track orders, and keep a wishlist.</p>
`;

export const passwordResetTemplate = (user, resetUrl) => `
  <h2>Password reset request</h2>
  <p>Hello ${user.name}, use this secure link to reset your Chandira Kids password:</p>
  <p><a href="${resetUrl}">${resetUrl}</a></p>
  <p>This link expires in 30 minutes.</p>
`;

export const wholesaleApprovalTemplate = (user) => `
  <h2>Your wholesale account is approved</h2>
  <p>Hello ${user.name}, your Chandira Kids wholesale pricing is now active.</p>
`;
