import { v4 } from 'uuid';
import { ArgumentsHost, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

export class ContextLog {
  public readonly className: string;
  public readonly handlerName: string;

  constructor(context: ExecutionContext) {
    const className = context.getClass()?.name;
    const handlerName = context.getHandler()?.name;

    if (className) {
      this.className = className;
    }

    if (handlerName) {
      this.handlerName = handlerName;
    }
  }
}

export class RequestLog {
  public readonly method: string;
  public readonly url: string;
  public readonly ip: string;

  constructor(request: Request) {
    this.method = request.method;
    this.url = request.originalUrl;

    const ip = request.headers['x-forwarded-for'] ?? request.ip;

    if (Array.isArray(ip)) {
      this.ip = ip.shift() ?? null;
    } else {
      this.ip = ip;
    }
  }
}

export class ResponseLog {
  public readonly statusCode: number;
  public readonly statusMessage: string;

  constructor(response: Response) {
    this.statusCode = response.statusCode;
    this.statusMessage = HttpStatus[response.statusCode];
  }
}

export class ExceptionLog {
  public readonly statusCode: number;
  public readonly name: string;
  public readonly message: string;
  public readonly cause: unknown;

  constructor(exception: HttpException) {
    this.statusCode = exception.getStatus();
    this.name = exception.name;
    this.message = exception.message;
    this.cause = exception.cause;
  }
}

export class ErrorLog {
  public readonly name: string;
  public readonly message: string;
  public readonly trace: string;

  constructor(error: Error) {
    this.name = error.name;
    this.message = error.message;
    this.trace = error.stack;
  }
}

export class Log {
  public readonly id = v4();
  public readonly app = process.env.NAME;

  public context: ContextLog = undefined;
  public request: RequestLog = undefined;
  public response: ResponseLog = undefined;
  public exception: ExceptionLog = undefined;
  public error: ErrorLog = undefined;

  public requestedAt: Date = undefined;
  public responsedAt: Date = undefined;
  public latency: number = undefined;

  public static fromRequest(request: Request): Log {
    if (request['log'] instanceof Log === false) {
      request['log'] = new Log().setRequest(request);
    }

    return request['log'];
  }

  public setLatency() {
    const requestedAt = this.requestedAt?.getTime() ?? null;
    const responsedAt = this.responsedAt?.getTime() ?? null;

    if (requestedAt === null) {
      return this;
    }

    if (responsedAt === null) {
      return this;
    }

    this.latency = responsedAt - requestedAt;

    return this;
  }

  public setContext(context: ArgumentsHost) {
    this.context = new ContextLog(context as ExecutionContext);

    return this;
  }

  public setRequest(request: Request) {
    request['log'] = this;

    this.request = new RequestLog(request);
    this.requestedAt = new Date();

    return this;
  }

  public setResponse(response: Response) {
    this.response = new ResponseLog(response);
    this.responsedAt = new Date();

    this.setLatency();

    return this;
  }

  public setError(error: Error) {
    this.error = new ErrorLog(error);
    this.responsedAt = new Date();

    this.setLatency();

    return this;
  }

  public setException(exception: HttpException) {
    this.exception = new ExceptionLog(exception);
    this.responsedAt = new Date();

    this.setLatency();

    return this;
  }
}
