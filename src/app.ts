import express from 'express';
import { PORT, DATABASE } from 'utils/constants';

const app = express();

const connect = async () => {
  try {
    await app.listen(PORT);
    console.log(`Сервер запущен па порту: ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

connect();