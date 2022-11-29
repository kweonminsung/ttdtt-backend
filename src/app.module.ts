import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RanksModule } from './modules/ranks/ranks.module';
import { AppConfigModule } from './config/app/config.module';

@Module({
  imports: [AppConfigModule, UsersModule, RanksModule],
})
export class AppModule {}
