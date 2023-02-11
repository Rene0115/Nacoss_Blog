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

dotenv.config();
const app = express();
const logger = pino();

middleware(app);

// const cronJob = async () => {
//   try {
//     cron.schedule('* * * * *', async () => {
//       const users = await userServices.getAllUsers();
//       for (let i = 0; i < users.length; i++) {
//         if (users) {

//         }
//       }
//     });
//   } catch (err) {
//     logger.error(err);
//   }
// };

// cronJob();

app.listen(process.env.PORT, () => {
  let port = process.env.PORT;
  if (port == null || port === '') {
    port = 8000;
  }

  logger.info(`Server is running on port ${port}`);
});

export default logger;
