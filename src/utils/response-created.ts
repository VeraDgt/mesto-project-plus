import { Response } from "express";
import { constants } from "http2";

export const resOK = <T>(res:Response, data: T) => {
  res.status(constants.HTTP_STATUS_CREATED).send(data);
};