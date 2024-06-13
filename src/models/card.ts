import mongoose, { Schema } from "mongoose";
import { ICard } from "../types/types";

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
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