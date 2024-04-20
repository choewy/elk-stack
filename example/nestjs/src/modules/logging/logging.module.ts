import { Inject, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggingInterceptor } from './logging.interceptor';
import { LoggingMiddleware } from './logging.middleware';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger, WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { LOGGER_CONFIG } from 'src/configs/logger.config';
import { LoggingFilter } from './logging.filter';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return config.get(LOGGER_CONFIG);
      },
    }),
  ],
  providers: [LoggingInterceptor, LoggingMiddleware, LoggingFilter],
})
export class LoggingModule implements NestModule {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    winstonLogger: WinstonLogger,
  ) {
    Logger.overrideLogger(winstonLogger);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
