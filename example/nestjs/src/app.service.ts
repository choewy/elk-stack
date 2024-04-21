import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Log } from './modules/logging/implements/log';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendLogToLogstashDirectly(log: Log) {
    const host = this.configService.get('LOGSTASH_HOST');
    const port = this.configService.get('LOGSTASH_PORT');
    const url = `http://${host}:${port}`;

    const res = await lastValueFrom(this.httpService.post(url, log)).catch((e) => ({ data: e.response?.data ?? e }));

    return res.data;
  }
}
