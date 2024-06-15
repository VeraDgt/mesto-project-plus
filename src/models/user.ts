import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";
import isURL from "validator/lib/isURL";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [200, 'Максимальная длина поля "about" - 200'],
    required: [true, 'Поле "about" должно быть заполнено'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) => isURL(v),
      message: 'Некорректный URL',
    },
    required: [true, 'Поле "avatar" должно быть заполнено'],
  }
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model<IUser>('user', userSchema);