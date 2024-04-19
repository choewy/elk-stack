import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        Logger.verbose({
          context: context.getClass()?.name,
          handler: context.getHandler()?.name,
          url: req.originalUrl,
          ip: req.headers['x-forwarded-for'] ?? req.ip,
        });
      }),
    );
  }
}
