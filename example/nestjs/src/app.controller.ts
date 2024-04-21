import { BadRequestException, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { Log } from './modules/logging/implements/log';
import { SkipLogging } from './modules/logging/logging.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  throwError() {
    throw new Error('throw error');
  }

  @Get('exception')
  throwException() {
    throw new BadRequestException();
  }

  @Post('log')
  @SkipLogging()
  async sendLogToLogstashDirectly(@Req() request: Request) {
    return this.appService.sendLogToLogstashDirectly(Log.fromRequest(request));
  }
}
