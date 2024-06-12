import { NextFunction, Request, Response } from "express";
import Card from '../models/card';
import NotFoundError from "../error/not-found-error";
import { Error as MongooseErr } from "mongoose";
import BadRequestError from "../error/bad-request-error";
import { ICard } from "../types/types";
import { AuthContext } from "../types/auth-context";

export const getCards = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (req:Request, res:Response<ICard, AuthContext>, next:NextFunction) => {
  try {
    const userId = res.locals.user._id;

    const newCard = await Card.create(req.body);
    return res.send(newCard);
  } catch (error) {
    if (error instanceof MongooseErr.ValidationError) {
      next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

export const deleteCard = async (req:Request, res:Response<ICard, AuthContext>, next:NextFunction) => {
  try {
    const userId = res.locals.user._id;

    const newCard = await Card.create(req.body);
    return res.send(newCard);
  } catch (error) {
    if (error instanceof MongooseErr.ValidationError) {
      next(new BadRequestError(error.message));
    }
    return next(error);
  }
};