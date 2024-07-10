import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as packageInfo from '@nestjs/common/package.json';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.NEST_PORT);
  console.log('');
  console.log(`Nest Server ready and running on http://localhost:${process.env.NEST_PORT}`);
  console.log(``);
  console.log(`-------------------------------------------------------`);
  console.log(`Environment        : ${process.env.ENV}`);
  console.log(`NestJS Version     : ${packageInfo.version}`);
  console.log(`-------------------------------------------------------`);
  console.log(``);
}
bootstrap();
