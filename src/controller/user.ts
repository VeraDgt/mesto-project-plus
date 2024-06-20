import { NextFunction, Request, Response } from "express";
import User from '../models/user';
import NotFoundError from "../error/not-found-error";
import { Error as MongooseErr } from "mongoose";
import BadRequestError from "../error/bad-request-error";
import ConflictError from "../error/conflict-error";
import { MONGODB_CONFLICT_CODE, JWT_SECRET } from "../utils/constants";
import { IUser } from "../types/types";
import { resOkCreated } from "../utils/response";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RequestAuth } from "../types/types";

const SALT = 10;

export const getUsers = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return next(error);
  }
};

const getUser = async (userId:string, res:Response, next:NextFunction) => {
  try {
    const user = await User
        .findById(userId)
        .orFail(() => NotFoundError('Пользователь не найден'));
    return res.send(user);
  } catch (error) {
    if (error instanceof MongooseErr.CastError) {
      return next(new BadRequestError('Передан невалидный id'));
    }
    return next(error);
  }
};

export const getUserById = async (req:Request, res:Response, next:NextFunction) => {
  const { userId } = req.params;
  return getUser(userId, res, next);
};

export const createUser = async (req:Request, res:Response<IUser>, next:NextFunction) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const salt = bcrypt.genSaltSync(SALT);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await new User({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    await newUser.save();
    return resOkCreated(res, newUser);
  } catch (error) {
    if (error instanceof MongooseErr.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    if (error instanceof Error && error.message.startsWith(MONGODB_CONFLICT_CODE)) {
      return next(new ConflictError('Пользователь с таким именем уже существует'));
    }
    return next(error);
  }
};

export const updateUser = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const userId = res.locals.user._id;

    const { name, about } = req.body;
    const user = await User
        .findByIdAndUpdate({ _id: userId }, { name, about }, { new: true, runValidators: true })
        .orFail(() => NotFoundError('Пользователь не найден'));
    return res.send(user);
  } catch (error) {
    if (error instanceof MongooseErr.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    if (error instanceof MongooseErr.CastError) {
      return next(new BadRequestError('Передан невалидный id'));
    }
    return next(error);
  }
};

export const updateUserAvatar = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const userId = res.locals.user._id;
    const { avatar } = req.body;
    const user = await User
        .findByIdAndUpdate({ _id: userId }, { avatar }, { new: true, runValidators: true })
        .orFail(() => NotFoundError('Пользователь не найден'));
    return res.send(user);
  } catch (error) {
    if (error instanceof MongooseErr.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    if (error instanceof MongooseErr.CastError) {
      return next(new BadRequestError('Передан невалидный id'));
    }
    return next(error);
  }
};

export const login = async (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id}, JWT_SECRET, {
      expiresIn: '7d',
    });
    return res
    .cookie('jwt', token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 3600000 * 24 * 7,
    })
    .send({ token });
  } catch (err) {
    return next(err);
  }
};

export const getUserMe = async (req:RequestAuth, res:Response, next:NextFunction) => {
  try {
    const user = await User
        .findById(req.user)
        .orFail(() => NotFoundError('Пользователь не найден'));
    return res.send(user);
  } catch (error) {
    if (error instanceof MongooseErr.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};