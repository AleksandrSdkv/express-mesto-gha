import { constants } from 'http2';

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message, constants.HTTP_STATUS_UNAUTHORIZED);
  }
}
