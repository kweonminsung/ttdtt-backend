import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './config/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Env settings
  const appConfig = app.get(ConfigService);

  // Config for Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Config for Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('탁. 타닥. 탁탁.')
    .setDescription('The API description for TTDTT')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  console.log(`==== Running as ${process.env.APP_ENV} ====`);
  await app.listen(appConfig.get('app.port'));
}
bootstrap();
