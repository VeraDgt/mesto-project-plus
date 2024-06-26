import UnauthorizedError from "../error/unauthorized-error";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { RequestAuth } from "../types/types";

export const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const notAuthErr = new UnauthorizedError();
    return next(notAuthErr);
  }

  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError());
  }

  req.user = payload;
  return next();
};