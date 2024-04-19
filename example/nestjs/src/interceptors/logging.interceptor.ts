import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { tap } from 'rxjs';
import { v4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler<any>) {
    const $context = ctx.getClass()?.name;
    const $handler = ctx.getHandler()?.name;

    const http = ctx.switchToHttp();
    const req = http.getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        Logger.verbose({
          context: $context,
          handler: $handler,
          message: 'Request succeed',
          request: {
            id: v4(),
            method: req.method,
            url: req.originalUrl,
            ip: req.headers['x-forwarded-for'] ?? req.ip,
          },
        });
      }),
    );
  }
}
