import { constants } from "http2";

class ForbiddenError extends Error {
  public statusCode: number;
  constructor(message: string = 'Недостаточно прав для выполнения действия') {
    super(message);
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
}

export default ForbiddenError;