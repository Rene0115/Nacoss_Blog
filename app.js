/* eslint-disable no-plusplus */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import pino from 'pino';
import dotenv from 'dotenv';
import cron from 'node-cron';
import middleware from './middlewares/middlewares.js';
import 'express-async-errors';
import userServices from './services/user.services.js';
import { mailGenerator, transporter } from './config/mailer.config.js';

dotenv.config();
const app = express();
const logger = pino();

middleware(app);

const cronJob = async () => {
  try {
    cron.schedule('* * 24 * *', async () => {
      const users = await userServices.getAllUsers();
      for (let i = 0; i < users.length; i++) {
        if (users[i].verified === false) {
          const response = {
            body: {
              name: `${users[i].username}`,
              intro: 'Remember to Verify Your email.',
              outre: 'Your account would be autodeleted in a month.'
            }
          };
          const mail = mailGenerator.generate(response);
          const message = {
            from: 'Nacoss Blog <enere0115@gmail.com>',
            to: users[i].email,
            subject: 'Password reset success',
            html: mail
          };

          transporter.sendMail(message);
        }
      }
    });
  } catch (err) {
    logger.error(err);
  }
};

cronJob();

app.listen(process.env.PORT, () => {
  let port = process.env.PORT;
  if (port == null || port === '') {
    port = 8000;
  }

  logger.info(`Server is running on port ${port}`);
});

export default logger;
