import { registerAs } from '@nestjs/config';
import { v4 } from 'uuid';

export type ServerConfigValue = {
  name: string;
  host: string;
  port: number;
};

export const SERVER_CONFIG = [v4(), 'server'].join('_');
export const ServerConfig = registerAs(
  SERVER_CONFIG,
  (): ServerConfigValue => ({
    name: process.env.NAME,
    host: process.env.HOST,
    port: +process.env.PORT,
  }),
);
