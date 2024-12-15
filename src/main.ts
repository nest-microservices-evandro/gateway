import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './configs/envs';

async function bootstrap() {
  const logger = new Logger('NestApplication');

  const app = await NestFactory.create(AppModule);
  await app.listen(envs.PORT);

  logger.log(`Gateway is running on: http://localhost:${envs.PORT}`);
}
bootstrap();
