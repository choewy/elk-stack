import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggingFilter } from './modules/logging/logging.filter';
import { LoggingInterceptor } from './modules/logging/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { SERVER_CONFIG, ServerConfigValue } from './configs/server.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder().build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, swaggerDocument);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(app.get(LoggingFilter));
  app.useGlobalInterceptors(app.get(LoggingInterceptor));
  app.enableShutdownHooks();

  const { port, host } = config.get<ServerConfigValue>(SERVER_CONFIG);

  await app.listen(port, host);
}

bootstrap();
