import "dotenv/config";
import express, { NextFunction, json, urlencoded } from 'express';
import helmet from 'helmet';
import { PORT, DATABASE } from '../src/utils/constants';
import mongoose from 'mongoose';
import router from '../src/routes/index';
import errorHandler from '../src/middleware/error-handler';
import { join } from 'path';
import { createUser, login } from '../src/controller/user';
import { auth } from "../src/middleware/auth";
import { requestLogger, errorLogger } from "../src/middleware/logger";

const cookieParser = require('cookie-parser');

const app = express();
app.use(helmet());
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(requestLogger);
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(router);
app.use(express.static(join(__dirname, "public")));
app.use(errorLogger);
app.use(errorHandler);

const connect = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(DATABASE);
    console.log('Есть подключение к базе данных');
    await app.listen(PORT);
    console.log(`Сервер запущен па порту: ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

connect();