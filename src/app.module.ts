import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RanksModule } from './modules/ranks/ranks.module';
import { AppConfigModule } from './config/app/config.module';
import { PrismaModule } from './config/prisma/prisma.module';

@Module({
  imports: [AppConfigModule, PrismaModule, UsersModule, RanksModule],
})
export class AppModule {}
