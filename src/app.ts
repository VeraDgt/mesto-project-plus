import express, { json } from 'express';
import { PORT, DATABASE } from '../src/utils/constants';
import mongoose from 'mongoose';
import router from '../src/routes/index';
import errorHandler from '../src/middleware/error-handler';

const app = express();
app.use(json());
app.use(router);

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