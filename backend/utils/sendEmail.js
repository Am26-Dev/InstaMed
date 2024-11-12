import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email service
    auth: {
      user: process.env.EMAIL_USER, // email address from which user will receive the email
      pass: process.env.EMAIL_PASS, //  email password
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};