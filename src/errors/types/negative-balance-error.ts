import { HttpStatus } from '@nestjs/common';
import { KnownError } from './known-error';

export class NegativeBalanceError extends KnownError {
  constructor(errorObject: Record<string, unknown>) {
    super();
    this.originalError = errorObject;
    this.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    this.message = errorObject.error as string;
  }
}
