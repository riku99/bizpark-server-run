import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'bizpark.app@gmail.com',
    pass: process.env.GMAIL_APP_PASS,
  },
});

export const sendMail = async ({
  address,
  text,
}: {
  address: string;
  text: string;
}) => {
  await transporter.sendMail({
    from: 'Bizpark運営 <bizpark.app@gmail.com>',
    to: address,
    text: text,
  });
};
