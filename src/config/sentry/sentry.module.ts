import { HttpException, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { SentryService } from './sentry.service';

@Module({
  imports: [RavenModule],
  providers: [
    SentryService,
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor({
        filters: [
          {
            type: HttpException,
            filter: (e: HttpException) => e.getStatus() < 500,
          },
        ],
      }),
    },
  ],
})
export class SentryModule {}
