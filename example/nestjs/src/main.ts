import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggingFilter } from './modules/logging/logging.filter';
import { LoggingInterceptor } from './modules/logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);
  app.useGlobalFilters(app.get(LoggingFilter));
  app.useGlobalInterceptors(app.get(LoggingInterceptor));

  await app.listen(3000);
}

bootstrap();
