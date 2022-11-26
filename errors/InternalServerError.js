import { constants } from 'http2';

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
}
