import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  name: string;
  about: string,
  avatar: string,
  email: string,
  password: string,
};

export interface IUserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, any, IUser>>
}

export interface ICard {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes: Schema.Types.ObjectId[] | [],
  createdAt: Date,
}