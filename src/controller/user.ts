import { NextFunction, Request, Response } from "express";
import User from '../models/user';
import NotFoundError from "../error/not-found-error";
import { Error as MongooseErr } from "mongoose";
import BadRequestError from "../error/bad-request-error";
import ConflictError from "error/conflict-error";
import { MONGODB_CONFLICT_CODE } from "../utils/constants";

export const getUsers = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User
        .findById(userId)
        .orFail(new NotFoundError('Пользователь не найден'));
    return res.send(user);
  } catch (error) {
    if (error instanceof MongooseErr.CastError) {
      next(new BadRequestError('Передан невалидный id'));
    }
    return next(error);
  }
};

export const createUser = async (req:Request, res:Response, next:NextFunction) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    return res.send(newUser);
  } catch (error) {
    if (error instanceof MongooseErr.ValidationError) {
      next(new BadRequestError(error.message));
    }
    if (error instanceof Error && error.message.startsWith(MONGODB_CONFLICT_CODE)) {
      next(new ConflictError('Пользователь с таким именем уже существует'));
    }
    return next(error);
  }
};