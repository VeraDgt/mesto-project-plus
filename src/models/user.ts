import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model<IUser>('user', userSchema);