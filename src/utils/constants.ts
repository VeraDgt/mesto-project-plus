const SERVER = {
  PORT: 3000,
  DATABASE: "mongodb://localhost:27017/mestodb",
};

export const {
  PORT = SERVER.PORT,
  DATABASE = SERVER.DATABASE,
} = process.env;