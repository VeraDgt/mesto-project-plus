import express from 'express';


const { PORT = 3000 } = process.env;

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