import { constants } from 'http2';

export class ServerError extends Error {
  constructor(message = '') {
    super(`Неизвестная ошибка. ${message}`, constants.HTTP_STATUS_SERVICE_UNAVAILABLE);
  }
}
