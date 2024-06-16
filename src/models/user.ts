import mongoose, { Schema } from "mongoose";
import { IUser, IUserModel } from "../types/types";
import isURL from "validator/lib/isURL";
import isEmail from "validator/lib/isEmail";
// import { isStrongPassword } from "validator";
import { DEFAULT_USER_NAME, DEFAULT_USER_ABOUT, DEFAULT_USER_AVATAR } from "../utils/constants";
import UnauthorizedError from "../error/unauthorized-error";
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    default: DEFAULT_USER_NAME,
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [200, 'Максимальная длина поля "about" - 200'],
    default: DEFAULT_USER_ABOUT,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) => isURL(v),
      message: 'Некорректный URL',
    },
    default: DEFAULT_USER_AVATAR,
  },
  email: {
    type: String,
    validate: {
      validator: (v: string) => isEmail(v),
      message: 'Некорректный email',
    },
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
  },
  password: {
    type: String,
    // validate: {
    //   validator: (v: string) => iisStrongPassword(v),
    //   message: 'Пароль должен быть не менее 8 символов',
    // },
    required: [true, 'Поле "password" должно быть заполнено'],
  }
}, {
  versionKey: false,
  timestamps: true,
});

userSchema.static('findUserByCredentials', async function findUserByCredentials(
  email: string,
  password: string,
) {
  const currentUser: (mongoose.Document<unknown, any, IUser>
    & Omit<IUser & { _id: mongoose.Types.ObjectId }, never>
  )
  | null = await this.findOne({ email }).select('+password');

  if (!currentUser) {
    throw new UnauthorizedError();
  }

  const matched = await bcrypt.compare(password, currentUser.password);

  if (!matched) {
    throw new UnauthorizedError('Некорректный email или пароль');
  }

  return currentUser;
});

export default mongoose.model<IUser, IUserModel>('user', userSchema);