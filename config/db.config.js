/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../app.js';

dotenv.config();

const database = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.MONGODB_URI).then((value) => logger.info('database connected')).catch((err) => logger.info(err));
};

export default database;
