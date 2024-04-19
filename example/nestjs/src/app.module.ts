import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule, utilities as winstonUtilities } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'verbose',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winstonUtilities.format.nestLike('nestjs', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.Http({
          level: 'verbose',
          host: 'localhost',
          format: winston.format.json(),
          port: 5045,
          handleExceptions: true,
          handleRejections: true,
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
