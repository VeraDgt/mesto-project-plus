import mongoose, { Schema, Document } from "mongoose";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

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

export interface RequestAuth extends Request {
  user?: string | JwtPayload;
}