import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from '../libs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
