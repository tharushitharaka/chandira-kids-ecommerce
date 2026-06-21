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
