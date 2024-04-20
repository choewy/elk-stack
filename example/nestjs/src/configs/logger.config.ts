import { registerAs } from '@nestjs/config';
import { v4 } from 'uuid';
import * as winston from 'winston';
import { WinstonModuleOptions, utilities as winstonUtilities } from 'nest-winston';

export const LOGGER_CONFIG = [v4(), 'logger'].join('-');
export const LoggerConfig = registerAs(
  LOGGER_CONFIG,
  (): WinstonModuleOptions => ({
    transports: [
      new winston.transports.Console({
        level: 'verbose',
        format: winston.format.combine(
          winston.format.timestamp(),
          winstonUtilities.format.nestLike(process.env.NAME, {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
      new winston.transports.Http({
        level: 'verbose',
        host: process.env.LOGSTASH_HOST,
        port: +process.env.LOGSTASH_PORT,
        format: winston.format.json(),
        handleExceptions: true,
        handleRejections: true,
      }),
    ],
  }),
);
