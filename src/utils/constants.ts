const SERVER = {
  PORT: 3000,
  DATABASE: 'mongodb://localhost:27017/mestodb',
  MONGODB_CONFLICT_CODE: 'E11000',
  DEFAULT_USER: {
    name: 'Жак-Ив Кусто',
    about: 'Исследователь',
    avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  JWT_SECRET: 'Bolshoy_sekret',
};

export const {
  PORT = SERVER.PORT,
  DATABASE = SERVER.DATABASE,
  MONGODB_CONFLICT_CODE = SERVER.MONGODB_CONFLICT_CODE,
  DEFAULT_USER_NAME = SERVER.DEFAULT_USER.name,
  DEFAULT_USER_ABOUT = SERVER.DEFAULT_USER.about,
  DEFAULT_USER_AVATAR = SERVER.DEFAULT_USER.avatar,
  JWT_SECRET = SERVER.JWT_SECRET,
} = process.env;

