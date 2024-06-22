import { Response } from "express";
import { constants } from "http2";

export const resOkCreated = <T>(res:Response, data: T) => {
  res.status(constants.HTTP_STATUS_CREATED).send(data);
};

export const resOk = <T>(res:Response, data: T) => {
  res.status(constants.HTTP_STATUS_OK).send(data);
};