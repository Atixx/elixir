import { HttpStatus } from '@nestjs/common';

export class KnownError {
  constructor() {
    this.message = 'Internal Server Error';
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }

  message: string;
  statusCode: number;
  originalError: Record<string, unknown>;
}
