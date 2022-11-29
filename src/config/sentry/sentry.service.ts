import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';

@Injectable()
export class SentryService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const env = this.configService.get<string>('app.env');

    Sentry.init({
      dsn: this.configService.get('sentry.dsn'),
      environment: env,
      tracesSampleRate: 1.0,
    });
  }
}
