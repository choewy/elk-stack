import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, SetMetadata } from '@nestjs/common';
import { Request, Response } from 'express';
import { tap } from 'rxjs';
import { Log } from './implements/log';
import { Reflector } from '@nestjs/core';
import { v4 } from 'uuid';

export const SKIP_LOGGING = `__${v4()}-skip_logging__`;
export const SkipLogging = () => SetMetadata(SKIP_LOGGING, true);

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(ctx: ExecutionContext, next: CallHandler<any>) {
    const isSkip = this.reflector.getAllAndMerge(SKIP_LOGGING, [ctx.getHandler(), ctx.getClass()]);

    if (isSkip) {
      return next.handle();
    }

    const http = ctx.switchToHttp();
    const log = Log.fromRequest(http.getRequest<Request>()).setContext(ctx);

    return next.handle().pipe(tap(() => Logger.verbose(log.setResponse(http.getResponse<Response>()))));
  }
}
