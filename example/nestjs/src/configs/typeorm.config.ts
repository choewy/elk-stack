import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { v4 } from 'uuid';

export const TYPEORM_CONFIG = [v4(), 'typeorm'].join('_');
export const TypeOrmConfig = registerAs(
  TYPEORM_CONFIG,
  (): TypeOrmModuleOptions => ({
    type: 'mariadb',
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNC === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    autoLoadEntities: true,
    entities: [process.env.PWD + '/dist/**/*.entity.js'],
  }),
);
