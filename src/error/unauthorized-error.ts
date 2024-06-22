import { constants } from "http2";

class UnauthorizedError extends Error {
  public statusCode: number;
  constructor(message: string = 'Доступ запрещен. Необходима авторизация') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

export default UnauthorizedError;