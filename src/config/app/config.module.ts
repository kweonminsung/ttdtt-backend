import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ...(process.env.APP_ENV === 'production'
        ? { load: [configuration] }
        : { envFilePath: '.env' }),
    }),
  ],
})
export class AppConfigModule {}
