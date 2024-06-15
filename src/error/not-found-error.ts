import { constants } from "http2";

class NotFoundError extends Error {
  public statusCode: number;
  constructor(message: string = 'Страница не найдена') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
}

export default (message?: string) => {
  throw new NotFoundError(message);
};