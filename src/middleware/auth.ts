import UnauthorizedError from "error/unauthorized-error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "utils/constants";

export interface RequestAuth extends Request {
  user?: {
    _id: string;
  }
}

export const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (!token) {
    const notAuthErr = new UnauthorizedError();
    return next(notAuthErr);
  }
  let payload: any;
  try {
    payload = verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return next(new UnauthorizedError());
  }
  return next();
};