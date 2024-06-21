import { NextFunction, Request, Response } from "express";
import Card from '../models/card';
import NotFoundError from "../error/not-found-error";
import { Error as MongooseErr } from "mongoose";
import BadRequestError from "../error/bad-request-error";
import { ICard, RequestAuth } from "../types/types";
import { AuthContext } from "../types/auth-context";
import { resOkCreated } from "../utils/response";

export const getCards = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (req:RequestAuth, res:Response<ICard, AuthContext>, next:NextFunction) => {
  try {
    const userId = req.user;
    const { name, link } = req.body;

    const newCard = await Card.create({ name, link, owner: userId });
    return resOkCreated(res, newCard);
  } catch (error) {
    if (error instanceof MongooseErr.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

export const deleteCard = async (req:RequestAuth, res:Response<ICard, AuthContext>, next:NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await Card
        .findByIdAndDelete(cardId)
        .orFail(() => NotFoundError('Карточка не найдена'));
    return res.send(card);
  } catch (error) {
    if (error instanceof MongooseErr.CastError) {
      next(new BadRequestError('Передан невалидный id'));
    }
    return next(error);
  }
};

export const likeCard = async (req:RequestAuth, res:Response<ICard, AuthContext>, next:NextFunction) => {
  try {
    const userId = req.user;
    const { cardId } = req.params;
    const card = await Card
        .findByIdAndUpdate( cardId,
          { $addToSet: { likes: userId }},
          { new: true },
        )
        .orFail(() => NotFoundError('Карточка не найдена'));
    return res.send(card);
  } catch (error) {
    if (error instanceof MongooseErr.CastError) {
      return next(new BadRequestError('Передан невалидный id'));
    }
    return next(error);
  }
};

export const dislikeCard = async (req:RequestAuth, res:Response<ICard, AuthContext>, next:NextFunction) => {
  try {
    const userId = req.user;
    const { cardId } = req.params;
    const card = await Card
        .findByIdAndUpdate( cardId,
          { $pull: { likes: userId }},
          { new: true },
        )
        .orFail(() => NotFoundError('Карточка не найдена'));
    return res.send(card);
  } catch (error) {
    if (error instanceof MongooseErr.CastError) {
      return next(new BadRequestError('Передан невалидный id'));
    }
    return next(error);
  }
};