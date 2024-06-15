import express, { NextFunction, json } from 'express';
import helmet from 'helmet';
import { PORT, DATABASE } from '../src/utils/constants';
import mongoose from 'mongoose';
import router from '../src/routes/index';
import errorHandler from '../src/middleware/error-handler';
import { join } from 'path';
import { Request, Response } from "express";
import { AuthContext } from 'types/auth-context';

const app = express();
app.use(helmet());
app.use(json());
app.use((req: Request, res: Response<unknown, AuthContext>, next: NextFunction) => {
  res.locals.user = {
    _id: '66670d0b239c74fcdb41b630',
  };
  next();
})
app.use('/', router);
app.use(express.static(join(__dirname, "public")));
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