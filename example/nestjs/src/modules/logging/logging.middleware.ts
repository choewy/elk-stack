import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Log } from './implements/log';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(request: Request, _: Response, next: NextFunction) {
    new Log().setRequest(request);

    next();
  }
}
