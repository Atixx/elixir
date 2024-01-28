import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Fetched from https://stackoverflow.com/questions/49709429/decorator-to-return-a-404-in-a-nest-controller
@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  constructor(private readonly errorMessage: string) {}

  intercept(
    context: ExecutionContext,
    stream$: CallHandler,
  ): Observable<unknown> {
    return stream$.handle().pipe(
      tap((data: unknown) => {
        if (data === undefined) {
          throw new NotFoundException(this.errorMessage);
        }
      }),
    );
  }
}
