import { HttpStatus } from '@nestjs/common';
import { KnownError } from './known-error';

export class DuplicateError extends KnownError {
  constructor(errorObject: Record<string, unknown>) {
    super();
    this.originalError = errorObject;
    this.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    this.message = 'Duplicated entity';
  }
}
