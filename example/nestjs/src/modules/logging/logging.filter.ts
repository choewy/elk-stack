import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Log } from './implements/log';

@Catch()
export class LoggingFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const log = Log.fromRequest(http.getRequest()).setContext(host);

    if (exception instanceof HttpException) {
      Logger.warn(log.setException(exception));
    } else {
      Logger.error(log.setError(exception));
    }

    super.catch(exception, host);
  }
}
