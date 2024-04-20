import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { tap } from 'rxjs';
import { Log } from './implements/log';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler<any>) {
    const http = ctx.switchToHttp();
    const log = Log.fromRequest(http.getRequest<Request>()).setContext(ctx);

    return next.handle().pipe(tap(() => Logger.verbose(log.setResponse(http.getResponse<Response>()))));
  }
}
