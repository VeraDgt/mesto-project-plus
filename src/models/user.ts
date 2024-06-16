import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";
import isURL from "validator/lib/isURL";
import isEmail from "validator/lib/isEmail";
// import { isStrongPassword } from "validator";
import { DEFAULT_USER_NAME, DEFAULT_USER_ABOUT, DEFAULT_USER_AVATAR } from "utils/constants";

const userSchema = new Schema<IUser>({
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

export default mongoose.model<IUser>('user', userSchema);