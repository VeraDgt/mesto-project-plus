import mongoose, { Schema } from "mongoose";
import { ICard } from "../types/types";
import isURL from "validator/lib/isURL";

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  link: {
    type: String,
    validate: {
      validator: (v: string) => isURL(v),
      message: 'Некорректный URL',
    },
    required: [true, 'Поле "link" должно быть заполнено'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  likes: {
    type: [{
      type: Schema.Types.ObjectId,
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  versionKey: false,
});

export default mongoose.model<ICard>('card', cardSchema);