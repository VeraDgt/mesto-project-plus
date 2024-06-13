import { Schema } from "mongoose";

export interface IUser {
  name: string;
  about: string,
  avatar: string,
  email: string,
  password: string,
};

export interface ICard {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes: Schema.Types.ObjectId[] | [],
  createdAt: Date,
}