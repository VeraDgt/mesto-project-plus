import express from 'express';
import { PORT, DATABASE } from '../src/utils/constants';
import mongoose from 'mongoose';
import router from '../src/routes/index';

const app = express();

app.use(router);

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