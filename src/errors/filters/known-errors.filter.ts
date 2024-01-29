import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { KnownError } from '../types/known-error';

@Catch(KnownError)
export class KnownErrorFilter implements ExceptionFilter {
  catch(exception: KnownError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.statusCode;

    Logger.error(exception.originalError); // TODO: log something more user friendly and readable

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
