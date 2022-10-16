/* eslint-disable import/no-named-as-default */
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config();
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }
});

export const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Nacoss Blog',
    link: process.env.APP_URL
  }
});

export default { transporter, mailGenerator };
