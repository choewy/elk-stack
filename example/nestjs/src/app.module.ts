import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServerConfig } from './configs/server.config';
import { TYPEORM_CONFIG, TypeOrmConfig } from './configs/typeorm.config';
import { LoggerConfig } from './configs/logger.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingModule } from './modules/logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ServerConfig, TypeOrmConfig, LoggerConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return config.get(TYPEORM_CONFIG);
      },
    }),
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
