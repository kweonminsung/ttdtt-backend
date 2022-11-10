import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      ...(process.env.APP_ENV === 'development' && { envFilePath: '.env' }),
    }),
  ],
})
export class AppConfigModule {}
